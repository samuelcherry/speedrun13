import { FaTrash } from "react-icons/fa";

const Posts = ({ post, onDelete }) => {
  return (
    <div className="postContainer">
      <div className="postUser">{post.displayname}</div>
      <div className="postContent">
        {post.content}
        <div className="icons">
          <FaTrash onClick={() => onDelete(post.id)} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
