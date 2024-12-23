"use client"
import CourseManagement  from '@/components/CourseUploadForm'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function DashboardPage() {
  const router =  useRouter()
  const logout = ()=>{
    router.push("/admin/sign-in")
  }
  return (
    <div className="container mx-auto p-4">
 <div className="flex">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Admin Dashboard</h1>
      <Button onClick={logout} className="ml-[80%]">
        Logout
      </Button>
      </div>      <CourseManagement />
    </div>
  )
}

