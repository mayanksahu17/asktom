"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from '@/utill/uploadthing';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Url } from 'next/dist/shared/lib/router/router';

// const [url , setUrl ] = useState("")
// Interface for Course data
interface Course {
  _id: string;
  courseName: string;
  description: string;
  instructor: string;
  duration: number;
  thumbNail: string;
  courseLink: string;
  githubCode: string;
  links: string;
  assesment: string;
  studentsEnrolled: number[];
}

// Interface for form data
interface CourseFormData {
  courseName: string;
  description: string;
  instructor: string;
  duration: string;
  thumbNail: string;
  courseLink: string;
  githubCode: string;
  links: string;
  assesment: string;
}

// Interface for API response
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export default function CourseManagement(): JSX.Element {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    courseName: '',
    description: '',
    instructor: '',
    duration: '',
    thumbNail: '',
    courseLink: '',
    githubCode: '',
    links: '',
    assesment: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (): Promise<void> => {
    try {
      const response = await fetch('/api/courses');
      const data: ApiResponse<Course[]> = await response.json();
      if (data.success && data.data) {
        setCourses(data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> 
  ): void => {

    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;
      if (files && files.length > 0) {
        // Convert the file to a base64 string for preview (optional)
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            [name]: files[0]
          }));
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
   

  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      
      // Append all non-file fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'thumbNail' && value !== null) {
          formDataToSend.append(key, value);
        }
      });
  
      // Append the file if it exists
      if (formData.thumbNail) {
        formDataToSend.append('thumbNail', formData.thumbNail);
      }
  
      const url = isEditing && selectedCourse 
        ? `/api/courses?id=${selectedCourse._id}` 
        : '/api/courses';
      const method = isEditing ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        body: formDataToSend, // Send FormData instead of JSON
        // Remove the Content-Type header as FormData will set it automatically
      });
  
      const data: ApiResponse<Course> = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: isEditing ? "Course updated successfully" : "Course created successfully",
        });
        fetchCourses();
        resetForm();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save course",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`/api/courses?id=${courseId}`, {
          method: 'DELETE'
        });
        const data: ApiResponse<null> = await response.json();
        
        if (data.success) {
          toast({
            title: "Success",
            description: "Course deleted successfully",
          });
          fetchCourses();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete course",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (course: Course): void => {
    setIsEditing(true);
    setSelectedCourse(course);
    setFormData({
      courseName: course.courseName,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration.toString(),
      thumbNail: "",
      courseLink: course.courseLink,
      githubCode: course.githubCode,
      links: course.links,
      assesment: course.assesment
    });
  };

  const resetForm = (): void => {
    setFormData({
      courseName: '',
      description: '',
      instructor: '',
      duration: '',
      thumbNail: "",
      courseLink: '',
      githubCode: '',
      links: '',
      assesment: ''
    });
    setIsEditing(false);
    setSelectedCourse(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">Add New Course</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course instructor</Label>
                  <Input
                    id="instructor"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course courseLink</Label>
                  <Input
                    id="courseLink"
                    name="courseLink"
                    value={formData.courseLink}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course githubCode</Label>
                  <Input
                    id="githubCode"
                    name="githubCode"
                    value={formData.githubCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course links</Label>
                  <Input
                    id="links"
                    name="links"
                    value={formData.links}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course assesment</Label>
                  <Input
                    id="assesment"
                    name="assesment"
                    value={formData.assesment}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                   <div className="space-y-2">
                    <Label htmlFor="thumbNail">Course Thumbnail</Label>
                    <Input
                      type="text"
                      id="thumbNail"
                      name="thumbNail"
                      onChange={handleInputChange}
                      accept="image/*"
                      required={!isEditing}
                    />  
                  </div> 
                  {/* <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={async(res : any) => {
                  const url =  res[0].url
                  setUrl(url)
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                />
              </div> */}
                {/* Rest of the form fields remain the same, just with proper event typing */}
                {/* ... */}
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? 'Update' : 'Create'} Course
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course._id} className="flex flex-col">
              <CardHeader>
                <img
                  src={course.thumbNail}
                  alt={course.courseName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle>{course.courseName}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">
                  Instructor: {course.instructor}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Duration: {course.duration} hours
                </p>
                <p className="line-clamp-3">{course.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleEdit(course)}>
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}