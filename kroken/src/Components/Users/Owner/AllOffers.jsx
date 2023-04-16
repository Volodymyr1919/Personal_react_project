import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import Confirmation from "../../Partial/Confirmation/Confirmation";

const AllOffers = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const myBusinessN = props.myData.business_name;

    useEffect(() => {
        if(myBusinessN) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/posts/" + myBusinessN)
            })
            .then((res) => {
                ConfigStore.setPosts(res);
            })
        } else {
            return;
        }
    },[myBusinessN, RequestStore, ConfigStore])

    const deletePost = (e) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setPostId(e.target.id);
        })
        .then(() => {
            ConfigStore.setStateConfirmation("delete");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation("Do you want to delete this offer?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation("You can return it at any time!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    }

    return(
        <div className="features__offers">
            <p className="offers__title">Here is all your offers</p>
            {ConfigStore.posts ? (ConfigStore.posts.slice().reverse().map(post => 
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
                </div>))
            :
                <p>Sorry, still any offers</p>
            }
            <Confirmation />
        </div>
    );
});

export default AllOffers;