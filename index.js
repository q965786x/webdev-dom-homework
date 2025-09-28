import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'
import { renderLogin } from './modules/renderLogin.js'
import { token } from './modules/api.js'

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            'Пожалуйста подождите, комментарии загружаются...'
    }

    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}
if (token) {
    fetchAndRenderComments(true)
} else {
    renderLogin()
}


