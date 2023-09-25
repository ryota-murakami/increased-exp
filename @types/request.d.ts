// API Request Prameters
declare namespace Req {
  /**
   * POST: /api/signup
   */
  declare interface SignUp {
    name: Author['name']
    password: Author['password']
  }

  /**
   * POST /api/login
   */
  declare interface Login {
    name: Author['name']
    password: Author['password']
  }

  /**
   * GET /api/post_list
   */
  declare interface PostList {
    page: number
    perPage: number
  }

  /**
   * POST /api/create
   */
  declare interface CreatePost {
    message: string
  }

  /**
   * POST: /api/update
   */
  declare interface UpdatePost {
    message: string
  }
}
