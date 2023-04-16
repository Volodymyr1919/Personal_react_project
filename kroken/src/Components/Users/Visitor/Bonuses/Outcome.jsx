import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../../../Stores/MainStore";
import InfoAlert from "../../../Partial/InfoAlert";

const Outcome = observer(() => {

  const { RequestStore, ConfigStore } = useStores();

  const [bonus, setBonus] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
      const onSubmit = (data) => {
        new Promise((resolve, reject) => {
          resolve();
        })
        .then(() => {
          return RequestStore.doPost(ConfigStore._url + "/spendbonus", {
            id : localStorage.getItem("myAppId"),
            bonus : data.bonus
          })
        })
        .then((res) => {
          if (res.status === 400) {
            ConfigStore.setSeverity("error");
            ConfigStore.setTextAlert("Not enough bonuses");
            ConfigStore.setIsInfoAlertShow(true);
          } else {
            ConfigStore.setSeverity("success");
            ConfigStore.setTextAlert("Successfuly");
            ConfigStore.setIsInfoAlertShow(true);
          }
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
          <InfoAlert />
      </div>
    );
});

export default Outcome;