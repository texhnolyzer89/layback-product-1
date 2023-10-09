"use client"

import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Home: NextPage = () => {

  const router = useRouter()

  useEffect(() => {
    axios.post('/api/auth/verify-cookie').then(res => { if(res.status!=200) router.push('/auth/login')}).catch(err => { router.push('/auth/login')})
  }, [])


  try {
  } catch (err) {
  }

  return (
    <>
      <title>Product 1</title>
      <div className="flex flex-col items-start justify-center my-6 mx-4 border-gray border rounded">
        <h5 className="border-t-gray border-solid py-[6px] px-4 bg-gray-light text-nav w-full border-b border-gray mr-6 text-[20px] font-[500]">Product 1</h5>
        Stuff
      </div>
    </>
  )
}

export default Home