import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import owner from "./owner.scss";

export default function Owner() {

    const [myData, setMyData] = useState("");

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
                console.log(res);
            })
        };
        getMyData();
    }, [])

    return(
        <div>
            Name: {myData.name}<br />
            {myData.type_business}: {myData.business_name}<br />
            
        </div>
    );
}