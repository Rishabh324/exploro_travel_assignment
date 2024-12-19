import { useEffect, useState } from 'react'
import API from '../services/API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyOrganizings = () => {
    const [organizingData, setOrganizingData] = useState([])
    const [cancelModal, setCancelModal] = useState(false);
    const [organizingId, setOrganizingId] = useState('');
    const navigate = useNavigate();

    const handleDeleteOrganizings = async (tripId) => {
        try{
            const response = await API.delete(`/trips/delete-my-organizings/${tripId}`);
            if(response.data.status === "success"){
                toast.success(response.data.message);
                setCancelModal(false);
                getOrganizingData();
            }
        } catch(err){
            console.log(err);
        }
    };

    const getOrganizingData = async () => {
        try{
            const response = await API.get('/trips/get-my-organizings');
            if(response.data.status==='success'){
                setOrganizingData(response.data.trips);
            }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getOrganizingData();
    },[]);

    return (
        <div className={`${ organizingData?.length>0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}`}>
            {
                organizingData?.length>0 ? (
                    organizingData?.map((trip, index) => (
                        <div key={index} className='border-2 shadow-lg p-4 my-4 rounded-xl hover:border-blue-400'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl cursor-pointer font-semibold' onClick={()=>navigate('/browse-trips/'+trip?._id)}>{trip?.tripName}<span className={`${trip?.status==='ACTIVE' ? "bg-green-400 border-green-600" : " bg-red-400 border-red-600"} px-4 border-2 rounded-lg text-xs ml-2 font-normal`}>{trip?.status}</span></h1>
                                <div className='flex gap-4 items-center'>
                                    <p>Rs. {trip?.tripPrice}</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-2 items-center'>
                                <p>{new Date(trip?.tripDate).toLocaleDateString('en-CA')}</p>
                                {trip?.status==="ACTIVE" && <div className='flex gap-4 items-center'>
                                    <button className='px-4 py-1 border-2 border-blue-400 rounded-lg hover:bg-gray-200' onClick={()=>{setOrganizingId(trip._id); setCancelModal(true)}}>Remove</button>
                                    <button className='px-4 py-1 border-2 border-blue-600 rounded-lg bg-blue-400' onClick={()=>navigate(`/edit-trip/${trip._id}`, {state: trip})}>Edit</button>
                                </div>}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex items-center justify-center'>
                        <p className='items-center'> No items in cart</p>
                    </div>
                )
            }

            {cancelModal && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-4 rounded-lg'>
                        <h1 className='text-xl font-semibold'>Are you sure you want to cancel this trip?</h1>
                        <div className='flex justify-center gap-4 mt-4'>
                            <button className='px-4 py-2 bg-red-400 border-2 border-red-600 rounded-lg' onClick={()=>setCancelModal(false)}>No</button>
                            <button className='px-4 py-2 bg-green-400 border-2 border-green-600 rounded-lg' onClick={()=>handleDeleteOrganizings(organizingId)}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyOrganizings