import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import visitor from "./visitor.scss";

export default function Visitor() {

    const [myData, setMyData] = useState("");
    const [posts, setPosts] = useState("");

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
            setPosts(res);
        })
    }

    return(
        <div>
            Username: {myData.name}<br />
            {myData.type_business}: {myData.business_name}<br />
            Bonus: {myData.bonus}
            <button onClick={getPosts}>Get all posts</button>
            <div>
                {posts === "" ? "To see all posts - press the button" : posts.map(post => <p key={post._id}>
                    Condition: {post.condition}, Required bonuses: {myData.bonus}/{post.required_bonuses}, Gift: {post.gift}
                </p>)}
            </div>
        </div>
    );
}