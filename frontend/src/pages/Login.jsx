// import { toast } from 'react-toastify';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../services/AuthService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    return (
        <div className="p-4 flex h-screen justify-center items-center bg-blue-400">
            <div className="bg-blue-200 lg:8/12 md:w-4/12 rounded-lg p-4">
                <h1 className="text-3xl text-center">Login</h1>
                <form className="p-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(e, email, password, role);
                }}>
                    <div className="items-center flex gap-2">
                        <p className="inline">Role:</p>
                        <div className="inline-flex">
                            <input
                                type="radio"
                                checked={role === "user"}
                                value={"user"}
                                name="user"
                                id="user"
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-2 border border-gray-400 rounded-lg"
                            />
                            <label htmlFor="user">User</label>
                        </div>
                        <div className="inline-flex">
                            <input
                                type="radio"
                                checked={role === "organizer"}
                                value={"organizer"}
                                name="organizer"
                                id="organizer"
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-2 border border-gray-400 rounded-lg"
                            />
                            <label htmlFor="organizer">Organizer</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block">Email:</label>
                        <input
                            type="text"
                            value={email}
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="pswd" className="block">Password:</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter Password"
                            name="pswd"
                            id="pswd"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <button type="submit" className="p-2 bg-blue-500 mt-2 rounded-lg w-full text-center shadow-md">
                            Sign In
                        </button>
                        <p>Not a User? <Link to={'/register'}>SignUp</Link></p>
                    </div>
                    <hr className="border-1 border-black mt-4 mb-2"></hr>
                    <p className="text-center">Or</p>
                </form>
                <div className="px-4 mb-4">
                    <button className="rounded-lg bg-blue-500 p-2 w-full text-center" onClick={()=>{navigate('/')}}>Sign in as Guest</button>
                </div>
            </div>
        </div>
    )
}

export default Login