import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useScreen } from '../context/ScreenContext';
import API from '../services/API';

const BookingForm = () => {

    const location = useLocation();
    const { tripData, user } = location.state;
    const { isMobile } = useScreen();
    const navigate = useNavigate();
    const [postData, setPostData] = useState({ user: user?._id, trip: tripData?._id, passengers: [{name: '', age: null}] });

    const addPassenger = () => {
        console.log(postData.passengers);
        if(postData.passengers.length < tripData?.availableSlots){
            console.log("Adding passenger");
            setPostData({ ...postData, passengers: [...postData.passengers, { name: '', age: null }] });
            
        }
        else{
            toast.warning("No more slots available.");
            return ;
        }
    };
    
    const handleInputChange = (id, field, value) => {
        const updatedParticipants = postData.passengers.map((item, index) => 
            index === id ? { ...item, [field]: field==='age' ? parseInt(value) : value } : item
        );

        setPostData({ ...postData, passengers: updatedParticipants });
    };

    const removeParticipant = (e, id) => {
        e.preventDefault();
        if (postData.passengers.length === 1) {
            toast.warning("Cannot remove all passengers");
            return;
        }
        // setPassengers(passengers.filter((item,index) => index !== id));
        setPostData({ ...postData, passengers: postData.passengers.filter((item,index) => index !== id) });
    };

    const validate = () => {
        const cnt = {};
        for (const item of postData.passengers) {
            if(cnt[JSON.stringify(item)]) {
                toast.error("Duplicate entry not allowed");
                return false;
            }
            else cnt[JSON.stringify(item)] = 1;
            
            if (!item.name || !item.age) {
                toast.warning("Please fill all fields");
                return false;
            }
        }
    
        return true;
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          let validation = validate();
          console.log(postData);
          if(validation){
            const response = await API.post('/booking/book-trip', {postData},{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
      
            console.log(response.data);
      
            if(response.data.status === "success") {
                toast.success("Expense added successfully");
                navigate('/dashboard');
                setPostData({ user: user?._id, trip: tripData?._id, passengers: [{name: '', age: null}] });
        }
            else{
                toast.error("Failed to add expense");
            }
          }
        }catch(err) {
          console.log(err);
        }
    };

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-semibold'>Book a Trip</h1>
            <div className='px-4 py-4'>
                <p className='text-xl'>Trip Name: {tripData.tripName}</p>
                <p className='text-xl'>Trip Description: {tripData.tripDescription}</p>
            </div>
            <form className='px-4'>
                <h2 className='text-xl font-bold my-2'>Enter passenger details</h2>
                {postData.passengers.map((item, index) => (
                    <div key={index}>
                        <p>Passenger {index+1}</p>
                        <div className={`${!isMobile && "flex items-center"} mb-4`}>
                            <input
                                type="text"
                                value={item.name}
                                id="name"
                                name="name"
                                placeholder={`Enter participant ${index + 1} name`}
                                onChange={(e) => handleInputChange(index, e.target.id, e.target.value)}
                                className="w-full p-2 border border-green-300 rounded-md mr-2 mt-2"
                            />
                            <input
                                type="number"
                                value={item.age}
                                id="age"
                                name="age"
                                placeholder={`Enter participant ${index + 1} age`}
                                onChange={(e) => handleInputChange(index, e.target.id, e.target.value)}
                                className="w-full p-2 border border-green-300 rounded-md mr-2 mt-2"
                            />
                            {/* <input
                                type="number"
                                value={item.mobile}
                                id="mobile"
                                name="mobile"
                                placeholder={`Enter participant ${index + 1} contact`}
                                onChange={(e) => handleInputChange(index, e.target.id, e.target.value)}
                                className="w-full p-2 border border-green-300 rounded-md mr-2 mt-2"
                            /> */}
                            <button
                                onClick={(e) => removeParticipant(e, index)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={()=>addPassenger()}
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                >
                    Add Participant
                </button>
            </form>
            <div className='p-4 w-full'>
                <p>Payable Amount: Rs. {tripData.tripPrice * postData.passengers.length}</p>
                <div className='w-full grid grid-cols-2 gap-2 mt-2'>
                    <button className='px-4 py-2 rounded-lg bg-blue-500 text-white' onClick={(e)=>handleSubmit(e)}>Pay Now</button>
                    <button className='px-4 py-2 rounded-lg bg-gray-200'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default BookingForm