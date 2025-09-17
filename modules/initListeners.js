import { postComment } from "./api.js"
import { updateComments } from "./comments.js"
import { comments } from "./comments.js"
import { sanitizeHtml } from "./addFunctions.js";


export const initLikeButtonsListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button');

      for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
          event.stopPropagation();

          const index = likeButton.dataset.index;
          const comment = comments[index];

          comment.likes = comment.isLiked
          ? comment.likes -1
          : comment.likes +1;

          comment.isLiked = !comment.isLiked;

          renderComments();
        });
      }

}

export const initReplyListeners = () => {
    const text = document.getElementById('text-input');
    const commentsElements = document.querySelectorAll('.comment');

      for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {          
          const currentComment = comments[commentElement.dataset.index];
          text.value = `${currentComment.name}: ${currentComment.text}`;
        });
      }
}

export const initAddCommentListener = (renderComments) => {
    const name = document.getElementById('name-input');
    const text = document.getElementById('text-input');
    const addButton = document.querySelector('.add-form-button');

    addButton.addEventListener('click', () => {
        if (!name.value || !text.value) {
        alert('Необходимо заполнить все поля');
        return;
        }

        postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then(
            (data) => {
                updateComments(data)
                renderComments()
                name.value = ""
                text.value = ""
            },
        )
    })
}
  