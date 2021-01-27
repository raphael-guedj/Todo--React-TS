import React from "react";
import { Container, Row, Col } from "reactstrap";
import ToDoListItem from "./ToDoListItems";
import "./App.scss";

function App() {
  return (
    <Container className="home-head">
      <Row>
        <Col>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2.6rem",
              letterSpacing: 2,
            }}
          >
            To-Do List
          </h1>
        </Col>
      </Row>
      <Row>
        <ToDoListItem />
      </Row>
    </Container>
  );
}

export default App;
