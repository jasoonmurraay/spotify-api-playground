import getAccessToken from "@/pages/api/getAccessToken";
import { createContext, useContext, useState, useEffect } from "react";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [spotifyTokenState, setSpotifyTokenState] = useState({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    expirationTime: typeof window !== 'undefined' ? localStorage.getItem('expirationTime') : null,
    isTokenValid: typeof window !== 'undefined' ? localStorage.getItem('expirationTime') > Date.now() : null,
  });
  const updateSpotifyToken = (newToken, newExpiresIn) => {
    const newExpirationTime = Date.now() + newExpiresIn * 1000
    localStorage.setItem('token', newToken)
    localStorage.setItem('expirationTime', newExpirationTime)
    localStorage.setItem('isTokenValid', newExpirationTime && newExpirationTime > Date.now())
    console.log("Is token valid in context: ", newExpirationTime > Date.now())
    setSpotifyTokenState({
      ...spotifyTokenState,
      token: newToken,
      expirationTime: newExpirationTime,
      isTokenValid: newExpirationTime && newExpirationTime > Date.now(),
    });
  };
  // const setToken = (token) => {
  //   setState({ ...state, token: token });
  //   console.log("New state: ", state)
  // };
  // const setExpirationTime = (expires_in) => {
  //   setState({ ...state, expirationTime: Date.now() + expires_in * 1000 });
  //   setState({
  //     ...state,
  //     isTokenValid: state.expirationTime && state.expirationTime > Date.now(),
  //   });
  // };
  // const initState = {
  //   token: null,
  //   setToken: setToken,
  //   expirationTime: null,
  //   setExpirationTime: setExpirationTime,
  //   isTokenValid: null,
  // };
  // const [state, setState] = useState(initState);
  // console.log("State: ", state)

  // setState({

  //   expirationTime: Date.now() + expires_in * 1000,
  //   isTokenValid: expirationTime && expirationTime > Date.now(),
  // });

  // const [token, setToken] = useState(null);
  // const [expirationTime, setExpirationTime] = useState(null);

  // const setNewToken = (newToken, new_expires_in) => {
  //   setToken(newToken)
  //   setExpirationTime(Date.now() + new_expires_in * 1000)
  // }

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     console.log("Fetching from context!")
  //     const response = await getAccessToken();
  //     console.log("Response in context: ", response)
  //     const { access_token, expires_in } = await response.data;
  //     console.log("Access_token: ", access_token)
  //     console.log("Expires_in: ", expires_in)
  //     setToken(access_token);
  //     setExpirationTime(Date.now() + expires_in * 1000);
  //   };
  //   fetchToken();
  // }, []);

  // // useEffect(() => {
  // //   const expires_in = 3600
  // //   setExpirationTime(Date.now() + expires_in * 1000);
  // // }, [updateToken])

  // // function updateTokenData(newTokenData) {
  // //   setToken(newTokenData)
  // // }

  // const isTokenValid = expirationTime && expirationTime > Date.now();

  return (
    <SpotifyContext.Provider value={{ spotifyTokenState, updateSpotifyToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};
