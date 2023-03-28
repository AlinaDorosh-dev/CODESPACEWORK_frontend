import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChangePassword from "../../views/ChangePassword";
// import Home from "../wrapper/Home";
// import MenuEmployers from "../MenuEmployers";

const RouteEmployers = () => {
  return (
    <div>
      {/* <MenuEmployers /> */}
      <Router>
        <Routes>
          <Route exact path="/Profile" Component={<Profile />} />
          <Route exact path="/Postanewjob" Component={<Postanewjob />} />
          <Route exact path="/Managejobs" Component={<Managejobs />} />
          <Route exact path="/Changepassword" Component={<ChangePassword />} />
          <Route exact path="/Deleteprofile" Component={<Deleteprofile />} />
          <Route exact path="/Logout" Component={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RouteEmployers;
