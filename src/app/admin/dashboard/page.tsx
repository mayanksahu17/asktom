import CourseManagement  from '@/components/CourseUploadForm'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <CourseManagement />
    </div>
  )
}

