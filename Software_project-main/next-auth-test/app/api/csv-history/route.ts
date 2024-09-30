import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI as string);
        const db = client.db('test'); 

        const csvUploads = await db.collection('csvUploads')
            .find({})
            .sort({ uploadedAt: -1 })
            .limit(50) 
            .toArray();

        await client.close();

        return NextResponse.json({ success: true, data: csvUploads });
    } catch (error) {
        console.error('Error fetching CSV history:', error);
        return NextResponse.json({ success: false, message: 'Error fetching CSV history' }, { status: 500 });
    }
}