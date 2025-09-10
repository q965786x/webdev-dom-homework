import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { newComments} from './addComments.js'

export const nameInput = document.querySelector('.add-form-name');
export const commentInput = document.querySelector('.add-form-text');
export const addButton = document.querySelector('.add-form-button');
export const commentsEl = document.querySelector('.comments');

fetch('https://wedev-api.sky.pro/api/v1/lialia-khabibova/comments' ,{
  method: 'GET'
}).then((response) => {
    return response.json()
   })
   .then((data) => {
    updateComments(data.comments)
    renderComments();
  });
  
   