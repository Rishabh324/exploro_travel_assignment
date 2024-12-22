import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
const Login = React.lazy(()=>import('./pages/Login'));
const Register = React.lazy(()=>import('./pages/Register'));
const PublicRoute = React.lazy(()=>import('./Routes/PublicRoute'));
const ProtectedRoute = React.lazy(()=>import('./Routes/ProtectedRoute'));
const Dashboard = React.lazy(()=>import('./pages/Dashboard'));
const Home = React.lazy(()=>import('./pages/Home'));
const UpcomingTripsPage = React.lazy(()=>import('./pages/UpcomingTripsPage'));
const OrganizeTripPage = React.lazy(()=>import('./pages/OrganizeTripPage'));
const TripDetailsPage = React.lazy(()=>import('./pages/TripDetailsPage'));
const EditTripPage = React.lazy(()=>import('./pages/EditTripPage'));
const BookingFormPage = React.lazy(()=>import('./pages/BookingFormPage'));
const BookingDetailsPage = React.lazy(()=>import('./pages/BookingDetailsPage'));

function App() {

  return ( 
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  )
}

export default App;