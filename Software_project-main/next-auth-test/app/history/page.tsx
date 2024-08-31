'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card, Typography, Button } from "@material-tailwind/react";
import LoggedHeader from '../LoggedHeader';
import Footer from '../Footer';

interface CSVUpload {
    _id: string;
    filename: string;
    uploadedAt: string;
}

export default function History() {
    const [csvUploads, setCSVUploads] = useState<CSVUpload[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/csv-history');
                if (!response.ok) {
                    throw new Error('Failed to fetch history');
                }
                const data = await response.json();
                setCSVUploads(data.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const dateBodyTemplate = (rowData: CSVUpload) => {
        return new Date(rowData.uploadedAt).toLocaleString();
    };

    const handleBackClick = () => {
        router.push('/mappg');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <LoggedHeader />
            <div className="min-h-[calc(100vh-140px)] p-4" style={{marginTop:"70px"}}>
                <div className="mb-4">
                    <Button
                        color="blue"
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300 shadow-md"
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                </div>
                <Card className="h-full w-full overflow-scroll">
                    <Typography variant="h4" color="blue-gray" className="p-4">
                        CSV Upload History
                    </Typography>
                    <DataTable value={csvUploads} paginator rows={10} dataKey="_id" 
                               emptyMessage="No CSV uploads found" className="p-datatable-sm">
                        <Column field="filename" header="Filename" sortable></Column>
                        <Column field="uploadedAt" header="Upload Date" body={dateBodyTemplate} sortable></Column>
                    </DataTable>
                </Card>
            </div>
            <Footer />
        </>
    );
}