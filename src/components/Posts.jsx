import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const Posts = ({ post, onDelete, onEdit }) => {
  return (
    <div className="postContainer">
      <div className="postUser">{post.displayname}</div>
      <div className="postContent">
        {post.content}
        <div className="icons">
          <FaTrash
            style={{ paddingRight: "5px" }}
            onClick={() => onDelete(post.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
