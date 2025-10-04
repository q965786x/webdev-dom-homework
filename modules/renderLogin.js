import { fetchAndRenderComments } from '../index'
import { login, updateToken, updateName } from './api'
import { renderRegistration } from './renderRegistration'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
        <section class="add-form">
            <h1>Форма входа</h1>
            <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required/>
            <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required/>
            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">Войти</button>
                <ul class="add-form-button-link registry">Зарегистрироваться</ul>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginElement = document.getElementById('login')
    const passwordElement = document.getElementById('password')
    const submitButtonElement = document.querySelector('.button-main')

    submitButtonElement.addEventListener('click', () => {
        login(loginElement.value, passwordElement.value)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка авторизации')
                }
                return response.json()
            })
            .then((data) => {
                if (data.user && data.user.token) {
                    updateToken(data.user.token)
                    updateName(data.user.name)
                    fetchAndRenderComments()
                } else {
                    throw new Error('Неверные данные авторизации')
                }                
            })
            .catch((error) => {
                alert('Ошибка входа: ' + error.message)
            })
    })
}
