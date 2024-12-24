
"use client"
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ExternalLink, Github, Book, Clock, Users } from 'lucide-react'
import { useState } from 'react'
interface CourseProps {
    course: {
      _id: string
      courseName: string
      description: string
      instructor: string
      duration: number
      studentsEnrolled: string[]
      thumbNail: string
      courseLink: string
      githubCode: string
      assesment: string
    }
  }
export function CardItem({ course }: CourseProps) {
    return (
      <Card className="overflow-hidden ">
        <img 
          src={course.thumbNail} 
          alt={course.courseName}
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{course.courseName}</span>
            <span className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration} weeks
            </span>
          </CardTitle>  
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{course.description}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Book className="w-4 h-4" />
              Instructor: {course.instructor}
            </div>
  
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              Students enrolled: {course.studentsEnrolled.length}
            </div>
  
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(course.courseLink, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Course Link
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={() => window.open(course.githubCode, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Code
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(course.assesment, '_blank')}
              >
                <Book className="w-4 h-4 mr-2" />
                Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }