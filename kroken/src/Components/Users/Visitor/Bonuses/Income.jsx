import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { _url } from "../../../Config";
import bonus from "./bonus.scss";

export default function Income() {

    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch(_url + '/getbonus', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify({
    //             id : localStorage.getItem("myAppId")
    //         })
    //     })
    //     .then((res) => {
    //         if (res.ok) {
    //             alert("congrats, you've got 1 point plus");
    //             navigate("/user");
    //         } else {
    //             alert("today you already got a 1 point plus");
    //             navigate("/user");
    //         }
    //     })
    // },[navigate])

    return(
        <div className="personalPage__bonus">
            <div className="personalPage__bg"></div>
        </div>
    );
}