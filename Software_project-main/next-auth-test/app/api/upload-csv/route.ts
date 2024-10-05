import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import * as XLSX from 'xlsx';

export async function POST(req: NextRequest) {
    console.log("CSV upload route hit");
    try {
        const data = await req.formData();
        const file = data.get('file') as File | null;

        if (!file) {
            console.log("No file uploaded");
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        console.log("File received:", file.name);

        // Read the file content
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
        
        // Assume the first sheet contains the data
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract waypoints (assuming they're in the second column, starting from the second row)
        const waypoints = jsonData.slice(1).map((row: any) => row[1]);

        // console.log("Extracted waypoints (first 5):", waypoints.slice(0, 5));

        // Connect to MongoDB
        console.log("Connecting to MongoDB...");
        const client = await MongoClient.connect(process.env.MONGODB_URI as string);
        const db = client.db('test'); 

        console.log("Inserting data into MongoDB...");
        const result = await db.collection('csvUploads').insertOne({
            filename: file.name,
            waypoints: waypoints,
            uploadedAt: new Date()
        });

        await client.close();

        console.log("File uploaded successfully. MongoDB ID:", result.insertedId);
        return NextResponse.json({ success: true, message: 'File uploaded successfully', id: result.insertedId });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, message: 'Error uploading file' }, { status: 500 });
    }
}