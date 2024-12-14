import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  courseId: number;
  courseName: string;
  description: string;
  instructor: string;
  duration: number;
  thumbnail: string;
}

export function CourseCard({
  courseId,
  courseName,
  description,
  instructor,
  duration,
  thumbnail,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-800 bg-gray-900">
      <img
        src={thumbnail}
        alt={courseName}
        width={300}
        height={200}
        className="w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-gray-100">{courseName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">Course ID: <span className="text-gray-300">{courseId}</span></p>
        <p className="text-sm text-gray-400">Instructor: <span className="text-gray-300">{instructor}</span></p>
        <p className="text-sm text-gray-400">Duration: <span className="text-gray-300">{duration} hours</span></p>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
