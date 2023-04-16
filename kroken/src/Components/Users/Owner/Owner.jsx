import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AllUsers from "./AllUsers";
import AllOffers from "./AllOffers";
import OfferHistory from "./OfferHistory";
import AliceCarousel from "react-alice-carousel";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { TextField, Button } from "@mui/material";
import Snack from "../../Partial/Snack";
import "react-alice-carousel/lib/alice-carousel.css";
// eslint-disable-next-line no-unused-vars
import owner from "./owner.scss";

const Owner = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    const [myData, setMyData] = useState("");
    const [condition, setCondition] = useState("");
    const [requiredBonuses, setRequiredBonuses] = useState("");
    const [gift, setGift] = useState("");

    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doGet(ConfigStore._url + "/me/" + localStorage.getItem("myAppId"))
        })
        .then((res) => {
            setMyData(res);
            ConfigStore.setBusinessName(res.business_name);
        })
    }, [RequestStore, ConfigStore])

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (data) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doPost(ConfigStore._url + "/offer", {
                business_name       : myData.business_name,
                condition           : data.condition,
                required_bonuses    : data.requiredBonuses,
                gift                : data.gift
            })
        })
        .then((res) => {
            if(res.acknowledged) {
                resetField("condition");
                resetField("requiredBonuses");
                resetField("gift");
                ConfigStore.setSeverity("success");
                ConfigStore.setTextAlert("Success!");
                RequestStore.doGet(ConfigStore._url + "/posts/" + ConfigStore.businessName)
                .then((res) => {
                    ConfigStore.setPosts(res);
                });
                ConfigStore.setIsSnackShow(true);
            } else {
                ConfigStore.setSeverity("error");
                ConfigStore.setTextAlert("Offer already existing!");
                ConfigStore.setIsSnackShow(true);
            }
        })
    };
      
    return(
        <div className="page__owner">
            <div className="owner__about">
                <AliceCarousel disableButtonsControls='true' touchTracking='true' touchMoveDefaultEvents='false'>
                    <div className="about__info">
                        <p>Name: {myData.name ? ((myData.name).replace(/_/g," ")) : myData.name}</p>
                        <p>{myData.type_business}: {myData.business_name ? ((myData.business_name).replace(/_/g," ")) : myData.business_name}</p>
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
                        <AllOffers myData={myData} />
                        <AllUsers myData={myData} />
                        <OfferHistory myData={myData} />
                    </AliceCarousel>
                </div>
            </div>
            <div className="page__bg"></div>
            <Snack />
        </div>
    );
});

export default Owner;