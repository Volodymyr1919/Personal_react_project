import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorModal from "../../Partial/ErrorModal";
import Feedback from "../../Partial/Feedback/Feedback";
import "bootstrap/dist/css/bootstrap.css";
// eslint-disable-next-line no-unused-vars
import signIn from "./signIn.scss";
import { faChevronRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignIn = observer(() => {

  const { RequestStore, ConfigStore } = useStores();

  const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
      const onSubmit = (data) => {
        new Promise((resolve, reject) => {
          resolve();
        })
        .then(() => {
          return RequestStore.doPost(ConfigStore._url + "/signin", {
            username : (data.username).replace(/ /g,"_"),
            password : data.password
          })
        })
        .then((res) => {
          if (res._id) {
            localStorage.setItem('myAppId', res._id);
            switch (res.who) {
              case "visitor":
                navigate("/user");
                break;
                
              case "owner":
                navigate("/owner");
                break;

              default:
                break;
            }
          } else {
            res.status === 404 ? ConfigStore.setErr("User not found") : ConfigStore.setErr(res.statusText);
            ConfigStore.setIsShow(true);
          }
        })
      };

    return(
      <div className="signin">
        <ErrorModal />
        <Feedback />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="screen">
              <div className="screen__content">
                <div className="login">
                    <div className="login__field">
                        <FontAwesomeIcon icon={faUser} className="login__icon"></FontAwesomeIcon>
                        <input
                            type="text"
                            className="login__input"
                            placeholder="User name / Email"
                            {...register("username", {
                                required: 'Field is required',
                                minLength: {
                                    value: 4,
                                    message: "Minimum 4 symbols"
                                },
                                value: username,
                                onChange: (e) => {
                                  setUsername(e.target.value);
                                }
                            })}
                        />
                        <p className="errorMessage">{errors.username && errors.username.message}</p>
                    </div>
                    <div className="login__field">
                        <FontAwesomeIcon icon={faLock} className="login__icon"></FontAwesomeIcon>
                        <input
                            type="password"
                            className="login__input"
                            placeholder="Password"
                            {...register("password", {
                                required: 'Field is required',
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 symbols"
                                },
                                value: password,
                                onChange: (e) => {
                                  setPassword(e.target.value);
                                }
                            })}
                        />
                        <p className="errorMessage">{errors.password && errors.password.message}</p>
                    </div>
                    <button type="submit" className="button login__submit">
                        <span className="button__text">Log In Now</span>
                        <FontAwesomeIcon icon={faChevronRight} className="button__icon"></FontAwesomeIcon>
                    </button>				
                </div>
              </div>
              <div className="screen__background"></div>		
            </div>
          </div>
        </form>
        <div className="signin__bg"></div>
      </div>
    );
});

export default SignIn;