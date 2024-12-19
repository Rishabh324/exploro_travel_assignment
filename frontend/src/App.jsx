import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './Routes/PublicRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UpcomingTripsPage from './pages/UpcomingTripsPage';
import OrganizeTripPage from './pages/OrganizeTripPage';
import TripDetailsPage from './pages/TripDetailsPage';
import EditTripPage from './pages/EditTripPage';
import BookingFormPage from './pages/BookingFormPage';
import BookingDetailsPage from './pages/BookingDetailsPage';

function App() {

  return ( 
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/browse-trips" element={
            <UpcomingTripsPage />
          } />
          <Route path="/browse-trips/:id" element={
            <TripDetailsPage />
          } />
          <Route path="/create-trip" element={
            <ProtectedRoute>
              <OrganizeTripPage />
            </ProtectedRoute>
          } />
          <Route path="/book-trip" element={
            <ProtectedRoute>
              <BookingFormPage />
            </ProtectedRoute>
          } />
          <Route path="/view-booking/:id" element={
            <ProtectedRoute>
              <BookingDetailsPage />
            </ProtectedRoute>
          } />
          <Route path="/edit-trip/:id" element={
            <ProtectedRoute>
              <EditTripPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;