"use client"
import React from 'react'

async function page({params} : any) {
    const pram = await params
    const courseId = pram.id;
    // TODO : get the all data of the course and show the all previre data of the course 
  return (
    <div className='bg-black'>{params}</div>
  )
}

export default page