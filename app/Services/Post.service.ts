import { PostModel } from "../Models/Post/Post.model";
const createPost = async (data: any, user: any) => {
  try {
    data.job_provider_id = user;
    data.post_date = new Date();
    const post = await new PostModel().createPost(data);
    if (!post) throw new Error("Something Went Wrong");
    if (post.affectedRows === 0) {
      return { error: "Unable to create the post" };
    }
    return post;
  } catch (error) {
    throw error;
  }
};

const getPost = async () => {
  try {
    const posts = await new PostModel().getPost();
    if (posts.length === 0) return { error: "No posts found" };
    return posts;
  } catch (error) {
    throw error;
  }
};

const postByProvider = async (id: any) => {
  try {
    const posts = await new PostModel().getPostAsProvider(id);
    if (posts.length === 0) return { error: "No posts found" };
    return posts;
  } catch (error) {
    throw error;
  }
};

const updatePost = async (data: any, id: any) => {
  try {
    const updatedPost = await new PostModel().updatePost(data, id);
    if (!updatedPost) throw new Error("Something Went Wrong");
    if (updatedPost.affectedRows === 0) {
      return { error: " Post not found , Unable to update the post" };
    }
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

const removePost = async (id: any) => {
  try {
    const deletedPost = await new PostModel().removePost(id);
    if (!deletedPost) throw new Error("Something Went Wrong");
    if (deletedPost.affectedRows === 0) {
      return { error: " Post not found , Unable to delete the post" };
    }
    return deletedPost;
  } catch (error) {
    throw error;
  }
};
export default { createPost, getPost, postByProvider, updatePost, removePost };
