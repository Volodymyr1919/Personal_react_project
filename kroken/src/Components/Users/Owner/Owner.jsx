import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AllUsers from "./AllUsers";
import AllOffers from "./AllOffers";
import OfferHistory from "./OfferHistory";
import AliceCarousel from "react-alice-carousel";
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
            await fetch('http://localhost:3001/me/' + localStorage.getItem("myAppId"), {
                method: 'GET',
                headers: {
                    "Content-Type" : "application/json"
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
        fetch("http://localhost:3001/offer", requestOptions)
        .then((res) => {
            console.log(res);
        })
      };
      
    return(
        <div>
            Name: {myData.name}<br />
            {myData.type_business}: {myData.business_name}<br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    Send new offer: <br />
                    <label>
                        Condition<br />
                        <input
                            type="text"
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
                        <p>{errors.condition && errors.condition.message}</p>
                    </label><br />
                    <label>
                        Required bonuses<br />
                        <input
                            type="number"
                            {...register("requiredBonuses", {
                                required: 'Field is required',
                                value: requiredBonuses,
                                onChange: (e) => {
                                    setRequiredBonuses(e.target.value)
                                }
                            })}
                        />
                        <p>{errors.requiredBonuses && errors.requiredBonuses.message}</p>
                    </label><br />
                    <label>
                        Gift<br />
                        <input
                            type="text"
                            {...register("gift", {
                                required: 'Field if required',
                                value: gift,
                                onChange: (e) => {
                                    setGift(e.target.value)
                                }
                            })}
                        />
                        <p>{errors.gift && errors.gift.message}</p>
                    </label><br />
                </div>
                <button type="submit">Send</button>
            </form>
            <div>
                <AliceCarousel>
                    <AllUsers myData={myData} />
                    <AllOffers myData={myData} />
                    <OfferHistory myData={myData} />
                </AliceCarousel>
            </div>
        </div>
    );
}