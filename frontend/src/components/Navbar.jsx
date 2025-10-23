import React from 'react'

export default function Navbar() {
  return (
    <div className='flex px-12 py-6 bg-gray-100 justify-between'>
        <div>
            CampusVibes
        </div>
        <div >
<ul className='flex gap-8'>
            <li>Home</li>
            <li>Events</li>
        </ul>
        </div>
        
    </div>
  )
}
