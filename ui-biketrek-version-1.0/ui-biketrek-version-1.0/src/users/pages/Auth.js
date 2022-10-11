import React, { Component, useContext, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AuthContext } from "../../shared/context/Auth-Context";
import { useHttpClient } from "../../hooks/http-hook";

const clientId =
  "1028300281697-je4836o2u7sq39evg54u3a964o73jqh7.apps.googleusercontent.com";

function Auth() {
  const auth = useContext(AuthContext);

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onLoginSuccess = async (res) => {
    setShowloginButton(false);
    setShowlogoutButton(true);

    try {
      await sendRequest(
        "http://localhost:3001/biketrek/adduser",
        "POST",
        JSON.stringify({
          googleId: res.googleId,
          name: res.profileObj.name,
          photo: res.profileObj.imageUrl,
          email: res.profileObj.email,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login();
    } catch (err) {}
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    setShowloginButton(true);
    setShowlogoutButton(false);
    auth.logout();
  };
  return (
    <div class="ui center aligned basic segment">
      <div class="ui horizontal divider">Logo</div>
      <div class="ui hidden section divider"></div>
      <div class="ui card centered">
        <div class="content">
          <div class="center aligned header">Login with Google</div>
          <div class="center aligned description"></div>
        </div>
        <div class="extra content">
          <div class="center aligned author">
            <div>
              {showloginButton ? (
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign In"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              ) : null}

              {showlogoutButton ? (
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Sign Out"
                  onLogoutSuccess={onSignoutSuccess}
                ></GoogleLogout>
              ) : null}
            </div>
            <div class="ui hidden section divider"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;
