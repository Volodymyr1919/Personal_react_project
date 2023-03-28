import React, { useState, useEffect } from "react";

export default function OfferHistory(props) {

    const myBusinessN = props.myData.business_name;
    const [oldOffers, setOldOffers] = useState([]);

    useEffect(() => {
        function getOldOffers() {
            fetch('http://localhost:3001/oldPosts/' + myBusinessN, {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
            }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setOldOffers(res);
            })
        }
        getOldOffers();
    },[myBusinessN])

    const returnPost = (e) => {
        if (window.confirm("Do you want to return this offer?") === true) {
            fetch('http://localhost:3001/returnPost', {
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
        <>
            <p>Here is your deleted offers</p>
            {oldOffers ? oldOffers.map(post => <p key={post._id}>
                    Condition: {post.condition}, Required bonuses: {post.required_bonuses}, Gift: {post.gift}
                    <button onClick={returnPost} id={post._id}>RETURN</button>
                </p>)
            :
                <p>Sorry, any deleted offers</p>
            }
        </>
    );
}