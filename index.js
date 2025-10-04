import { fetchComments } from './modules/api'
import { updateComments } from './modules/comments'
import { renderComments } from './modules/renderComments'

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

fetchAndRenderComments(true)
