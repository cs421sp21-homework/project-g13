import "./App.css";
import { withRouter } from "react-router-dom";
import React, { Component, useRef, useEffect, useState } from "react";
import io from "socket.io-client";

function GroupPage() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      withCredentials: true,
    });
    socket.on("create_room", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default withRouter(GroupPage);
