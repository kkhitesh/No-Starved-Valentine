import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import React, {useState} from "react";
import "./styles/Food.css"

function Food( { img, name}) {
  const theme = useMantineTheme();
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const onClick = () => {
  items.concat(query)
  }
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);  
  const decrement = () => {
    if(count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <div style={{ width: 200, margin: 30 }}>
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image src={img} height={100} alt="Norway" />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{name}</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>
        <div className="divider">
          <Button size="xs" onClick={decrement}>
            - 
          </Button>
          {count}
          <Button size="xs" onClick={increment}>
            +
          </Button>
        </div>
      </Card>
      <div>{items.map(items =>
          <div>{items}</div>
        )}
        </div>
    </div>
  );
}
export default Food;