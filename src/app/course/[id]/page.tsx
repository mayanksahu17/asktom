'use client'
import { useEffect, useState } from 'react'
import {CardItem}  from '@/components/Card'

interface Course {
  _id: string
  courseName: string
  description: string
  instructor: string
  duration: number
  studentsEnrolled: string[]
  thumbNail: string
  courseLink: string
  githubCode: string
  links: string
  assesment: string
}

interface CourseResponse {
  success: boolean
  data: Course
}

export default function Page({ params }: { params: { id: string } }) {
  const [courseData, setCourseData] = useState<CourseResponse | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/courseItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params.id }),
        })
        const data = await response.json()
        setCourseData(data)
      } catch (error) {
        console.error('Error fetching course:', error)
      }
    }
    getData()
  }, [params.id])

  if (!courseData?.data) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <CardItem course={courseData.data} />
      </div>
    </div>
  )
}