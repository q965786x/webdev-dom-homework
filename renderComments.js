import { comments } from "./modules/comments.js";
import { commentsEl } from "./modules/index.js";

export const renderComments = () => {
      commentsEl.innerHTML = comments.map((comment, index) => {
        return `
          <li class='comment' data-index="${index}">
            <div class='comment-header'>
              <div>${sanitizeHtml(comment.userName)}</div>
              <div>${comment.date}</div>
            </div>
            <div class='comment-body'>
              <div class='comment-text'>${sanitizeHtml(comment.commentText)}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.isLiked ? '-active-like' : ''}">
                </button>
              </div>
            </div>
          </li>
        `;
      }).join('');
    };
  
    renderComments();