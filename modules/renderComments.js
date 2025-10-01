import { comments } from './comments.js'
import {
    initReplyListeners,
    initLikeButtonsListeners,
    initAddCommentListener,
} from './initListeners.js'
import { formatDate } from './addFunctions.js'
import { logout, name, token } from './api.js'
import { renderLogin } from './renderLogin.js'
import { fetchAndRenderComments } from '../index.js'
import { renderRegistration } from './renderRegistration.js'

export const renderComments = () => {
    const container = document.querySelector('.container')

    const commentsHtml = comments
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

    const userInfoHtml = token ? `
        <div class="user-info">
            <span>Вы вошли как: ${name}</span>
            <button class="logout-button">Выйти</button>
        </div>
      ` : ''

    const addCommentsHtml = `          
          <div class="add-form">
            <input
                type="text"
                class="add-form-name"
                placeholder="Введите ваше имя"
                readonly
                value='${name}'
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
        <div class="loading-form">ИДЁТ ЗАГРУЗКА...</div>
        ${userInfoHtml}
      `

    const linkToLoginText = `
      <p>Чтобы отправить комментарий, <span class='link-login'>Войдите</span></p>
      <p>Нет аккаунта? <span class='link-register'>Зарегистрируйтесь</span></p>
    `

    const baseHtml = `
      <ul class="comments">${commentsHtml}</ul>
      ${token ? addCommentsHtml : linkToLoginText}
    `
    container.innerHTML = baseHtml

    if (token) {
        initLikeButtonsListeners(renderComments)
        initReplyListeners()
        initAddCommentListener(renderComments)

        document.querySelector('.logout-button').addEventListener('click', () => {
          logout()
          fetchAndRenderComments()
        })
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
        document.querySelector('.link-register').addEventListener('click', () => {
            renderRegistration()
        })
    }
}
