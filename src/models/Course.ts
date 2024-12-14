import mongoose, { Schema, Document } from "mongoose";

// Define the Course interface
export interface Course extends Document {
  courseId: number;
  courseName: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  studentsEnrolled: number[];
  thumbNail : string;
}

// Define the Course Schema
const CourseSchema: Schema<Course> = new Schema({
  courseId: {
    type: Number,
    required: [true, "Course ID is required"],
    unique: true,
  },
  courseName: {
    type: String,
    required: [true, "Course name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor name is required"],
  },
  duration: {
    type: Number,
    required: [true, "Course duration is required"],
  },
  studentsEnrolled: [
    {
      type: Number, // Assuming `studentsEnrolled` stores the `userId`s of enrolled students
      required: true,
    },
  ],
  thumbNail: {
    type: String,
    required: [true, "Course thumbNail is required"],
  },
});

// Export the Course model
export const Course =
  (mongoose.models.Course as mongoose.Model<Course>) ||
  mongoose.model<Course>("Course", CourseSchema);
