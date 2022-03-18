import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  console.log(postData);

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = (e) => {
    const { title, url, description, date } = postData;

    if (!title || !description || !url || !date) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!post) {
        addPost();
      } else {
        updatePost();
      }
    }
  };

  const addPost = () => {
    const accessToken = getAccessTokenApi();
    addPostApi(accessToken, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setPostData({});
      })
      .catch((err) => {
        notification["error"]({
          message: "Ocurrió un error inesperado." + err,
        });
      })
      .finally(() => {
        setReloadPosts(true);
      });
  };

  const updatePost = () => {
    const accessToken = getAccessTokenApi();
    updatePostApi(accessToken, post._id, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
      })
      .catch((err) => {
        notification["error"]({
          message: "Ocurrio un error inesperado." + err,
        });
      })
      .finally(() => {
        setReloadPosts(true);
      });
  };

  return (
    <div className="add-edit-post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;
  return (
    <Form
      className="add-edit-post-form__form"
      layout="inline"
      onSubmitCapture={processPost}
    >
      <Row gutter={24} style={{ width: "100%" }}>
        <Col span={8}>
          <Form.Item>
            <Input
              prefix={<FontSizeOutlined />}
              placeholder="Titulo"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Input
              prefix={<LinkOutlined />}
              placeholder="URL"
              value={postData.url}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  url: transformTextToUrl(e.target.value),
                })
              }
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YY HH:mm:ss"
              placeholder="Fecha de publicación"
              value={postData.date && moment(postData.date)}
              onChange={(e, value) =>
                setPostData({
                  ...postData,
                  date: moment(value, "DD/MM/YY HH:mm:ss").toISOString(),
                })
              }
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Editor
              //  onInit={(evt, editor) => editorRef.current = editor}
              initialValue={postData.description ? postData.description : ""}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onBlur={(e) => {
                setPostData({
                  ...postData,
                  description: e.target.getContent(),
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit">
              {post ? "Actualizar Post" : "Crear Post"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
