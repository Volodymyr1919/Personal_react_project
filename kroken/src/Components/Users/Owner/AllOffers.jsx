import React, { useState, useEffect } from "react";

export default function AllOffers(props) {
    
    const myBusinessN = props.myData.business_name; 
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        function getAllPosts() {
            fetch('http://localhost:3001/posts/' + myBusinessN, {
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
            fetch('http://localhost:3001/posts', {
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
        <>
            <p>Here is all your offers</p>
            {offers ? offers.map(post => 
                <p key={post._id}>
                    Condition: {post.condition}, Required bonuses: {post.required_bonuses}, Gift: {post.gift}
                    <button onClick={deletePost} id={post._id}>DELETE</button>
                </p>)
            :
                <p>Sorry, still any offers</p>
            }
        </>
    );
}