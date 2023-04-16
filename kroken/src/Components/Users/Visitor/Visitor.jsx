import React, { useState, useEffect } from "react";
import Offers from "./Offers";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
// eslint-disable-next-line no-unused-vars
import visitor from "./visitor.scss";

const Visitor = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    const [myData, setMyData] = useState("");

    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doGet(ConfigStore._url + "/me/" + localStorage.getItem("myAppId"))
        })
        .then((res) => {
            setMyData(res);
        })
    }, [RequestStore, ConfigStore])

    return(
        <div className="page__visitor">
            <div className="visitor__about">
                <div className="about__info">
                    <p>Username: {myData.name ? ((myData.name).replace(/_/g," ")) : myData.name}</p>
                    <p>{myData.type_business}: {myData.business_name ? ((myData.business_name).replace(/_/g," ")) : myData.business_name}</p>
                    <p>Bonus: {myData.bonus}</p>
                </div>
                <Offers myData={myData} />
            </div>
            <div className="page__bg"></div>
        </div>
    );
});

export default Visitor;