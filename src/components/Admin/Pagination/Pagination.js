import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

export default function Pagination(props) {
  const { posts, location, navigate } = props;
  const currentPage = parseInt(posts.page);
  const totalPosts = parseInt(posts.totalDocs);
  const limitPosts = parseInt(posts.limit);

  const onChangePage = (newPage) => {
    navigate(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={totalPosts}
      pageSize={limitPosts}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
    />
  );
}
