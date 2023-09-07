import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { Button } from "antd";
import "./GitLogin.scss";

const CLIENT_ID = "CLIENT ID";

const GitLogin = () => {
  const { setUserData, setIsLoggedIn } = useContext(UserContext);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && !localStorage.getItem("accessToken")) {
      async function getAccessToken() {
        try {
          const response = await fetch(
            "http://localhost:4000/getAccessToken?code=" + codeParam,
            {
              method: "GET",
            }
          );

          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);

            setIsLoggedIn(true);
            await getUserData();
          }
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:4000/getUserData", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }

  const LoginWithID = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  };

  return (
    <Button className="Login" size="large" onClick={LoginWithID}>
      Login
    </Button>
  );
};

export default GitLogin;
