import mongoose, { Schema, Document } from "mongoose";

// Define the Course interface
export interface Course extends Document {
  courseName: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  studentsEnrolled: number[];
  thumbNail : string;
  courseLink : string;
  githubCode : string;
  links : string;
  assesment : string;

}

// Define the Course Schema
const CourseSchema: Schema<Course> = new Schema({

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
  courseLink : {
    type: String,
    required: [true, "Course courseLink is required"],
  },
  githubCode : {
    type: String,
    required: [true, "Course githubCode is required"],
  },
  links : {
    type: String,
    required: [true, "Course links is required"],
  },
  assesment :  {
    type: String,
    required: [true, "Course assesment is required"],
  },







 




});

// Export the Course model
export const Course =
  (mongoose.models.Course as mongoose.Model<Course>) ||
  mongoose.model<Course>("Course", CourseSchema);
