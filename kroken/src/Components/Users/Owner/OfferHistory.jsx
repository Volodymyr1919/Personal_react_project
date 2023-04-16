import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { Button } from "@mui/material";
import Confirmation from "../../Partial/Confirmation/Confirmation";

const OfferHistory = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const myBusinessN = props.myData.business_name;

    useEffect(() => {
        if(myBusinessN) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/oldPosts/" + myBusinessN)
            })
            .then((res) => {
                ConfigStore.setPostsHistory(res);
            })
        } else {
            return;
        }
    },[myBusinessN, RequestStore, ConfigStore]);

    const returnPost = (e) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setPostId(e.target.id);
        })
        .then(() => {
            ConfigStore.setStateConfirmation("restore");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation("Do you want to return this offer?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation("You can delete it at any time!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    }

    return(
        <div className="features__offers">
            <p className="offers__title">Here is your deleted offers</p>
            {ConfigStore.postsHistory ? 
                ConfigStore.postsHistory.slice().reverse().map(post => 
                <div className="offers__card" key={post._id}>
                    <p>Condition: {post.condition}</p>
                    <p>Required bonuses: {post.required_bonuses}</p>
                    <p>Gift: {post.gift}</p>
                    <Button
                        onClick={returnPost}
                        id={post._id}
                        variant="outlined"
                        color="success"
                    >
                        RETURN
                    </Button>
                </div>)
            :
                <p>Sorry, any deleted offers</p>
            }
            <Confirmation />
        </div>
    );
});

export default OfferHistory;