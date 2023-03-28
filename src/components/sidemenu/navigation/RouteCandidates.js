import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Myprofile from "../wrapper/Myprofile";
import CVmanager from "../wrapper/CVmanager";
import Deleteprofile from "../wrapper/Deleteprofile";
import Logout from "../wrapper/Logout";
import Changepassword from "../wrapper/Changepassword";
// import MenuLink from "./MenuLink";
import MenuCandidates from "../MenuCandidates";

const RouteCandidates = () => {
  return (
    <div>
      <MenuCandidates />
      <Router>
        <Switch>
          <Route exact path="/Myprofile" Component={Myprofile} />
          <Route exact path="/CVmanager" Component={CVmanager} />
          <Route exact path="/Changepassword" Component={Changepassword} />
          <Route exact path="/Deleteprofile" Component={Deleteprofile} />
          <Route exact path="/Logout" Component={Logout} />
        </Switch>
      </Router>
    </div>
  );
};

export default RouteCandidates;
