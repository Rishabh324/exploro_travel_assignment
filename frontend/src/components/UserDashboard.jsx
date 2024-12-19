import { useState } from 'react'
import { useSelector } from 'react-redux';
import profile from "../assets/prof-icon.png";
import MyBookings from './MyBookings';
import MyCart from './MyCart';

const UserDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [selectedTab, setSelectedTab] = useState('cart');

  return (
    <div className=''>
      <div className='p-4 rounded-md shadow-md flex'>
        <img src={profile} alt='profile' className='w-24 h-24 rounded-full'/>
        <div className='w-full flex justify-between items-center p-4'>
          <div>
            <h1 className='text-2xl'>{user.name}</h1>
            <p>{user.role}</p>
          </div>
          <div>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>
      <div className='p-4 rounded-md shadow-md w-full mt-4'>
        <div className='w-full flex gap-4 items-center'>
          <p className={`${selectedTab==='cart' ? "border-2 border-blue-500 bg-blue-300 " : ""} cursor-pointer rounded-t-lg px-4 py-1`} onClick={()=>setSelectedTab('cart')}>View Cart</p>
          <p className={`${selectedTab==='booking' ? "border-2 border-blue-500 bg-blue-300 " : ""} cursor-pointer rounded-t-lg px-4 py-1`} onClick={()=>setSelectedTab('booking')}>My Bookings</p>
        </div>
        <hr className='border-b-1 border-blue-500'/>
        {selectedTab==='cart' ? <MyCart /> : <MyBookings />}
      </div>
    </div>
  )
}

export default UserDashboard;