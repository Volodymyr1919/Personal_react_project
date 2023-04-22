import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";

const Offers = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const { myData } = props;

    const [posts, setPosts] = useState("");

    useEffect(() => {
        if(myData) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/posts/" + myData.business_name)
            })
            .then((res) => {
                setPosts(res);
            })
        } else {
            return;
        }
    }, [myData, RequestStore, ConfigStore, posts]);

    return(
        <div className="about__offers">
            {posts ? 
                posts.slice().reverse().map(post => 
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
});
export default Offers;