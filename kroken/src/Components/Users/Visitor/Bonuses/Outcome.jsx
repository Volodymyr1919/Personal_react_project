import React, {useState} from "react";
import { useForm } from "react-hook-form";

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
        fetch("http://localhost:3001/spendbonus", requestOptions)
          .then((resp) => {
            return resp.json();
          })
          .then((resp) => {
            console.log(resp);
          })
      };

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="number"
                    {...register("bonus", {
                        required: 'Field is required',
                        value: bonus,
                        onChange: (e) => {
                            setBonus(e.target.value)
                        }
                    })}
                />
                <p className="errorMessage">{errors.bonus && errors.bonus.message}</p>
                <button type="submit">Spend bonus</button>
            </form>
        </div>
    );
}