import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/API';
import { useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";

const TripDetails = () => {
    const {id} = useParams();
    const [tripData, setTripData] = useState({});
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const getTrip = async () => {
        try {
            const response = await API.get(`/trips/get-trip/${id}`);

            if(response.data.status === "success"){
                setTripData(response.data.trip);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTrip();
    },[]);

    return (
        <div className='shadow-md rounded-lg p-4'>
            <h1 className='text-2xl font-semibold flex items-center'><p className='mr-2 cursor-pointer' onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></p>Trip Details Page</h1>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-xl'>{tripData.tripName}</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-2xl'>Rs. {tripData.tripPrice} <span className='text-sm'>per head</span></p>
                        {
                            (user?.role==="user" && tripData?.status==="ACTIVE") && <button className='px-4 py-2 bg-blue-300 border-2 border-blue-600 rounded-lg' onClick={()=>navigate('/book-trip', {state: {tripData, user}})}>
                                Buy Tickets
                            </button>
                        }
                    </div>
                </div>
                <p>{tripData?.tripDescription}</p>
                {user?.role==="user" && <p className='mt-2 text-lg text-red-600'>
                    Hurry!! {tripData?.availableSlots} slots remaining. Book your slots now !
                </p>}
                <div>
                    <hr className='my-4'/>
                    <h1 className='text-xl font-semibold mb-2'>Important Details</h1>
                    {tripData?.status==="ACTIVE" ? (
                        <li className='text-lg'>
                            The trip starts on {new Date(tripData?.tripDate).toLocaleDateString('en-CA')}.
                        </li>
                        ) : (
                            <li>The trip has been cancelled.</li>
                        )
                    }
                    {tripData?.status==="ACTIVE" && <li className='text-lg'>
                        The trip duration is {tripData?.tripDuration} days.
                    </li>}
                </div>
                {user?.role==="user" &&
                <div>
                    <hr className='my-4'/>
                    <h1 className='text-xl font-semibold mb-2'>Organizer Details</h1>
                    <p className='text-lg'>Name: {tripData?.organizer?.name}</p>
                    <p className='text-lg'>Email: {tripData?.organizer?.email}</p>
                    <p className='text-lg mt-4'>Having a query? Contact {tripData?.organizer?.phone} !!</p>
                </div>}
                <div>
                    <hr className='my-4'/>
                    <h1 className='text-xl font-semibold mb-2'>Cancellation Policy</h1>
                    <li className='text-lg'>Full Refund prior to 15 days.</li>
                    <li className='text-lg'>50% Refund prior to 7 days.</li>
                    <li className='text-lg'>No Refund for cancellation less than 7 days.</li>
                </div>
            </div>
        </div>
    )
}

export default TripDetails