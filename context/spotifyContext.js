import getAccessToken from '@/pages/api/getAccessToken';
import { createContext, useContext, useState, useEffect } from 'react';

export const SpotifyContext = createContext();



export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await getAccessToken();
      console.log("Response in context: ", response)
      const { access_token, expires_in } = await response.data;
      console.log("Access_token: ", access_token)
      console.log("Expires_in: ", expires_in)
      setToken(access_token);
      setExpirationTime(Date.now() + expires_in * 1000);
    };
    fetchToken();
  }, []);

  // function updateTokenData(newTokenData) {
  //   setToken(newTokenData)
  // }

  const isTokenValid = expirationTime && expirationTime > Date.now();

  return (
    <SpotifyContext.Provider value={{ token, isTokenValid }}>
      {children}
    </SpotifyContext.Provider>
  );
};