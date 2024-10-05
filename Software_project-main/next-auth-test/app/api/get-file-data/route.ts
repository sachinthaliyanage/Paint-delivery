import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
    console.log('API route called');
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('fileId');

    console.log('Received fileId:', fileId);

    if (!fileId) {
        console.log('File ID is missing');
        return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    try {
        console.log('Connecting to MongoDB');
        const client = await MongoClient.connect(process.env.MONGODB_URI as string);
        const db = client.db('test');

        console.log('Querying database for fileId:', fileId);
        const fileData = await db.collection('csvUploads').findOne({ _id: new ObjectId(fileId) });

        await client.close();

        if (!fileData) {
            console.log('File not found in database');
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        console.log('File data found:', JSON.stringify(fileData, null, 2));
        return NextResponse.json(fileData);
    } catch (error) {
        console.error('Error fetching file data:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}