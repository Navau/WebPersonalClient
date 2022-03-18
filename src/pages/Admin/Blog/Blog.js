import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";

import PostsList from "../../../components/Admin/Blog/PostsList";
import Pagination from "../../../components/Admin/Pagination/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";

import { getPostsApi } from "../../../api/post";

import "./Blog.scss";

export default function Blog() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response.postStored);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: err.message + " : " + err,
        });
      })
      .finally(() => {
        setReloadPosts(false);
      });
  }, [page, reloadPosts]);

  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}
      />
    );
  };

  const editPost = (post) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={post}
      />
    );
  };

  if (!posts) {
    return null;
  }

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary" onClick={addPost}>
          Nuevo Post
        </Button>
      </div>
      <PostsList
        posts={posts}
        setReloadPosts={setReloadPosts}
        editPost={editPost}
      />
      <Pagination posts={posts} location={location} navigate={navigate} />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="85%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}
