import Header from "./Header";
import { useState } from "react";

const MainContent = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <Header />
      <form className="statusBar">
        <input type="text" required />
        <button className="styleButton" type="submit">
          {" "}
          POST
        </button>
      </form>
      <div>
        {posts.map((post) => (
          <div>{post.content}</div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
