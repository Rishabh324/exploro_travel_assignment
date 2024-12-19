// import { toast } from 'react-toastify';
import { useState } from "react";
import { Link } from "react-router-dom";
import { handleRegister } from "../services/AuthService";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        phone: "",
        role: ""
    });

    return (
        <div className="p-4 flex h-screen justify-center items-center bg-blue-400">
            <div className="bg-blue-200 rounded-lg p-4">
                <h1 className="text-3xl text-center">Register User</h1>
                <form className="p-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister(e, formData.email, formData.name, formData.password, formData.phone, formData.role);
                }}>
                    <div className="items-center flex gap-2">
                        <p className="inline">Role:</p>
                        <div className="inline-flex">
                            <input
                                type="radio"
                                checked={formData.role === "user"}
                                value={"user"}
                                name="user"
                                id="user"
                                onChange={(e) => setFormData({...formData, "role": e.target.value})}
                                className="w-full p-2 border border-gray-400 rounded-lg"
                            />
                            <label htmlFor="user">User</label>
                        </div>
                        <div className="inline-flex">
                            <input
                                type="radio"
                                checked={formData.role === "organizer"}
                                value={"organizer"}
                                name="organizer"
                                id="organizer"
                                onChange={(e) => setFormData({...formData, "role": e.target.value})}
                                className="w-full p-2 border border-gray-400 rounded-lg"
                            />
                            <label htmlFor="organizer">Organizer</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block">Email:</label>
                        <input
                            type="text"
                            value={formData.email}
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            onChange={(e) => setFormData({...formData, "email": e.target.value})}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block">Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            placeholder="Enter Name"
                            name="name"
                            id="name"
                            onChange={(e) => setFormData({...formData, "name": e.target.value})}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="pswd" className="block">Password:</label>
                        <input
                            type="password"
                            value={formData.password}
                            placeholder="Enter Password"
                            name="pswd"
                            id="pswd"
                            onChange={(e) => setFormData({...formData, "password": e.target.value})}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block">Phone No:</label>
                        <input
                            type="number"
                            value={formData.phone}
                            placeholder="Enter Password"
                            name="phone"
                            id="phone"
                            onChange={(e) => setFormData({...formData, "phone": e.target.value})}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <button className="p-2 bg-blue-500 mt-2 rounded-lg shadow-md">
                            Sign Up
                        </button>
                        <p>Already a User? <Link to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register