import { makeStyles } from "@material-ui/core";
import LandingPage from "./Screens/LandingPage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Screens/CoinPage";
import Header from "./Components/Header";
import HomePage from "./Screens/HomePage";
import LoginPage from "./Screens/LoginPage/LoginPage";

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
      </div>
    </BrowserRouter>
  );
}

export default App;
