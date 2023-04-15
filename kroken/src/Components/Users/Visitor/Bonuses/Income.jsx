import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../../Stores/MainStore";
import InfoAlert from "../../../Partial/InfoAlert";
import bonus from "./bonus.scss";

const Income = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doPost(ConfigStore._url + "/getbonus", {
                id : localStorage.getItem("myAppId")
            })
        })
        .then((res) => {
            if (res.acknowledged && (res.matchedCount === 1)) {
                ConfigStore.setSeverity("success");
                ConfigStore.setTextAlert("Congrats you've got point plus");
                ConfigStore.setIsInfoAlertShow(true);
            } else {
                ConfigStore.setSeverity("error");
                ConfigStore.setTextAlert("You already got the point");
                ConfigStore.setIsInfoAlertShow(true);
            }
        })
    },[RequestStore, ConfigStore])

    return(
        <div className="personalPage__bonus">
            <div className="personalPage__bg"></div>
            <InfoAlert />
        </div>
    );
});

export default Income;