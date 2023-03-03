import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import owner from "./owner.scss";

export default function Owner() {

    const [myData, setMyData] = useState("");
    const [myVisitors, setMyVisitors] = useState("");
    const [condition, setCondition] = useState("");
    const [requiredBonuses, setRequiredBonuses] = useState("");
    const [gift, setGift] = useState("");
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

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
      const onSubmit = (data) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type"      : "application/json"
          },
          body: JSON.stringify({
            business_name       : (myData.business_name).replace(/ /g,"_"),
            condition           : data.condition,
            required_bonuses    : data.requiredBonuses,
            gift                : data.gift
          }),
        };
        fetch("http://localhost:3001/offer", requestOptions)
        .then((res) => {
            console.log(res);
        })
      };

      const getAllUsers = () => {
        fetch("http://localhost:3001/users", {
            method: 'GET',
            headers: {
                "Content-Type"      : "application/json"
              },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            setMyVisitors(res.filter(item => item.business_name === myData.business_name));
        })
      }

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
        <div>
            Name: {myData.name}<br />
            {myData.type_business}: {myData.business_name}<br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    Send new offer: <br />
                    <label>
                        Condition<br />
                        <input
                            type="text"
                            {...register("condition", {
                                required: 'Field is required',
                                minLength: {
                                    value: 2,
                                    message: "Minimum 2 symbols"
                                },
                                value: condition,
                                onChange: (e) => {
                                    setCondition(e.target.value)
                                }
                            })}
                        />
                        <p>{errors.condition && errors.condition.message}</p>
                    </label><br />
                    <label>
                        Required bonuses<br />
                        <input
                            type="number"
                            {...register("requiredBonuses", {
                                required: 'Field is required',
                                value: requiredBonuses,
                                onChange: (e) => {
                                    setRequiredBonuses(e.target.value)
                                }
                            })}
                        />
                        <p>{errors.requiredBonuses && errors.requiredBonuses.message}</p>
                    </label><br />
                    <label>
                        Gift<br />
                        <input
                            type="text"
                            {...register("gift", {
                                required: 'Field if required',
                                value: gift,
                                onChange: (e) => {
                                    setGift(e.target.value)
                                }
                            })}
                        />
                        <p>{errors.gift && errors.gift.message}</p>
                    </label><br />
                </div>
                <button type="submit">Send</button>
            </form>
            <button onClick={getAllUsers}>Get all my visitors</button>
            <button onClick={getPosts}>Get all posts</button>
            <div>
                {myVisitors === "" ? "To see your visitors - press the button" : myVisitors.map(vis => <p key={vis._id}>
                    Name: {vis.name}, bonuses: {vis.bonus}
                </p>)}
            </div>
            <div>
                {posts === "" ? "To see your posts - press the button" : posts.map(post => <p key={post._id}>
                    Condition: {post.condition}, Required bonuses: {post.required_bonuses}, Gift: {post.gift}
                    <button onClick={deletePost} id={post._id}>DELETE</button>
                </p>)}
            </div>
        </div>
    );
}