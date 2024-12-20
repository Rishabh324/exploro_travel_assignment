import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <Layout>
        <div className="lay -m-3 bg-gray-100 flex flex-col justify-between">
        {/* Header
        <header className="bg-blue-600 text-white py-4 shadow-lg">
            <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="mt-1 text-lg">Welcome to Travel Haven</p>
            </div>
        </header> */}

        {/* Main Content */}
        <main className="container mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold">About Us</h1>
            <br/>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
                Travel Haven is your one-stop solution for booking incredible trips
                worldwide. Whether you’re seeking adventure, relaxation, or cultural
                experiences, we bring you curated travel packages and seamless booking
                options. With our commitment to quality and transparency, we ensure
                your travel is stress-free and memorable.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
                Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
                To inspire and enable everyone to explore the world by making travel
                affordable, accessible, and easy to plan.
            </p>
            </div>

            {/* Login/Register Options */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Login */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-600 mb-4">Login</h4>
                <p className="text-gray-600 mb-4">
                    Access your account to manage bookings and explore exclusive deals.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onClick={()=>navigate('/login')}>
                    Login
                </button>
            </div>

            {/* Register */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-600 mb-4">Register</h4>
                <p className="text-gray-600 mb-4">
                    Join us and start your journey toward unforgettable adventures.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={()=>navigate('/register')}>
                    Register
                </button>
            </div>

            {/* Continue as Guest */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-600 mb-4" onClick={()=>navigate('/')}>
                Continue as Guest
                </h4>
                <p className="text-gray-600 mb-4">
                Browse trips and discover destinations without signing in.
                </p>
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                Continue as Guest
                </button>
            </div>
            </div>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-4 text-center">
            <p>&copy; {new Date().getFullYear()} Travel Haven. All rights reserved.</p>
        </footer>
        </div>
    </Layout>
  );
};

export default Home;
