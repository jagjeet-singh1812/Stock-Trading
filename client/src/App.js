import { makeStyles } from "@material-ui/core";
import LandingPage from "./Screens/LandingPage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Screens/CoinPage";
import Header from "./Components/Header";
import HomePage from "./Screens/HomePage"

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={LandingPage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route path="/homepage" component={HomePage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
