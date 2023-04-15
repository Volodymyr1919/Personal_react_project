import React, { useState, useEffect } from "react";
import { _url } from "../../Config";

export default function AllUsers(props) {

    const myBusiness = props.myData.business_name;
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        function getMyVisitors() {
            fetch(_url + "/users", {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
              },
            }).then((res) => {
                return res.json();
            }).then((res) => {
                setAllUsers(res.filter(item => item.business_name === myBusiness));
            })
        }
        getMyVisitors();
    },[myBusiness])

    return(
        <div className="features__allUsers">
            <p className="allUsers__title">Here is all your visitors</p>
            {allUsers ? allUsers.map(user => 
                <p className="allUsers__user" key={user._id}>Visitor: {user.name}; Bonus: {user.bonus}</p>
            )
            :
                <p className="allUsers__alt">Sorry you still have any visitor registered</p>
            }
        </div>
    );
}