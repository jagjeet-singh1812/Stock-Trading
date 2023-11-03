import React from "react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable";
import "./Landingpage.css"
import { Context } from "../Context";
import { useContext } from "react";
import { Button } from "@material-ui/core";
import Stocktable from "./ParthwalaTable/Stocktable";
const Homepage = () => {
  const {
    SelectedTab, SetSelectedTab
  } = useContext(Context);
  const handleTabChange = (tab) => {
    SetSelectedTab(tab);
  };
  return (
    <>
      <div className="btnx">
        <Button
          color="inherit"
          onClick={() => handleTabChange("Bitcoins")}
          variant={SelectedTab === "Bitcoins" ? "contained" : "text"}
          style={{ color: SelectedTab === "Bitcoins" ? "black" : "inherit" }}
        >
          Bit Coins
        </Button>
        <Button
          color="inherit"
          onClick={() => handleTabChange("Stocks")}
          variant={SelectedTab === "Stocks" ? "contained" : "text"}
          style={{ color: SelectedTab === "Stocks" ? "black" : "inherit" }}
        >
          Stocks
        </Button>
      </div>
      {SelectedTab === "Bitcoins" && <Banner />}
      {SelectedTab === "Bitcoins" && <CoinsTable/>}
{SelectedTab==="Stocks" && <Stocktable/>}
    </>
  );
};

export default Homepage;
