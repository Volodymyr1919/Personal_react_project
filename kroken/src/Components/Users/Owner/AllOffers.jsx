import React, { useState, useEffect } from "react";
import { _url } from "../../Config";
import { Button } from "@mui/material";

export default function AllOffers(props) {
    
    const myBusinessN = props.myData.business_name; 
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        function getAllPosts() {
            fetch(_url + '/posts/' + myBusinessN, {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
            }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setOffers(res);
            })
        }
        getAllPosts();
    },[myBusinessN])

    const deletePost = (e) => {
        if (window.confirm("Do you want to delete this offer?") === true) {
            console.log(e.target.id);
            fetch(_url + '/posts', {
                method: 'DELETE',
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
            <p className="offers__title">Here is all your offers</p>
            {offers ? offers.map(post => 
                <div className="offers__card" key={post._id}>
                    <p>Condition: {post.condition}</p>
                    <p>Required bonuses: {post.required_bonuses}</p>
                    <p>Gift: {post.gift}</p>
                    <Button
                        onClick={deletePost}
                        id={post._id}
                        variant="outlined"
                        color="error"
                    >
                        DELETE
                    </Button>
                </div>)
            :
                <p>Sorry, still any offers</p>
            }
        </div>
    );
}