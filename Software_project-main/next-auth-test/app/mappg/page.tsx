"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import Papa from "papaparse";
import { IconButton, Drawer, Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from '../dashboardpage/Sidebar'
import { Table } from 'antd';
import LoggedHeader from "../LoggedHeader";
import Footer from "../Footer";
import { useRouter } from 'next/navigation';

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

interface RouteData {
  origin: string;
  destination: string;
  waypoint: string;
}

const MapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
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

  React.useEffect(() => {
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
      setCsvFile(file);

     
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload-csv', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          
          const reader = new FileReader();
          reader.onload = async (e) => {
            const csv = e.target?.result as string;
            Papa.parse<RouteData>(csv, {
              header: true,
              complete: async (results) => {
                const data = results.data;
                setTableData(data);

                const waypoints = new Set<string>();
                data.forEach((route) => {
                  waypoints.add(route.origin);
                  waypoints.add(route.destination);
                  route.waypoint.split('|').forEach(wp => waypoints.add(wp));
                });
                const waypointArray = Array.from(waypoints);

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

                const optimizedRoute = tspRoute.map(index => waypointArray[index]);

                const validRoute = optimizedRoute.map(location => {
                  const [lat, lng] = location.split(',').map(Number);
                  if (!isNaN(lat) && !isNaN(lng)) {
                    return { lat, lng };
                  }
                  throw new Error('Invalid location format');
                });

                const directionsService = new google.maps.DirectionsService();
                directionsService.route(
                  {
                    origin: validRoute[0],
                    destination: validRoute[validRoute.length - 1],
                    waypoints: validRoute.slice(1, -1).map((location) => ({ location, stopover: true })),
                    travelMode: google.maps.TravelMode.DRIVING,
                    drivingOptions: {
                      departureTime: new Date(),
                      trafficModel: google.maps.TrafficModel.BEST_GUESS,
                    },
                  },
                  (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                      setDirections(result);
                      setOptimizedRouteData(result.routes[0].legs.map((leg, index) => ({
                        key: index,
                        start: leg.start_address,
                        end: leg.end_address,
                        distance: leg.distance?.text,
                        duration: leg.duration?.text,
                      })));
                    } else {
                      console.error(`Error fetching directions: ${status}`, result);
                    }
                  }
                );

                setMarkers(validRoute);
              },
            });
          };
          reader.readAsText(file);
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.push('/');
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleAddCsvClick = () => {
    fileInputRef.current?.click();
  };

  if (!isLoaded) return <div>Loading...</div>;

  const columns = [
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Waypoint',
      dataIndex: 'waypoint',
      key: 'waypoint',
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
      <div className="flex h-[calc(100vh-70px)]" style={{marginTop:"70px"}}>
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
            accept=".csv"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <div className="w-full" ref={mapRef}>
            <GoogleMap mapContainerStyle={mapSize} center={center} zoom={10}>
              {directions && <DirectionsRenderer directions={directions} />}
              {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
              ))}
            </GoogleMap>
          </div>
          <div className="mt-8 overflow-x-auto">
            <Table 
              columns={columns} 
              dataSource={tableData} 
              rowKey="origin" 
              style={{ marginTop: '20px' }} 
              title={() => 'Original Route Data'}
              scroll={{ x: true }}
            />
          </div>
          <div className="mt-8 overflow-x-auto">
            <Table 
              columns={optimizedRouteColumns} 
              dataSource={optimizedRouteData} 
              style={{ marginTop: '20px' }} 
              title={() => 'Optimized Route Data'}
              scroll={{ x: true }}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MapComponent;