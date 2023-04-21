class Note {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  get Id() {
    return this.id;
  }

  get Title() {
    return this.title;
  }

  set Title(title) {
    this.title = title;
  }
}
