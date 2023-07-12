import baseModel from "../BaseModel";
export class PostModel extends baseModel {
  constructor() {
    super();
  }

  async getPostAsProvider(id: any) {
    return await this._executeQuery(
      "SELECT * FROM job_posts WHERE job_provider_id = ?  ",
      [id]
    );
  }

  async getPost() {
    return await this._executeQuery(
      "SELECT * FROM job_posts ORDER BY post_date DESC",
      [null]
    );
  }

  async createPost(postData: any) {
    const result = await this._executeQuery("INSERT INTO job_posts SET ?", [
      postData,
    ]);
    return result;
  }

  async updatePost(updatedData: any, id: any) {
    const result = await this._executeQuery(
      "UPDATE job_posts SET ? WHERE id = ?",
      [updatedData, id]
    );
    return result;
  }

  async removePost(id: any) {
    return await this._executeQuery("DELETE FROM job_posts WHERE id=?", [id]);
  }
}
