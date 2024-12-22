import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { currentUser } from '../redux/features/auth/authActions';
import API from '../services/API';

const PublicRoute = ({ children }) => {
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const { data } = await API.get('/auth/currentUser');
            if (data?.status) dispatch(currentUser(data));
        }
        catch (err) {
            localStorage.clear();
            console.log(err);
        }
    }

    useEffect(() => {
        getUser()
    })

    return children;
}

export default PublicRoute