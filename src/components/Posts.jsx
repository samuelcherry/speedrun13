import { FaTrash } from "react-icons/fa";

const Posts = ({ post }) => {
  console.log("POST", post);
  const handleDelete = async (postId) => {
    console.log(postId);
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Post deleted:", data.message);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="postContainer">
      <div className="postUser">{post.displayname}</div>
      <div className="postContent">
        {post.content}
        <div className="icons">
          <FaTrash onClick={() => handleDelete(post.id)} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
