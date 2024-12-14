import { Course } from '@/models/Course'; // Import the Course model
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { courseId, courseName, description, instructor, duration , thumbNail } = await req.json();

    // Input validation
    const errors = [];
    if (!courseId) errors.push('Course ID is required');
    if (!courseName) errors.push('Course name is required');
    if (!description) errors.push('Description is required');
    if (!instructor) errors.push('Instructor name is required');
    if (!thumbNail) errors.push('Instructor name is required');
    if (!duration || typeof duration !== 'number') errors.push('Duration must be a valid number');

    if (errors.length) {
      return new Response(JSON.stringify({ success: false, message: errors.join(', ') }), { status: 400 });
    }

    // Check if course already exists
    const courseExists = await Course.findOne({ courseId });

    if (courseExists) {
      return new Response(
        JSON.stringify({ success: false, message: 'Course already exists with the same ID' }),
        { status: 400 }
      );
    }

    // Create a new course
    const newCourse = new Course({
      courseId,
      courseName,
      description,
      instructor,
      duration,
      thumbNail,
      studentsEnrolled: [], // Default to an empty array
    });

    await newCourse.save();

    return new Response(
      JSON.stringify({ success: true, message: 'Course created successfully', data: newCourse }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating course', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating course' }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Fetch all courses
    const courses = await Course.find();

    return new Response(
      JSON.stringify({ success: true, data: courses }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching courses', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching courses' }),
      { status: 500 }
    );
  }
}
