import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Input, Button } from "reactstrap";

import { BiTrash } from "react-icons/bi";

interface ListItem {
  todo: string;
  isCompleted: boolean;
  id: number;
}

const ToDoListItem = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  // const [completed, setCompleted] = useState();

  console.log(text);

  useEffect(() => {
    fetch("http://localhost:1337/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:1337/lists", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setList(data));
  // }, [list]);

  const sendData = () => {
    if (!text) {
      fetch("http://localhost:1337/lists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: text,
          iscompleted: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => list.push(data));
    }
  };

  console.log(list);

  const completeTodo = () => {
    fetch(`http://localhost:1337/lists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iscompleted: !list[0].isCompleted,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Container>
      <Row>
        {list.length > 0 &&
          list.map((e, i) => {
            // console.log(e, i);
            return (
              <Col
                xs="12"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="todo-container">
                  <InputGroup
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Input
                      className="input-text"
                      value={e.todo}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="to do"
                    />

                    <Input
                      type="checkbox"
                      checked={e.isCompleted}
                      onClick={() => {
                        // setId(i);
                        completeTodo();
                      }}
                      className="check-box"
                    />

                    <BiTrash
                      style={{
                        fontSize: 25,
                        cursor: "pointer",
                        color: "rgb(224, 100, 100)",
                      }}
                    />
                    <Button
                      color="primary"
                      onClick={() => {
                        sendData();
                      }}
                      className="btn-checked"
                    >
                      Valider
                    </Button>
                  </InputGroup>
                </div>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default ToDoListItem;
