"use client"
import { Dashboard } from "@/components/Dashboard"
import { Layout } from "@/components/Layout"
import {useRouter} from 'next/navigation'
import { log } from "node:console"
export default function Home() {
  const router = useRouter()
  const token  = localStorage.getItem("token");
  const userName  = localStorage.getItem("userName");
  console.log(token?.length);
   
  if(token?.length == undefined){
    router.push("/sign-in");
  }
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

