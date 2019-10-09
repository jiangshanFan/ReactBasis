/**
 * Book类,代表一个书本.
 * @param title {string} - 书本的标题
 * @param author {string} - 书本的作者
 * @constructor
 */
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype = {
  /**
   * 获取书本的标题
   * @returns {string}
   */
  getTitle: function () {
    return this.title;
  }
}