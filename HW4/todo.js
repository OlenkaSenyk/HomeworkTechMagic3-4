class Todo extends Note {
  constructor(id, title, userId, completed) {
    super(id, title);
    this.userId = userId;
    this.completed = completed;
  }

  static createTodo(obj) {
    return new Todo(obj.id, obj.title, obj.userId, obj.completed);
  }

  get UserId() {
    return this.userId;
  }

  set UserId(userId) {
    this.userId = userId;
  }

  get Completed() {
    return this.completed;
  }

  set Completed(completed) {
    this.completed = completed;
  }
}
