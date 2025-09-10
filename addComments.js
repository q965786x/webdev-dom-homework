import { comments, updateComments } from "./modules/comments.js";
import { commentsEl } from "./modules/index.js";
import { renderComments } from "./modules/renderComments.js";

export const newComment = {
        userName: userName,
        date: formatDate(),
        commentText: commentText,
        likes: 0,
        isLiked: false
      };

fetch('https://wedev-api.sky.pro/api/v1/lialia-khabibova/comments' , { 
   method: 'POST',
   body: JSON.stringify(newComment),
}).then((response) => {
    return response.json()
}).then((data) => {
    updateComments(data.comments)
    renderComments()
});

      //comments.push(newComment);
      //renderComments();
      
      nameInput.value = '';
      commentInput.value = ''; 
       