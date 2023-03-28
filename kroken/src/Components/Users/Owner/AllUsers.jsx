import React, { useState, useEffect } from "react";

export default function AllUsers(props) {

    const myBusiness = props.myData.business_name;
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        function getMyVisitors() {
            fetch("http://localhost:3001/users", {
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
        <>
            <p>Here is all your visitors</p>
            {allUsers ? allUsers.map(user => 
                <p key={user._id}>Visitor: {user.name}; Bonus: {user.bonus}</p>
            )
            :
                <p>Sorry you still have any visitor registered</p>
            }
        </>
    );
}