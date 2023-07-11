import IController from "../Types/IController";
import PostService from "../Services/Post.service";
import ApiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";

const createPost: IController = async (req, res) => {
  try {
    const post = await PostService.createPost(req.body, req.user);
    if (post) {
      post.error
        ? ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, post.error)
        : ApiResponse.result(res, post, httpStatusCodes.CREATED);
    } else {
      console.log("Error creating post : ", post);
      ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
  } catch (e: any) {
    console.log("Error creating post : ", e.message);
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const getPost: IController = async (req: any, res: any) => {
  try {
    let posts: any = await PostService.getPost();
    if (posts instanceof Error) {
      ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, posts.message);
    } else {
      posts.error
        ? ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, posts.error)
        : ApiResponse.result(res, posts, httpStatusCodes.OK);
    }
  } catch (error) {
    console.log("Error retrieving posts: : ", error);
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const postByProvider: IController = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    let posts: any = await PostService.postByProvider(id);
    if (posts instanceof Error) {
      console.log("Error retrieving posts : ", posts.message);
      ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, posts.message);
    } else {
      posts.error
        ? ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, posts.error)
        : ApiResponse.result(res, posts, httpStatusCodes.OK);
    }
  } catch (error) {
    console.log("Error retrieving posts: : ", error);
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const updatePost: IController = async (req: any, res: any) => {
  const postId = req.params.id;
  const updatedData = req.body;
  try {
    let updatedPost: any = await PostService.updatePost(updatedData, postId);
    if (updatedPost instanceof Error) {
      console.log("Error updating post : ", updatedPost);
      ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, updatedPost.message);
    } else {
      updatedPost.error
        ? ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, updatedPost.error)
        : ApiResponse.result(res, updatedPost, httpStatusCodes.OK);
    }
  } catch (error) {
    console.log("Error updating post : ", error);
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const removePost: IController = async (req: any, res: any) => {
  const postId = req.params.id;
  try {
    let deletedPost: any = await PostService.removePost(postId);
    if (deletedPost instanceof Error) {
      console.log("Error deleting post : ", deletedPost.message);
      ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, deletedPost.message);
    } else {
      deletedPost.error
        ? ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, deletedPost.error)
        : ApiResponse.result(res, deletedPost, httpStatusCodes.OK);
    }
  } catch (error) {
    console.log("Error deleting post : ", error);
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};
export default {
  createPost,
  getPost,
  postByProvider,
  updatePost,
  removePost,
};
