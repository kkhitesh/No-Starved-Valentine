import React, { useState } from "react";
import { axiosInstance } from "./axios";

const Form = () => {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [order] = useState(["pizza", "burger", "fries"]);

  const submitHandler = (e) => {
    e.preventDefault();
    const details = { name, num, order };
    axiosInstance.post("/send", details).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="form">
      <h1>Form</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
