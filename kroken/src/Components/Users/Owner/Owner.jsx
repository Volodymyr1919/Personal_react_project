import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AllUsers from "./AllUsers";
import AllOffers from "./AllOffers";
import OfferHistory from "./OfferHistory";
import AliceCarousel from "react-alice-carousel";
import { _url } from "../../Config";
import { TextField, Button } from "@mui/material";
import "react-alice-carousel/lib/alice-carousel.css";
// eslint-disable-next-line no-unused-vars
import owner from "./owner.scss";

export default function Owner() {

    const [myData, setMyData] = useState("");
    const [condition, setCondition] = useState("");
    const [requiredBonuses, setRequiredBonuses] = useState("");
    const [gift, setGift] = useState("");

    useEffect(() => {
        async function getMyData() {
            await fetch(_url + '/me/' + localStorage.getItem("myAppId"), {
                method: 'GET',
                headers: {
                    "Content-Type"                : "application/json",
                    "Access-Control-Allow-Origin" : "*",
                    "ngrok-skip-browser-warning"  : true
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setMyData(res);
            })
        };
        getMyData();
    }, [])

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
            business_name       : myData.business_name,
            condition           : data.condition,
            required_bonuses    : data.requiredBonuses,
            gift                : data.gift
          }),
        };
        fetch(_url + "/offer", requestOptions)
        .then((res) => {
            console.log(res);
        })
      };
      
    return(
        <div className="page__owner">
            <div className="owner__about">
                <AliceCarousel disableButtonsControls='true' touchTracking='true' touchMoveDefaultEvents='false'>
                    <div className="about__info">
                        <p>Name: {myData.name}</p>
                        <p>{myData.type_business}: {myData.business_name}</p>
                    </div>
                    <div className="about__newOffer">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="newOffer__form">
                                <span className="form__title">Send new offer:</span>
                                <TextField
                                    id="standard-basic"
                                    label="Condition"
                                    variant="standard" 
                                    type="text"
                                    fullWidth
                                    {...register("condition", {
                                        required: 'Field is required',
                                        minLength: {
                                            value: 2,
                                            message: "Minimum 2 symbols"
                                        },
                                        value: condition,
                                        onChange: (e) => {
                                            setCondition(e.target.value)
                                        }
                                    })}
                                />
                                <p className="errorMessage">{errors.condition && errors.condition.message}</p>
                                <TextField
                                    id="standard-basic"
                                    label="Required bonuses"
                                    variant="standard"
                                    type="number"
                                    fullWidth
                                    {...register("requiredBonuses", {
                                        required: 'Field is required',
                                        value: requiredBonuses,
                                        onChange: (e) => {
                                            setRequiredBonuses(e.target.value)
                                        }
                                    })}
                                />
                                <p className="errorMessage">{errors.requiredBonuses && errors.requiredBonuses.message}</p>
                                <TextField
                                    id="standard-basic"
                                    label="Gift"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    {...register("gift", {
                                        required: 'Field if required',
                                        value: gift,
                                        onChange: (e) => {
                                            setGift(e.target.value)
                                        }
                                    })}
                                />
                                <p className="errorMessage">{errors.gift && errors.gift.message}</p>
                            </div>
                            <Button type="submit" variant="outlined">Send</Button>
                        </form>
                    </div>
                </AliceCarousel>
                <div className="about__features">
                    <AliceCarousel disableButtonsControls='true'>
                        <AllUsers myData={myData} />
                        <AllOffers myData={myData} />
                        <OfferHistory myData={myData} />
                    </AliceCarousel>
                </div>
            </div>
            <div className="page__bg"></div>
        </div>
    );
}