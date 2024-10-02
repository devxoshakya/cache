// app/api/fuckyou/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from "@/config/Mongoose";
import User from "@/model/User";

export async function POST(req) {
  try {
    // Parse the request body to get the user email or name
    const { email, name } = await req.json();

    if (!email && !name) {
      return NextResponse.json({ error: 'Please provide either email or name' }, { status: 400 });
    }

    await connectToDatabase(); // Connect to the database

    // Find the user by email or name
    const user = await User.findOne({ $or: [{ email }, { name }] });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Set the user as blocked
    user.isBlocked = true;
    await user.save();

    return NextResponse.json({ message: `User ${user.name || user.email} has been blocked` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
