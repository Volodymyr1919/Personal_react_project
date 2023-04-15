import React, { useState, useEffect } from "react";
import { _url } from "../../Config";
import { Button } from "@mui/material";

export default function OfferHistory(props) {

    const myBusinessN = props.myData.business_name;
    const [oldOffers, setOldOffers] = useState([]);

    useEffect(() => {
        if(myBusinessN) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                getOldOffers();
            })
        } else {
            return;
        }
    },[myBusinessN]);

    function getOldOffers() {
        fetch(_url + '/oldPosts/' + myBusinessN, {
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
            setOldOffers(res);
        })
    }

    const returnPost = (e) => {
        if (window.confirm("Do you want to return this offer?") === true) {
            fetch(_url + '/returnPost', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id: e.target.id,
                })
            })
            .then((res) => {
                console.log(res);
            })
        } else {
            return;
        }
    }

    return(
        <div className="features__offers">
            <p className="offers__title">Here is your deleted offers</p>
            {oldOffers ? 
                oldOffers.map(post => 
                <div className="offers__card" key={post._id}>
                    <p>Condition: {post.condition}</p>
                    <p>Required bonuses: {post.required_bonuses}</p>
                    <p>Gift: {post.gift}</p>
                    <Button
                        onClick={returnPost}
                        id={post._id}
                        variant="outlined"
                        color="success"
                    >
                        RETURN
                    </Button>
                </div>)
            :
                <p>Sorry, any deleted offers</p>
            }
        </div>
    );
}