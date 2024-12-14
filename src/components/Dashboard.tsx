"use client"
import { useState, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";

export function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses"); // Replace with the correct API route
        const data = await response.json();

        if (data.success) {
          console.log(data.data);
          
          setCourses(data.data); // Assuming API returns data under "data"
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Course Dashboard</h1>
      {loading ? (
        <p className="text-gray-400">Loading courses...</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course: any) => (
            <CourseCard
              key={course.courseId}
              courseId={course.courseId}
              courseName={course.courseName}
              description={course.description}
              instructor={course.instructor}
              duration={course.duration}
              thumbnail={course.thumbNail}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No courses found.</p>
      )}
    </div>
  );
}
