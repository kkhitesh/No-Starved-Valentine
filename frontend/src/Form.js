import React, { useState } from "react";
import { axiosInstance } from "./axios";
import Button from '@material-ui/core/Button';
import { Input } from '@mantine/core';

const Form = ({setOpened}) => {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [adr, setAdr] = useState("");
  const [order] = useState(["Burger", "Fries", "Coke"]);

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Thanks for Ordering 😊");
    const details = { name, num, order };
    axiosInstance.post("/send", details).then((res) => {
      console.log(res);
    });
    setOpened(false);
  };

  return (
    <div className="App">
      <div className="BG">
      <h2>Order  </h2>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <form onSubmit={submitHandler}>
        <Input
          placeholder="Enter Name"
          value = {name}
          onChange = {(e) => setName(e.target.value)}
        />
        <br />
        <Input
          placeholder="Enter Number"
          value = {num}
          onChange = {(e) => setNum(e.target.value)}
        />
        <br />
        <Input
          placeholder="Enter Address"
          value = {adr}
          onChange = {(e) => setAdr(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" onClick="Submit" >Submit</Button>
      </form>
    </div>
    </div>
  );
};

export default Form;
