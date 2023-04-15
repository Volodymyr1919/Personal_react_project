import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { _url } from "../../../Config";
import { TextField, Button } from "@mui/material";

export default function Outcome() {

    const [bonus, setBonus] = useState("");

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
            id : localStorage.getItem("myAppId"),
            bonus : data.bonus
          }),
        };
        fetch(_url + "/spendbonus", requestOptions)
          .then((resp) => {
            return resp.json();
          })
          .then((resp) => {
            console.log(resp);
          })
      };

    return(
      <div className="personalPage__bonus">
          <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                  id="standard-basic"
                  label="Prise"
                  variant="standard"
                  type="number"
                  className="bonus__withdrow"
                  {...register("bonus", {
                      required: 'Field is required',
                      value: bonus,
                      onChange: (e) => {
                          setBonus(e.target.value)
                      }
                  })}
              />
              <p className="errorMessage">{errors.bonus && errors.bonus.message}</p>
              <Button variant="outlined" type="submit">Spend bonus</Button>
          </form>
          <div className="personalPage__bg"></div>
      </div>
    );
}