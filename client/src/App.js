import { makeStyles } from "@material-ui/core";
import LandingPage from "./Screens/LandingPage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Screens/CoinPage";
import LoginPage from "./Screens/LoginPage/LoginPage";
import Dashboard from "./Components/Dashboard";
import StockContext from "./context/StockContext";
import RegisterPage from './Screens/RegisterPage/RegisterPage'
import AppContext from "./Context";
import ThemeContext from "./context/ThemeContext";
import { useState } from "react";
import Bookmarkpage from "./Screens/Bookmarkpage";
import StocksPage from "./Screens/StocksPage/StocksPage";

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
    <AppContext>
    <BrowserRouter>
      <div className={classes.App}>
        
        <Route path="/home" component={LandingPage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/book">
          <Bookmarkpage/>
        </Route>
        <Route exact path="/stocks">
          <StocksPage/>
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
    </AppContext>
  );
}

export default App;
