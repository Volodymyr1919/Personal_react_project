import React, { useState, useEffect } from "react";
import { _url } from "../../Config";

export default function Offers(props) {

    const { myData } = props;

    const [posts, setPosts] = useState("");

    useEffect(() => {
        async function getPosts() {
            await fetch(_url + '/posts/' + myData.business_name, {
                method: 'GET',
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setPosts(res);
            })
        }
        getPosts();
    }, [myData])

    return(
        <div className="about__offers">
            {posts ? 
                posts.map(post => 
                    <div className="offers__one" key={post._id}>
                        <p>Condition: {post.condition}</p>
                        <p>Required bonuses: {myData.bonus}/{post.required_bonuses}</p>
                        <p>Gift: {post.gift}</p>
                    </div>
                )
                :
                <div className="loader">Loading...</div>
            }
        </div>
    );
}