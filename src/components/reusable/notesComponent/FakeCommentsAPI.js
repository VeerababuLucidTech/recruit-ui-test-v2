// fakeCommentsAPI.js

const fakeCommentsAPI = {
  comments: [],

  getAllComments() {
    return this.comments;
  },

  addComment(newComment) {
    const updatedComment = {
      ...newComment,
      id: this.comments.length + 1,
    };

    this.comments.push(updatedComment);
  },
};

export default fakeCommentsAPI;
