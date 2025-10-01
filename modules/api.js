const host = 'https://wedev-api.sky.pro/api/v2/lialia-khabibova'
const authHost = 'https://wedev-api.sky.pro/api/user'

//Добавили константы для ключей LocalStorage

const tokenKey = 'userToken'
const nameKey = 'userName'

export let token = localStorage.getItem(tokenKey) || ''

export const updateToken = (newToken) => {
    token = newToken
    if (newToken) {
        localStorage.setItem(tokenKey, newToken)
    } else {
        localStorage.removeItem(tokenKey)
    }
}

export let name = localStorage.getItem(nameKey) || ''

export const updateName = (newName) => {
    name = newName
    if (newName) {
        localStorage.setItem(nameKey, newName)
    } else {
        localStorage.removeItem(nameKey)
    }
}

export const logout = () => {
    updateToken('')
    updateName('')
}

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

// Код функции отсрочки выполнения действия

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            login: login,
            password: password,
        }),
    })
}
