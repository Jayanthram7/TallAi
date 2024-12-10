import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './Home/Register'; // Adjust the path to your SignIn component
import HomePage from './Home/HomePage'; // Adjust the path to your HomePage component
import CallRecords from './Call records/Callrecords'; // Import the CallRecords component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* SignIn as default */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/call-records" element={<CallRecords />} />
        <Route path="/signin" element={<SignIn />} /> {/* Add SignUp route */}
      </Routes>
    </Router>
  );
}

export default App;
