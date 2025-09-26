import { fetchComments, updateToken } from "./api.js"
import { renderRegistration } from "./renderRegistration.js"

export const renderLogin = () => {
    
    const app = document.getElementById('app')

    app.innerHTML = `
        <h1>Страница входа</h1>
        <div class="form">
            <h3 class="form-titel">Форма ввода</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин"/>
                <input type="text" id="password-input" class="input" placeholder="Пароль"/>
            </div>
            <br />
            <button class="button" id="login-button">Войти</button>
            <button class="button" id="reg-button">Зарегистрироваться</button>
        </div>
    `

    const button = document.getElementById('login-button')
    const loginElement = document.getElementById('login-input')
    const passwordElement = document.getElementById('password-input')

    button.addEventListener('click', () => {
        login({
            login: loginElement.value,
            password: passwordElement.value,
        }).then((responseData) => {
            updateToken(data.user.token)
            fetchComments()            
        })
    })

    const buttonReg = document.getElementById('reg-button')

    buttonReg.addEventListener('click', () => {
        renderRegistration()
    })
}