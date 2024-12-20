import { useEffect, useState } from 'react'
import API from '../services/API';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBookings = () => {
    const [bookingData, setBookingData] = useState([]);
    const navigate = useNavigate();

    const getBookingData = async () => {
        const response = await API.get('/booking/get-all-bookings', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
        
        if(response.data.status==='success'){
            setBookingData(response.data.bookings);
        }
    };
    console.log(bookingData);

    useEffect(()=>{
        getBookingData();
    },[]);
    return (
        <div className={`${ bookingData?.length>0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}`}>
            {
                bookingData?.length>0 ? (
                    bookingData?.map((booking, index) => (
                        <div key={index} className='border-2 shadow-lg p-4 my-4 rounded-xl hover:border-blue-400'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl cursor-pointer font-semibold'>{booking?.trip?.tripName}<span className={`
                                    ${booking?.status==='CONFIRMED' && "border-green-600 bg-green-400"} 
                                    ${booking?.status==='CANCELLED' && "border-red-600 bg-red-400"} 
                                    ${booking?.status==='PENDING' && "border-yellow-600 bg-yellow-400"} 
                                    border-2 px-4 ml-2 rounded-lg text-xs font-normal`}>{booking?.status}</span></h1>
                                <div className='flex gap-4 items-center'>
                                    <p>Rs. {booking?.trip?.tripPrice}</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-2 items-center'>
                                <div>
                                    <p>Trip Date: {new Date(booking?.trip?.tripDate).toLocaleDateString('en-CA')}</p>
                                    <p>Booked on: {new Date(booking?.bookingDate).toLocaleDateString('en-CA')}</p>
                                </div>
                                <button className='px-4 py-1 border-2 border-blue-400 rounded-lg bg-blue-400 hover:text-white' onClick={()=>navigate('/view-booking/'+booking?._id)}>View Booking</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex items-center justify-center'>
                        <p className='items-center'> No items in cart</p>
                    </div>
                )
            }
        </div>
    )
}

export default MyBookings