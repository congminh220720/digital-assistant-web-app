import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/auth";
import jwt_decode from "jwt-decode";
import googleIcon from "../../assets/img/icon btn/googleIcon.png";
import firebase, { auth, db } from "../../firebase/config";
import "./style.scss";
import { setUserToken, getUserToken } from "../../utils/localData";

// const auth1 = false;

const ggProvider = new firebase.auth.GoogleAuthProvider();

function Login(props) {
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const { additionalUserInfo } = await auth.signInWithPopup(ggProvider);

    console.log(additionalUserInfo);
    if (additionalUserInfo.isNewUser) {
      try {
        const infoUser = {
          email: additionalUserInfo.profile.email,
          name: additionalUserInfo.profile.name,
          photoUrl: additionalUserInfo.profile.picture,
        };
        const res = await authApi.createAccount(infoUser);
        setUserToken(res.msgResp.token);
        navigate("/");
      } catch (error) {}
    }
  };

  useEffect(() => {
    const isCheckToken = getUserToken();
    if (isCheckToken) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="login__page">
        <div className="login__page-layout">
          <p>Digital-Assistant</p>
          <div className="login__page-form">
            <div className="login__page-form-user-name">
              <input
                type="text"
                name=""
                id="userName"
                placeholder="User name"
              />
            </div>
            <div className="login__page-form-pass">
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
              />
            </div>
            <button className="login__page-form-btn">Login</button>
          </div>

          <div className="login__page-btn">
            <button
              className="login__page-btn-google"
              onClick={handleLoginWithGoogle}
            >
              <img src={googleIcon} alt="" />
              <span>Login with Google</span>
            </button>
            <button className="login__page-btn-new-account">
              Create new account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
