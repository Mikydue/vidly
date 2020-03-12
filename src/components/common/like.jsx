import React from "react";

const Like = ({ liked, onLike }) => {
  let likeClass = "fa fa-heart";
  if (!liked) likeClass += "-o";

  return (
    <i
      onClick={onLike}
      className={likeClass}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
