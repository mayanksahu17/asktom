import { Course } from '@/models/Course';
import dbConnect from '@/lib/dbConnect';
import { NextRequest } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();

   
    // Extract fields from FormData
    const courseName = formData.get('courseName') as string;
    const description = formData.get('description') as string;
    const instructor = formData.get('instructor') as string;
    const duration = Number(formData.get('duration'));
    const courseLink = formData.get('courseLink') as string;
    const githubCode = formData.get('githubCode') as string;
    const links = formData.get('links') as string;
    const assesment = formData.get('assesment') as string;
    const thumbNailFile = formData.get('thumbNail') as string;
    await dbConnect();



    // Input validation
    const errors = [];
    if (!courseName) errors.push('Course name is required');
    if (!description) errors.push('Description is required');
    if (!instructor) errors.push('Instructor name is required');
    if (!duration || typeof duration !== 'number') errors.push('Duration must be a valid number');
    if (!thumbNailFile) errors.push('Thumbnail is required');
    if (!courseLink) errors.push('Course link is required');
    if (!githubCode) errors.push('Github code link is required');
    if (!links) errors.push('Additional links are required');
    if (!assesment) errors.push('Assessment is required');

    if (errors.length) {
      return new Response(
        JSON.stringify({ success: false, message: errors.join(', ') }),
        { status: 400 }
      );
    }

    // Check if course already exists
    const courseExists = await Course.findOne({ courseName });
    if (courseExists) {
      return new Response(
        JSON.stringify({ success: false, message: 'Course already exists with this name' }),
        { status: 400 }
      );
    }

    // Upload thumbnail to cloudinary
    const thumbNailResult = await cloudinary.uploader.upload(thumbNailFile, {
      folder: 'courses',
    });

    // Create a new course
    const newCourse = new Course({
      courseName,
      description,
      instructor,
      duration,
      thumbNail: thumbNailResult.secure_url,
      courseLink,
      githubCode,
      links,
      assesment,
      studentsEnrolled: [], // Default to an empty array
    });

    await newCourse.save();

    return new Response(
      JSON.stringify({ success: true, message: 'Course created successfully', data: newCourse }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating course:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating course' }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Get search parameters from URL
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('id');

    if (courseId) {
      // Fetch specific course
      const course = await Course.findById(courseId);
      if (!course) {
        return new Response(
          JSON.stringify({ success: false, message: 'Course not found' }),
          { status: 404 }
        );
      }
      return new Response(
        JSON.stringify({ success: true, data: course }),
        { status: 200 }
      );
    }

    // Fetch all courses
    const courses = await Course.find();
    return new Response(
      JSON.stringify({ success: true, data: courses }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching courses:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching courses' }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const {
      id,
      courseName,
      description,
      instructor,
      duration,
      thumbNail,
      courseLink,
      githubCode,
      links,
      assesment
    } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Course ID is required' }),
        { status: 400 }
      );
    }

    let updateData: any = {
      courseName,
      description,
      instructor,
      duration,
      courseLink,
      githubCode,
      links,
      assesment
    };

    // Only upload new thumbnail if provided
    if (thumbNail && !thumbNail.startsWith('http')) {
      const thumbNailResult = await cloudinary.uploader.upload(thumbNail, {
        folder: 'courses',
      });
      updateData.thumbNail = thumbNailResult.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return new Response(
        JSON.stringify({ success: false, message: 'Course not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Course updated successfully', data: updatedCourse }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating course:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error updating course' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Course ID is required' }),
        { status: 400 }
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return new Response(
        JSON.stringify({ success: false, message: 'Course not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Course deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting course:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting course' }),
      { status: 500 }
    );
  }
}