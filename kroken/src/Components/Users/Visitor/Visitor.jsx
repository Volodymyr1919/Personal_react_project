import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import visitor from "./visitor.scss";

export default function Visitor() {

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
            })
        };
        getMyData();
    }, [])

    async function getPosts() {
        await fetch('http://localhost:3001/posts/' + (myData.business_name).replace(/ /g,"_"), {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log(res);
        })
    }

    return(
        <div>
            Name: {myData.name}<br />
            {myData.type_business}: {myData.business_name}<br />
            Bonus: {myData.bonus}
            <button onClick={getPosts}>Get all posts</button>
        </div>
    );
}