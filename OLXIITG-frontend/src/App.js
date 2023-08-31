import React,{useState} from "react";
import ItemState from "./Context/item/ItemState";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import AuthState from "./Context/authentication/AuthState";
import Login from "./Component/Login";
import SubNavbar from "./Component/SubNavbar";
import SignUp from "./Component/SignUp";
import SetPassword from "./Component/SetPassword";
import ResetPassword from "./Component/ResetPassword";
import NewItem from "./Component/NewItem";

import ResetSetPassword from "./Component/ResetSetPassword";
import Description from "./Component/Description";
import Itembycategory from "./Component/Itembycategory";
import Profile from "./Component/editprofile/Profile";
import Useritem from "./Component/useritems/Useritem";
import LikedItem from "./Component/activity/LikedItem";
import Alert from "./Component/Alert";
import DescFetch from "./Component/DescFetch";
import UpdateItem from "./Component/UpdateItem";
import Likedby from "./Component/Likedby";
import UserProf from "./Component/UserProf";
import Messanger from "./Pages/Messanger";
import AdminLogin from "./Component/AdminLogin";
import AllUsers from "./Component/AllUsers";
import AdminUserProf from "./Component/AdminUserProf";
import AllItems from "./Component/AllItems";
import AdminItemDesc from "./Component/AdminItemDesc";


function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (type, message, time) =>
    setAlert({
      msg: message,
      type: type
    },
      setTimeout(() => {
        setAlert(null);
      }, time));
  return (
    <AuthState>
      <ItemState>
        <Router>
          <Navbar />
          <div style={{ marginTop: "80px" }} >
            <SubNavbar />
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route path="/newitem" element={<NewItem showAlert={showAlert}/>}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} isadmin={false}/>}></Route>
              <Route path="/admin/login" element={<Login showAlert={showAlert} isadmin={true}/>}></Route>
              <Route path="/description/:id" forcedRefresh={true} element={<DescFetch showAlert={showAlert}/>}></Route>
              <Route path="/sign-up" element={<SignUp showAlert={showAlert}/>}></Route>
              <Route path="/set-password/:token" element={<SetPassword showAlert={showAlert}/>}></Route>
              <Route path="/edit-profile" element={<Profile showAlert={showAlert}/>}></Route>
              <Route path="/item/:category" element={<Itembycategory showAlert={showAlert} forceRefresh={true}/>}></Route>
              <Route path="/allitemsposted" element={<Useritem showAlert={showAlert}/>}></Route>
              <Route path="/likeditem" element={<LikedItem showAlert={showAlert}/>}></Route>
              <Route path="/reset-password" element={<ResetPassword showAlert={showAlert}/>}></Route>
              <Route path="/reset-set-password/:email/:token" element={<ResetSetPassword showAlert={showAlert}/>}></Route>
              <Route path="/update-item/:id" element={<UpdateItem showAlert={showAlert}/>}></Route>
              <Route path="/likedby/:id" element={<Likedby showAlert={showAlert}/>}></Route>
              <Route path="/userprof/:id" element={<UserProf showAlert={showAlert}/>}></Route>
              <Route path="/messanger/" element={<Messanger/>}></Route>
              <Route path="/admin-userprof/:id" element={<AdminUserProf showAlert={showAlert}/>}></Route>
              <Route path="/admin/allusers" element={<AllUsers showAlert={showAlert}/>}></Route>
              <Route path="/admin/allitems" element={<AllItems showAlert={showAlert}/>}></Route>
              <Route path="/admin/item/desc/:id" element={<AdminItemDesc showAlert={showAlert}/>}></Route>

            </Routes>
          </div>
        </Router>
      </ItemState>
    </AuthState>
  );
}

export default App;
