import { fetchAndRenderComments } from '../index.js'
import { registration, updateToken, updateName } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
        <section class="add-form">
            <h1>Форма регистрации</h1>
            <input type="text" class="add-form-name" placeholder="Введите имя" id="name" required/>
            <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required/>
            <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required/>
            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">Зарегистрироваться</button>
                <ul class="add-form-button-link entry">Войти</ul>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameElement = document.getElementById('name')
    const loginElement = document.getElementById('login')
    const passwordElement = document.getElementById('password')
    const submitButtonElement = document.querySelector('.button-main')

    submitButtonElement.addEventListener('click', () => {
        registration(
            nameElement.value,
            loginElement.value,
            passwordElement.value,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка регистрации')
                }
                return response.json()
            })
            .then((data) => {
                if (data.user && data.user.token) {
                    updateToken(data.user.token)
                    updateName(data.user.name)
                    fetchAndRenderComments()
                } else {
                    throw new Error('Неверные данные регистрации')
                }                
            })
            .catch((error) => {
                alert('Ошибка регистрации: ' + error.message)
            })
    })
}
