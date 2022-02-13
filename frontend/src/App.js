import Hero from "./Hero";
import Food from "./Food.js";
import Form from "./Form.js";
import Grid from "@react-css/grid";
import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import pizza from "./assets/pizza.png";
import burger from "./assets/burger.png";
import fries from "./assets/fries.png";
import coffee from "./assets/coffee.png";
import noodles from "./assets/noodles.png";
import gbd from "./assets/gbd.png";
import coke from "./assets/coke.png";
import cupcake from "./assets/cupcake.png";


function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Hero></Hero>
      <Grid columns="25% 25% 25% 25%">
      <Food img={pizza} name="Pizza"/>
      <Food img={burger} name="Burger"/>
      <Food img={fries} name="Fries"/>
      <Food img={coffee} name="Coffee"/>
      <Food img={noodles} name="Noodles"/>
      <Food img={gbd} name="G-Bread"/>
      <Food img={coke} name="Coke"/>
      <Food img={cupcake} name="Cupcake"/>
      </Grid>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Form />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} setOpened={setOpened}>Open Modal</Button>
      </Group>
    </div>
  );
}

export default App;
