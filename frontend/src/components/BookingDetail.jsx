import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/API';
import { useSelector } from 'react-redux';
import { useScreen } from '../context/ScreenContext';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";

const BookingDetail = () => {
    const {id} = useParams();
    const [bookingData, setBookingData] = useState({});
    const { user } = useSelector(state => state.auth);
    const { isMobile } = useScreen();
    const [cancelModal, setCancelModal] = useState(false);
    const navigate = useNavigate();

    const getBooking = async () => {
        try {
            const response = await API.get(`/booking/get-booking/${id}`,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });

            console.log(response);
            if(response.data.status === "success"){
                setBookingData(response.data.booking);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelBooking = async (bookingId) => {
        try{
            const response = await API.delete(`/booking/cancel/${bookingId}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
            console.log(response);
            if(response.data.status === "success"){
                toast.success(response.data.message);
                setCancelModal(false);
                getBooking();
            }
        } catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getBooking();
    },[]);

    return (
        <div className='shadow-md rounded-lg p-4'>
            <h1 className='text-2xl font-semibold flex items-center'><p className='mr-2 cursor-pointer' onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></p>Booking Details Page</h1>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-xl'>{bookingData?.trip?.tripName}</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-2xl'>Amount Paid:  {bookingData?.trip?.tripPrice*bookingData?.passengers?.length} Rs.</p>
                        {user?.role==="user" && bookingData?.status!=='CANCELLED' && <button className='px-4 py-2 bg-red-300 border-2 border-red-600 rounded-lg' onClick={()=>setCancelModal(true)}>Cancel Tickets</button>}
                    </div>
                </div>
                <p>{bookingData?.trip?.tripDescription}</p>
                <p className='my-4 text-lg'>
                    Trip status: 
                    {bookingData?.status==='CONFIRMED' && <span className='px-4 py-1 text-xs border-2 border-green-600 bg-green-400 w-max rounded-lg'>{bookingData?.status}</span>}
                    {bookingData?.status==='CANCELLED' && <span className='px-4 py-1 text-xs border-2 border-red-600 bg-red-400 w-max rounded-lg'>{bookingData?.status}</span>}
                    {bookingData?.status==='PENDING' && <span className='px-4 py-1 text-xs border-2 border-yellow-600 bg-yellow-400 w-max rounded-lg'>{bookingData?.status}</span>}
                </p>
                {(bookingData?.status==='CANCELLED') && <p className='text-md'>The trip has been cancelled. Amount of Rs. {bookingData?.amountRefunded} will be refunded to your bank account.</p>}
                <hr className='my-4'/>
                <h1 className='text-xl font-semibold mb-2'>Passenger Details</h1>
                <div className={`${isMobile ? "w-full" : "w-6/12"} gap-4`}>
                    {bookingData?.passengers?.map((item, index) => (
                        <div key={index} className='flex justify-between items-center'>
                            <p>{item.name}</p>
                            <p>{item.age} years</p>
                        </div>
                    ))}
                </div>
                <hr className='my-4'/>
                <div>
                    <h1 className='text-xl font-semibold mb-2'>Important Details</h1>
                    <li className='text-lg'>The trip starts on {new Date(bookingData?.trip?.tripDate).toLocaleDateString('en-CA')}.</li>
                    <li className='text-lg'>The trip duration is {bookingData?.trip?.tripDuration} days.</li>
                </div>
                <hr className='my-4'/>
                <div>
                    <h1 className='text-xl font-semibold mb-2'>Cancellation Policy</h1>
                    <li className='text-lg'>Full Refund prior to 15 days.</li>
                    <li className='text-lg'>50% Refund prior to 7 days.</li>
                    <li className='text-lg'>No Refund for cancellation less than 7 days.</li>
                </div>
            </div>

            {cancelModal && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-4 rounded-lg'>
                        <h1 className='text-xl font-semibold'>Are you sure you want to cancel the booking?</h1>
                        <div className='flex justify-center gap-4 mt-4'>
                            <button className='px-4 py-2 bg-red-400 border-2 border-red-600 rounded-lg' onClick={()=>setCancelModal(false)}>No</button>
                            <button className='px-4 py-2 bg-green-400 border-2 border-green-600 rounded-lg' onClick={()=>handleCancelBooking(bookingData?._id)}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookingDetail