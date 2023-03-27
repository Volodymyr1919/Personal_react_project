import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { typeList } from "../../TypeList";
import "bootstrap/dist/css/bootstrap.css";
// eslint-disable-next-line no-unused-vars
import signUp from "./signUp.scss"

export default function SignUp() {

    const navigate = useNavigate();

    const [username, setUsername]               = useState("");
    const [business_type, setBusiness_type]     = useState("restaurant");
    const [business_name, setBusiness_name]     = useState("");
    const [who, setWho]                         = useState("visitor");
    const [password, setPassword]               = useState("");
    const [show, setShow]                       = useState(false);
    const [resText, setResText]                 = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
      const onSubmit = (data) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type"      : "application/json"
          },
          body: JSON.stringify({
            username        : data.username,
            password        : data.password,
            business_name   : data.business_name,
            type_business   : data.business_type,
            who             : data.who,
            bonus           : 2
          }),
        };
        fetch("http://localhost:3001/signup", requestOptions)
          .then((resp) => {
              switch (resp.status) {
                case 200:
                  return resp.json();
                case 403:
                  setShow(true);
                  setResText("Username should be unique");
                  break;
                default:
                  break;
              }
          }).then((resp) => {
            localStorage.setItem('myAppId', resp);
            if(resp) {
              who === 'visitor' ? navigate("/user") : navigate("/owner")
            } else {
              return;
            }
          })
      };

      function _userName(e) {
        setUsername(e.target.value);
      };
    
      function _userPassword(e) {
        setPassword(e.target.value);
      };

      function businessType(e) {
        setBusiness_type(e.target.value);
      };

      function businessName(e) {
        setBusiness_name(e.target.value);
      };

      function _who(e) {
        setWho(e.target.value);
      };

      function handleClose() {
        setShow(false);
      }


    return(
        <div className="signup">
            <Modal show={show}>
              <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {resText}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close Modal</Button>
              </Modal.Footer>
            </Modal>

          <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">
                            <div className="loginSignUp">
                            <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
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
                                                _userName(e);
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.username && errors.username.message}</p>
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <select {...register("business_type", {
                                      required: 'Field is required',
                                      value: business_type,
                                      onChange: (e) => {
                                        businessType(e);
                                      }
                                    })}>
                                      {typeList.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
                                    </select>
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
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
                                                businessName(e);
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.business_name && errors.business_name.message}</p>
                                </div>
                                <div className="login__field">
                                    <select {...register("who", {
                                      required: 'Field is required',
                                      value: who,
                                      onChange: (e) => {
                                        _who(e)
                                      }
                                    })}>
                                      <option value="visitor">Visitor</option>
                                      <option value="owner">Owner</option>
                                    </select>
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
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
                                                _userPassword(e);
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.password && errors.password.message}</p>
                                </div>
                                <button type="submit" className="button login__submit">
                                    <span className="button__text">Sign Up Now</span>
                                    <i className="button__icon fas fa-chevron-right"></i>
                                </button>			
                            </div>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>		
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>		
                    </div>
                </div>
            </form>
        </div>
    );
}