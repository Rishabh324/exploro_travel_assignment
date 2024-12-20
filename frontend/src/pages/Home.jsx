import Layout from '../components/Layout'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth);
    
    return (
        <Layout>
            <div className="homepage-container">
                <header className="homepage-header">
                    <h1>Explore the World with Us!</h1>
                </header>
                <main className="homepage-content">
                    <section className="about-company">
                        <h2 className='text-2xl font-semibold'>About Us</h2>
                        <p>
                            We are your trusted travel partner, helping you explore amazing
                            destinations around the globe. Discover new experiences, immerse
                            yourself in diverse cultures, and create memories to last a lifetime.
                        </p>
                    </section>
                    {!user && <section className="action-buttons">
                        <button onClick={()=>navigate('/login')} className="btn login-btn">
                            Login
                        </button>
                        <button onClick={()=>navigate('/register')} className="btn register-btn">
                            Register
                        </button>
                        <button onClick={()=>navigate('/browse-trips')} className="btn guest-btn">
                            Continue as Guest
                        </button>
                    </section>}
                </main>
            </div>
        </Layout>
    )
}

export default Home