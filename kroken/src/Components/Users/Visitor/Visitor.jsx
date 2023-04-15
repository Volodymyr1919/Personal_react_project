import React, { useState, useEffect } from "react";
import { _url } from "../../Config";
import Offers from "./Offers";
// eslint-disable-next-line no-unused-vars
import visitor from "./visitor.scss";

export default function Visitor() {

    const [myData, setMyData] = useState("");

    useEffect(() => {
        getMyData();
    }, [])

    async function getMyData() {
        await fetch(_url + '/me/' + localStorage.getItem("myAppId"), {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setMyData(res);
        })
    };

    return(
        <div className="page__visitor">
            <div className="visitor__about">
                <div className="about__info">
                    <p>Username: {myData.name}</p>
                    <p>{myData.type_business}: {myData.business_name}</p>
                    <p>Bonus: {myData.bonus}</p>
                </div>
                <Offers myData={myData} />
            </div>
            <div className="page__bg"></div>
        </div>
    );
}