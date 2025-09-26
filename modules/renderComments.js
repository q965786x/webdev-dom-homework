import { comments } from './comments.js'
import { initReplyListeners, initLikeButtonsListeners } from './initListeners.js'
import { formatDate } from './addFunctions.js'

export const renderComments = () => {
    //const app = document.getElementById('app')
    const list = document.querySelector('.comments')

      list.innerHTML = comments    
        .map((comment, index) => {
            return `
        <li class='comment' data-index="${index}">
          <div class='comment-header'>
            <div>${comment.name}</div>
            <div>${formatDate(comment.date)}</div>
          </div>
          <div class='comment-body'>
            <div class='comment-text'>${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>
      `
        })
        .join('')

    const appHtml = `
     <div class="container">
      <ul class="comments">${list.innerHTML}</ul>   
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="name-input"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="text-input"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
    `
    app.innerHTML = appHtml

    initReplyListeners()
    initLikeButtonsListeners(renderComments)
}
