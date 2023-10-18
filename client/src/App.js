import { makeStyles } from "@material-ui/core";
import LandingPage from "./Screens/LandingPage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Screens/CoinPage";
import Header from "./Components/Header";
import HomePage from "./Screens/HomePage";
import LoginPage from "./Screens/LoginPage/LoginPage";
import Dashboard from "./Components/Dashboard";
import StockContext from "./context/StockContext";

import ThemeContext from "./context/ThemeContext";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("MSFT");
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/home" component={LandingPage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        {/* <Route path="/homepage" component={HomePage} exact /> */}
        {/* <Route exact path="/registration">
          <LoginLayout>
            <RegistrationPage />
          </LoginLayout>
        </Route> */}
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/company">
          <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
              <Dashboard />
            </StockContext.Provider>
          </ThemeContext.Provider>
          {/* <h1>hi</h1> */}
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
