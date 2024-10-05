"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import * as XLSX from "xlsx";
import { IconButton, Drawer, Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from '../dashboardpage/Sidebar';
import { Table } from 'antd';
import LoggedHeader from "../LoggedHeader";
import Footer from "../Footer";
import { useRouter } from 'next/navigation';

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

// Set constant origin and destination address
const ORIGIN_DESTINATION_ADDRESS = "357 Negombo - Colombo Main Rd, Negombo 11500";

interface RouteData {
  deliveryDate: string;
  location: string;
}

const MapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [tableData, setTableData] = useState<RouteData[]>([]);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [optimizedRouteData, setOptimizedRouteData] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState({ width: "1200px", height: "500px" });

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const updateMapSize = () => {
    if (mapRef.current) {
      const width = mapRef.current.offsetWidth;
      setMapSize({ width: `${width}px`, height: "500px" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
      updateMapSize();
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Send the file to the server
        const response = await fetch('/api/upload-csv', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('File uploaded successfully:', result);
          // Process the file for display as before
          processFileForDisplay(file);
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  // New function to process the file for display
  const processFileForDisplay = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<RouteData>(sheet, { header: 1 });

        // Parse the locations starting from the second row (skip header)
        const waypoints = jsonData.slice(1).map((row: any) => row[1]); // Assuming location data is in the second column

        setTableData(
          jsonData.slice(1).map((row: any) => ({
            deliveryDate: row[0],
            location: row[1],
          }))
        );

        // Call optimized route calculation using the waypoints
        getOptimizedRoute(waypoints);
      }
    };
    reader.readAsBinaryString(file);
  };

  const getOptimizedRoute = async (waypointArray: string[]) => {
    const departureTime = Math.floor(Date.now() / 1000);
    const directionsResponse = await fetch("/api/get-directions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ waypoints: waypointArray, departureTime }),
    });

    const distanceMatrixData = await directionsResponse.json();

    const tspRoute = [0];
    const visited = new Array(waypointArray.length).fill(false);
    visited[0] = true;

    for (let i = 0; i < waypointArray.length - 1; i++) {
      let last = tspRoute[tspRoute.length - 1];
      let nearest = -1;
      let nearestTime = Number.MAX_VALUE;

      distanceMatrixData.rows[last].elements.forEach(
        (element: any, index: number) => {
          if (!visited[index] && element.duration_in_traffic.value < nearestTime) {
            nearest = index;
            nearestTime = element.duration_in_traffic.value;
          }
        }
      );

      tspRoute.push(nearest);
      visited[nearest] = true;
    }

    const optimizedRoute = tspRoute.map((index) => waypointArray[index]);

    const validRoute = [ORIGIN_DESTINATION_ADDRESS, ...optimizedRoute, ORIGIN_DESTINATION_ADDRESS];

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: ORIGIN_DESTINATION_ADDRESS,
        destination: ORIGIN_DESTINATION_ADDRESS,
        waypoints: validRoute.slice(1, -1).map((location) => ({
          location,
          stopover: true,
        })),
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          setOptimizedRouteData(
            result.routes[0].legs.map((leg, index) => ({
              key: index,
              start: leg.start_address,
              end: leg.end_address,
              distance: leg.distance?.text,
              duration: leg.duration?.text,
            }))
          );
        } else {
          console.error(`Error fetching directions: ${status}`, result);
        }
      }
    );

    // Set markers based on optimized route
    const geocoder = new google.maps.Geocoder();
    validRoute.forEach((address) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const location = results[0].geometry.location;
          setMarkers((prevMarkers) => [...prevMarkers, { lat: location.lat(), lng: location.lng() }]);
        } else {
          console.error(`Geocoding error: ${status}`);
        }
      });
    });
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.push('/');
  };

  const handleHomeClick = () => {
    router.push('/admin');
  };

  const handleAddCsvClick = () => {
    fileInputRef.current?.click();
  };

  if (!isLoaded) return <div>Loading...</div>;

  const columns = [
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
  ];

  const optimizedRouteColumns = [
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
  ];

  return (
    <>
      <LoggedHeader />
      <div className="flex h-[calc(100vh-70px)]" style={{ marginTop: "70px" }}>
        {isMobile ? (
          <div>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
              {isDrawerOpen ? (
                <XMarkIcon className="h-8 w-8 stroke-2" />
              ) : (
                <Bars3Icon className="h-8 w-8 stroke-2" />
              )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
              <Sidebar handleLogout={handleLogout} handleAddCsvClick={handleAddCsvClick} />
            </Drawer>
          </div>
        ) : (
          <div className="flex-shrink-0">
            <Sidebar handleLogout={handleLogout} handleAddCsvClick={handleAddCsvClick} />
          </div>
        )}
        <div className="flex-grow p-4 overflow-y-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx"
            style={{ display: "none" }}
          />
          <div className="relative flex justify-center items-center" ref={mapRef}>
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={mapSize}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {directions && <DirectionsRenderer directions={directions} />}
              {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
              ))}
            </GoogleMap>
          </div>
          <div>
            <h2>Route Information</h2>
            <Table dataSource={tableData} columns={columns} />
            <h2>Optimized Route</h2>
            <Table dataSource={optimizedRouteData} columns={optimizedRouteColumns} />
          </div>
        </div>
      </div>
      <Footer handleHomeClick={handleHomeClick} />
    </>
  );
};

export default MapComponent;