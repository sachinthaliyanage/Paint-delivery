import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

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

       
        const content = await file.text();

        console.log("File content (first 100 chars):", content.substring(0, 100));

        // Connect to MongoDB
        console.log("Connecting to MongoDB...");
        const client = await MongoClient.connect(process.env.MONGODB_URI as string);
        const db = client.db('test'); 

       
        console.log("Inserting data into MongoDB...");
        const result = await db.collection('csvUploads').insertOne({
            filename: file.name,
            content: content,
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