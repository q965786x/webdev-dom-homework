const host = 'https://wedev-api.sky.pro/api/v2/lialia-khabibova'

let token = ""

export const updateToken = (newToken) => {
    token = newToken
}

const authToken = 'https://wedev-api.sky.pro/api/user'

export const fetchComments = () => {
    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}

/*export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
            name,
            //forceError: true
        }),
    })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else {
            if (response.status === 500) {
              throw new Error('Сервер упал')
            }
            if (response.status === 400) {
              throw new Error('Вы допустили ошибку')
            }

              throw new Error('Что-то пошло не так')
          }
    })
        .then(() => {
        return fetchComments()
        })  
}*/

// Код функции отсрочки выполнения действия

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

//Код с автоматическими повторными попытками при ошибках 500

const maxRetries = 3
const retriesDelay = 1000

const newDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const postComment = async (text, name) => {
    let lastError

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(host + '/comments', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text, name, forceError: true }),
            })

            if (response.status === 201) {
                await response.json()
                return await fetchComments()
            } else if (response.status === 500 && attempt < maxRetries) {
                // Ждем перед повторной попыткой (экспоненциальная задержка)
                await newDelay(retriesDelay * Math.pow(2, attempt))
                continue
            } else if (response.status === 400) {
                throw new Error('Вы допустили ошибку')                
            } else if (response.status === 401) {
                throw new Error('Нет авторизации')
            } else {
                throw new Error('Что-то пошло не так')
            }
        } catch (error) {
            lastError = error
            if (attempt === maxRetries) {
                throw lastError
            }
        }
    }
}

export function login({ login, password }) {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,            
        }),
    }).then((response) => {
        return response.json()
    })  
}

export function registration({ login, name, password }) {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password, 
            name,           
        }),
    }).then((response) => {
        return response.json()
    })  
}
