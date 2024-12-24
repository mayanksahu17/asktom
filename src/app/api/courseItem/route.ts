import { Course } from '@/models/Course';
import dbConnect from '@/lib/dbConnect';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const courses = await Course.find();
    
    return Response.json({ success: true, data: courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return Response.json(
      { success: false, message: 'Error fetching courses' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { success: false, message: 'Course name is required' },
        { status: 400 }
      );
    }

    const course = await Course.findById({ _id : id});
    
    if (!course) {
      return Response.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return Response.json(
      { success: false, message: 'Error fetching course' },
      { status: 500 }
    );
  }
}