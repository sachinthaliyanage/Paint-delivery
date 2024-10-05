import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json();
    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const expiresIn = rememberMe ? '30d' : '1h'; 
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn });

    const response = NextResponse.json(
      { message: 'Login successful', role: user.role },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 60 * 60, 
      path: '/',
    });

    console.log(  "token" , token);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}