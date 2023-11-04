import { LinearProgress, makeStyles, Typography,Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../Components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import Header from "../Components/Header";
import Bookmarkpage from "./Bookmarkpage";
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));


  const removebookmark =async()=>{
    try {
      const userInfo = localStorage.getItem("email");
      if (!userInfo) {
        // Handle the case where user information is not available
        toast.warning({
          title: "Error Occurred!",
          description: "User information not found.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          className: "toast-custom-style",
        });
        return;
      }
  console.log(userInfo)
      // const userEmail = userInfo.email;
      // Make an API call to add the bookmark using the user's email
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/remove",
        {
          email: userInfo,
          url:"test",
         title:coin?.name
        },
        config
      );
      console.log(data)
      toast({
        title: "Bookmark Added!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        className: "toast-custom-style",
      });
    } catch (error) {
      toast.warning({
        title: "Error Occurred!",
        description:"some error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        className: "toast-custom-style",
      });
    }
  }

  const addBookmarkToServer = async () => {
    try {
      const userInfo = localStorage.getItem("email");
      if (!userInfo) {
        // Handle the case where user information is not available
        toast.warning({
          title: "Error Occurred!",
          description: "User information not found.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          className: "toast-custom-style",
        });
        return;
      }
  console.log(userInfo)
      // const userEmail = userInfo.email;
      // Make an API call to add the bookmark using the user's email
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/bookmark",
        {
          email: userInfo,
          url:"test",
         title:coin?.name
        },
        config
      );
      console.log(data)
      toast.success({
        title: "Bookmark Added!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        className: "toast-custom-style",
      });
    } catch (error) {
      toast.warning({
        title: "Error Occurred!",
        description:"some error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        className: "toast-custom-style",
      });
    }
  };
let isBookmarkedx=false;
const[userBookmark,setUserBookmarks]=useState(new Set([]))
  useEffect(() => {
    const fetchUserBookmarks = async () => {
      try {
        const userInfo = localStorage.getItem("email");
        if (!userInfo) {
          return;
        }
        const { data } = await axios.post("http://localhost:5000/api/v1/user/getbookmark", {
          email: userInfo,
        });
        console.log(data);
        setUserBookmarks(new Set(data.map(bookmark => bookmark.title)));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserBookmarks();
    console.log(userBookmark)
  }, []);
  
  
  const classes = useStyles();
  isBookmarkedx = userBookmark.has(coin?.name);
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedx);
  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    await addBookmarkToServer();
  };
  const handleBookmarkr = async () => {
    setIsBookmarked(!isBookmarked);
    await removebookmark();
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <>
    <Header/>
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <Button
          variant="contained"
          disabled={isBookmarked}
          color={isBookmarked ? "secondary" : "primary"} // Change color based on bookmark status
          onClick={handleBookmark}
        >
          Add Bookmark
        </Button>
          <Button
          variant="contained"
          disabled={!isBookmarked}
          color={isBookmarked ? "secondary" : "primary"} // Change color based on bookmark status
          onClick={handleBookmarkr}
        >
        Remove Bookmark
        </Button>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
      <ToastContainer/>
    </>
  );
};

export default CoinPage;
