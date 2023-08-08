// import {useEffect } from "react";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
function App() {
  // const [loading, setLoading] = useState(false);
  // const [isauth, setisAuth] = useState(false);
  // useEffect(() => {
  //   // const userinfo = localStorage.getItem("userinfo");
  //   // setisAuth(userinfo !== null);
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2500);
  // }, []);
  // return loading ? (
  //   // <Splash />
  //   <h1>theek hai bhai </h1>
  // ) : (
    return (
    <>
     {/* <Scrolltop /> */}
      {/* <Meganavbar /> */}
      {/* <UpwardsArrow /> */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/second" element={<About/>}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;