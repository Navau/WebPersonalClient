import React from "react";
import { Row, Col } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Blog(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = useParams();

  return <div>{url ? <h1>EN UN POST</h1> : <h1>LISTA DE POSTS</h1>}</div>;
}
