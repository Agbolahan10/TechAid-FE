import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
// // import Dashboard from './Pages/Dashboard';
// import LodgeComplaint from './Pages/LodgeComplaint';
// import TrackComplaint from './Pages/TrackComplaint';
// import Reports from './Pages/Reports';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/lodge-complaint" element={<LodgeComplaint />} /> */}
        {/* <Route path="/track-complaint" element={<TrackComplaint />} /> */}
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Routes>
    </Router>
  );
}

export default App;