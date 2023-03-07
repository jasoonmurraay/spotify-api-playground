import Router from "next/router";
import { useState, useEffect } from "react";

const ErrorMsg = (props) => {
  // console.log("Error Props: ", props);
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   console.log("hash: ", hash);
  //   let token = window.localStorage.getItem("token");
  //   console.log("Token; ", token);
  //   if (!token && hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((elem) => elem.startsWith("access_token"))
  //       .split("=")[1];
  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //   }
  //   setToken(token);
  // });
  // const clientId = "acd3854010f7468690e7ff12c6b5a2b3";
  // const redirectUri = "http://localhost:3000";
  // const authEndpoint = "https://accounts.spotify.com/authorize";
  // const responseType = "token";
  // let status = props.error.response.status;
  // if (status !== undefined && status === 401) {
  //   console.log("401!");
  //   Router.push(
  //     `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
  //   );
  // } else {
    return <h1>{props.error.message}</h1>;
  // }
};
export default ErrorMsg;
