import Header from "./Header";
import { useState, useEffect } from "react";
import Posts from "./Posts";

const MainContent = () => {
  const [posts, setPosts] = useState([]);

  const getPost = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/posts");
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", data.error);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handlePost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const postContent = data.get("postContent");
    const uuid = localStorage.getItem("uuid");

    if (!uuid) {
      alert("you must be logged in to post!");
      return;
    }

    const newPost = {
      content: postContent,
      uuid: uuid
    };
    console.log("NEW POST", newPost);

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    const postData = await response.json();

    if (response.ok) {
      console.log("Post added successfully:", postData);
      setPosts((prevPosts) => {
        const updated = [...prevPosts, postData];
        return updated;
      });
    } else {
      console.error("Failed to add post:", postData.error);
    }
  };

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
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <Header />
      <form className="statusBar" onSubmit={handlePost}>
        <input type="text" name="postContent" required />
        <button className="styleButton" type="submit">
          POST
        </button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Posts post={post} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
