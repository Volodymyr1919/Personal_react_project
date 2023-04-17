import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";

const AllUsers = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const myBusiness = props.myData.business_name;
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if(myBusiness) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/users")
            })
            .then((res) => {
                setAllUsers(res.filter(item => item.business_name === myBusiness));
            })
        } else {
            return;
        }
        
    },[myBusiness, RequestStore, ConfigStore]);

    return(
        <div className="features__allUsers">
            <p className="allUsers__title">Here is all your visitors</p>
            {allUsers ? allUsers.slice().reverse().map(user => 
                <p className="allUsers__user" key={user._id}>Visitor: {user.name}; Bonus: {user.bonus}</p>
            )
            :
                <p className="allUsers__alt">Sorry you still have any visitor registered</p>
            }
        </div>
    );
});
export default AllUsers;