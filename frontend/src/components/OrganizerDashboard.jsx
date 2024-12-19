import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import profile from '../assets/prof-icon.png'
import MyBookings from './MyBookings';
import MyOrganizings from './MyOrganizings';

const OrganizerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('organizings');
  const { user } = useSelector(state => state.auth);
  
  return (
    <div>
      <div className='p-4 rounded-md shadow-md flex'>
        <img src={profile} alt='profile' className='w-24 h-24 rounded-full'/>
        <div className='w-full flex justify-between items-center p-4'>
          <div>
            <h1 className='text-2xl'>{user?.name}</h1>
            <p>{user?.role}</p>
          </div>
          <div>
            <p>{user?.email}</p>
            <p>{user?.phone}</p>
          </div>
        </div>
      </div>
      <div className='p-4 rounded-md shadow-md w-full mt-4'>
        <div className='w-full flex gap-4 items-center'>
          <p className={`${selectedTab==='organizings' ? "border-2 border-blue-500 bg-blue-300 " : ""} cursor-pointer rounded-t-lg px-4 py-1`} onClick={()=>setSelectedTab('organizings')}>My organizings</p>
        </div>
        <hr className='border-b-1 border-blue-500'/>
        {selectedTab==='organizings' && <MyOrganizings />}
      </div>
    </div>
  )
}

export default OrganizerDashboard