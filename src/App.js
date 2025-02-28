import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './Home/Login'; // Adjust the path to your SignIn component
import HomePage from './Home/HomePage'; // Adjust the path to your HomePage component
import CallRecords from './Call records/Callrecords'; // Import the CallRecords component
import DataVis from './Data Visualization/datavis';
import Register from './Home/Register'; // Import the Register component
import HomePageAl from './Home/HomeAL';
import HomeAdmin from "./Home/HomePageAdmin";
import ReqService from "./Call records/ReqforService";
import HomeP1 from "./Home/HomeP1"
import HomeP2 from "./Home/HomeP2"
import HomeP3 from "./Home/HomeP3"
import HomeP4 from "./Home/HomeP4"
import HomeP5 from "./Home/HomeP5"




function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} /> {/* SignIn as default */}
        <Route path="/home1" element={<HomePageAl />} />
        <Route path="/home2" element={<HomeAdmin />} />
        <Route path="/homeEmp1" element={<HomeP1 />} />
        <Route path="/homeEmp2" element={<HomeP2 />} />
        <Route path="/homeEmp3" element={<HomeP3 />} />
        <Route path="/homeEmp4" element={<HomeP4 />} />
        <Route path="/homeEmp5" element={<HomeP5 />} />
    
        <Route path="/call-records" element={<CallRecords />} />
        <Route path="/reqservice" element={<ReqService />} /> {/* SignIn as default */}
        <Route path="/signin" element={<SignIn />} /> {/* Add SignUp route */}
        <Route path="/Data-vis" element={<DataVis />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
