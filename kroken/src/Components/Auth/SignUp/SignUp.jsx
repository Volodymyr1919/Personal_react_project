import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import ErrorModal from "../../Partial/ErrorModal";
import { typeList } from "../../TypeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
// eslint-disable-next-line no-unused-vars
import signUp from "./signUp.scss"
import { faBriefcase, faChevronDown, faChevronRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignUp = observer(() => {

  const { RequestStore, ConfigStore } = useStores();

  const navigate = useNavigate();

    const [username, setUsername]               = useState("");
    const [business_type, setBusiness_type]     = useState("restaurant");
    const [business_name, setBusiness_name]     = useState("");
    const [who, setWho]                         = useState("visitor");
    const [password, setPassword]               = useState("");

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
          return RequestStore.doPost(ConfigStore._url + "/signup", {
            username        : (data.username).replace(/ /g,"_"),
            password        : data.password,
            business_name   : (data.business_name).replace(/ /g,"_"),
            type_business   : data.business_type,
            who             : data.who,
            bonus           : 2
          })
        })
        .then((res) => {
          if (res.acknowledged) {
            localStorage.setItem('myAppId', res.insertedId);
            who === 'visitor' ? navigate("/user") : navigate("/owner");
          } else {
            res.status === 403 ? ConfigStore.setErr("Username already existing") : ConfigStore.setErr(res.statusText);
            ConfigStore.setIsShow(true);
          }
        })
      };

    return(
        <div className="signup">
          <ErrorModal />
          <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">
                            <div className="loginSignUp">
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
                                  <FontAwesomeIcon icon={faChevronDown} className="login__icon"></FontAwesomeIcon>
                                  <select
                                    className="login__input"
                                    {...register("business_type", {
                                    required: 'Field is required',
                                    value: business_type,
                                    onChange: (e) => {
                                      setBusiness_type(e.target.value);
                                    }
                                  })}>
                                    {typeList.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
                                  </select>
                                </div>
                                <div className="login__field">
                                    <FontAwesomeIcon icon={faBriefcase} className="login__icon"></FontAwesomeIcon>
                                    <input
                                        type="text"
                                        className="login__input"
                                        placeholder="Business name"
                                        {...register("business_name", {
                                            required: 'Field is required',
                                            minLength: {
                                                value: 4,
                                                message: "Minimum 4 symbols"
                                            },
                                            value: business_name,
                                            onChange: (e) => {
                                              setBusiness_name(e.target.value);
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.business_name && errors.business_name.message}</p>
                                </div>
                                <div className="login__field">
                                  <FontAwesomeIcon icon={faChevronDown} className="login__icon"></FontAwesomeIcon>
                                  <select
                                    className="login__input"
                                    {...register("who", {
                                    required: 'Field is required',
                                    value: who,
                                    onChange: (e) => {
                                      setWho(e.target.value);
                                    }
                                  })}>
                                    <option value="visitor">Visitor</option>
                                    <option value="owner">Owner</option>
                                  </select>
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
                                    <span className="button__text">Sign Up Now</span>
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

export default SignUp;