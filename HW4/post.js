class Post extends Note {
  constructor(id, title, userId, body) {
    super(id, title);
    this.userId = userId;
    this.body = body;
  }

  static createPost(obj) {
    return new Post(obj.id, obj.title, obj.userId, obj.body);
  }

  get UserId() {
    return this.userId;
  }

  set UserId(userId) {
    this.userId = userId;
  }

  get Body() {
    return this.body;
  }

  set Body(body) {
    this.body = body;
  }
}
