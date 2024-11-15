import React from 'react'
import Form from 'next/form'
import Link from 'next/link'



const page = () => {
  return (
    <div className='flex justify-center items-center h-screen'  >
      <Link href={"/quiz"}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">quiz</button></Link>

    </div>
  )
}

export default page
