import { Note } from "./note.js";

export class Photo extends Note {
  constructor(id, title, albumId, url, thumbnailUrl) {
    super(id, title);
    this.albumId = albumId;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }

  static createPhoto(obj) {
    return new Photo(obj.id, obj.title, obj.albumId, obj.url, obj.thumbnailUrl);
  }

  get AlbumId() {
    return this.albumId;
  }

  set AlbumId(albumId) {
    this.albumId = albumId;
  }

  get Url() {
    return this.url;
  }

  set Url(url) {
    this.url = url;
  }

  get ThumbnailUrl() {
    return this.thumbnailUrl;
  }

  set ThumbnailUrl(thumbnailUrl) {
    this.thumbnailUrl = thumbnailUrl;
  }
}
