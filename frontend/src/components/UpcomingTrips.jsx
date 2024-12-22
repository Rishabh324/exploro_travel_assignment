import { useEffect, useState } from 'react'
import API from '../services/API';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const UpcomingTrips = () => {
    const [tripsData, setTripsData] = useState([]);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    console.log(user);
    const getTripsData = async () => {
        const response = await API.get('/trips/get-upcoming-trips', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            }
        );
        if(response.data.status === "success"){
            setTripsData(response.data.data.trips);
        }
    };

    const handleAddCart = async (tripId) => {
        try{
            if(!user){
                toast.error("Please login to add trip to cart");
                navigate('/login');
                return ;
            }else{
                const response = await API.post('/cart/add-to-cart', { tripId: tripId }, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                    }
                });
                if(response.data.status === "success"){
                    toast.success("Trip added to cart successfully");
                }
            }

        } catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getTripsData();
    },[]);

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Upcoming Trips</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    tripsData.length>0 ? (tripsData.map((trip, index) => 
                        (
                            <div key={index} className='hover:border-blue-400 cursor-pointer border-2 shadow-lg p-4 my-4 rounded-xl'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-xl font-semibold'>{trip.tripName}<span className={`
                                    ${trip?.status==='ACTIVE' && "border-green-600 bg-green-400"} 
                                    ${trip?.status==='CANCELLED' && "border-red-600 bg-red-400"} 
                                    border-2 px-4 ml-2 rounded-lg text-xs font-normal`}>{trip?.status}</span></h1>
                                    <div className='flex gap-4 items-center'>
                                        <p>Rs. {trip.tripPrice}</p>
                                        <button className='px-4 py-1 bg-blue-400 rounded-lg border-2 border-blue-400' onClick={()=>navigate('/browse-trips/'+trip._id)}>View Details</button>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <p>{new Date(trip.tripDate).toLocaleDateString('en-CA')}</p>
                                    <button className='px-4 py-1 border-2 border-blue-400 rounded-lg hover:bg-gray-200' onClick={()=>handleAddCart(trip._id)}>Add to cart</button>
                                </div>
                            </div>
                        )
                    )) : <p>No upcoming trips</p>
                }
            </div>
        </div>
    )
}

export default UpcomingTrips