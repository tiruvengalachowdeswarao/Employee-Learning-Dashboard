import React from "react";
import { Button, Card } from "react-bootstrap";

function DashboardTile(props) {
  return (
    <Card style={{ width: "20rem" }} bg="light">
      <Card.Img
        variant="top"
        style={{ height: "8rem" }}
        src={props.image}
        size="20"
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          <h2>{props.count}</h2>
        </Card.Text>
        <Button variant="link" onClick={props.viewDetails}>
          {props.buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default DashboardTile;
