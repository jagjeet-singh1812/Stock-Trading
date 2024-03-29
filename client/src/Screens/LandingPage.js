import React, { useEffect } from "react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable";
import "./Landingpage.css"
import { Context } from "../Context";
import { useParams,useHistory } from "react-router-dom";
import { useContext } from "react";
import { Button } from "@material-ui/core";
import Stocktable from "./ParthwalaTable/Stocktable";
import Header from "../Components/Header";
const Homepage = () => {
  const history = useHistory();

  const {
    SelectedTab, SetSelectedTab
  } = useContext(Context);
  const handleTabChange = (tab) => {
    SetSelectedTab(tab);
  };
  function authUser(){
    console.log("hi")
    if(!localStorage.getItem("token")){
      alert("Not logged In!");
      history.push("/");
    }
  }

  useEffect(() =>{
    
    authUser();
  },[])
  return (
    <>
    <Header />
      <div className="btnx">
        <Button
          color="inherit"
          onClick={() => handleTabChange("Bitcoins")}
          variant={SelectedTab === "Bitcoins" ? "contained" : "text"}
          style={{ color: SelectedTab === "Bitcoins" ? "black" : "inherit" }}
        >
          Cryptocurrency
        </Button>
        <Button
          color="inherit"
          onClick={() => history.push("/stocks")}
          variant={SelectedTab === "Stocks" ? "contained" : "text"}
          style={{ color: SelectedTab === "Stocks" ? "black" : "inherit" }}
        >
          Stocks
        </Button>
        <Button
          color="inherit"
          onClick={() => history.push("/book")}
        >
          Bookmarks
        </Button>
      </div>
      {SelectedTab === "Bitcoins" && <Banner data_type = "crypto"/>}
      {SelectedTab === "Bitcoins" && <CoinsTable/>}
{SelectedTab==="Stocks" && <Stocktable/>}
    </>
  );
};

export default Homepage;
