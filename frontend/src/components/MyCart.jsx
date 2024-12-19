import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../services/API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
    const [cartData, setCartData] = useState([]);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleRemoveFromCart = async (tripId) => {
        try{
            const response = await API.delete(`/cart/remove/${tripId}`);
            console.log(response);
            if(response.data.status === "success"){
                toast.success(response.data.message);
                getCartData();
            }
        } catch(err){
            console.log(err);
        }
    };

    const getCartData = async () => {
        try{
            const response = await API.get('/cart/get-cart-items');
            console.log(response);
            if(response.data.status==='success'){
                setCartData(response.data.cart.trips);
            }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getCartData();
    },[]);

    return (
        <div className={`${ cartData?.length>0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}`}>
            {
                cartData?.length>0 ? (
                    cartData?.map((trip, index) => (
                        <div key={index} className='border-2 shadow-lg p-4 my-4 rounded-xl hover:border-blue-400'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl cursor-pointer font-semibold' onClick={()=>navigate('/browse-trips/'+trip?._id)}>{trip?.tripName}<span className={`
                                    ${trip?.status==='CONFIRMED' && "border-green-600 bg-green-400"} 
                                    ${trip?.status==='CANCELLED' && "border-red-600 bg-red-400"} 
                                    ${trip?.status==='PENDING' && "border-yellow-600 bg-yellow-400"} 
                                    border-2 px-4 ml-2 rounded-lg text-xs font-normal`}>{trip?.status}</span></h1>
                                <div className='flex gap-4 items-center'>
                                    <p>Rs. {trip?.tripPrice}</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-2 items-center'>
                                <p>{new Date(trip?.tripDate).toLocaleDateString('en-CA')}</p>
                                <button className='px-4 py-1 border-2 border-blue-400 rounded-lg hover:bg-gray-200' onClick={()=>handleRemoveFromCart(trip._id)}>Remove</button>
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

export default MyCart