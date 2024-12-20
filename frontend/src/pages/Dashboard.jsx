import OrganizerDashboard from '../components/OrganizerDashboard'
import UserDashboard from '../components/UserDashboard'
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  console.log(user);
  
  return (
    <Layout>
      {user?.role==="user" ? <UserDashboard /> : <OrganizerDashboard />}
    </Layout>
  )
}

export default Dashboard