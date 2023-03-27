import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Income() {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/getbonus', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id : localStorage.getItem("myAppId")
            })
        })
        .then((res) => {
            if (res.ok) {
                alert("congrats, you've got 1 point plus");
                navigate("/user");
            } else {
                alert("today you already got a 1 point plus");
                navigate("/user");
            }
        })
    },[navigate])

    return(
        <div>
            <button></button>
        </div>
    );
}