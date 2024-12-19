import { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../services/API';
import { useNavigate } from 'react-router-dom';

const OrganizeTrip = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    tripName: '',
    tripDescription: '',
    tripPrice: '',
    tripDate: new Date(),
    tripDuration: '',
    availableSlots: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    id!=='tripDate' ? setFormData({
      ...formData,
      [id]: value
    }) : setFormData({
      ...formData,
      [id]: new Date(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(formData);
      const response = await API.post('/trips/create-trip', 
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
      if(response.data.status === "success") {
        toast.success("Trip added successfully");
        navigate('/dashboard');
      }
    } catch(err){
      toast.error("Failed to add car");
      console.log(err);
    }
  }

  return (
    <div>
      <div className='p-4'>
        <h1 className='text-3xl font-semibold'>Orgnanize a trip</h1>
        <div className='flex flex-col mt-4'>
          <label htmlFor='tripName' className='text-lg font-semibold'>Trip Name</label>
          <input type='text' id='tripName' value={formData.tripName} placeholder='Enter Trip Name' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='tripDescription' className='text-lg font-semibold'>Description</label>
          <input type='text' id='tripDescription' value={formData.tripDescription} placeholder='Enter Description' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='tripPrice' className='text-lg font-semibold'>Price</label>
          <input type='number' id='tripPrice' value={formData.tripPrice} placeholder='Enter Model' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='availableSlots' className='text-lg font-semibold'>Available Slots</label>
          <input type='number' id='availableSlots' value={formData.availableSlots} placeholder='Enter slots' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='tripDate' className='text-lg font-semibold'>Date</label>
          <input type='date' id='tripDate' value={formData.tripDate.toLocaleDateString('en-CA')} placeholder='Enter Model' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='tripDuration' className='text-lg font-semibold'>Duration (in days)</label>
          <input type='number' id='tripDuration' value={formData.tripDuration} placeholder='Enter Duration' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex justify-center my-4'>
          <button className='bg-blue-400 text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Create Trips</button>
        </div>
      </div>
    </div>
  )
}

export default OrganizeTrip