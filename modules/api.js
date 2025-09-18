import { formatDate } from "./addFunctions.js"

const host = 'https://wedev-api.sky.pro/api/v1/lialia-khabibova'

export const fetchComments = () => {
    return fetch(host + '/comments')
    .then((res) => {
        return res.json()
    })
    .then((responseData) => {
        const appComments = responseData.comments.map(comment => {
            return {
                name: comment.author.name,
                date: formatDate(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }
        })
            
        return appComments
    })    
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
    }),
    }).then(() => {
        return fetchComments()
    })
}