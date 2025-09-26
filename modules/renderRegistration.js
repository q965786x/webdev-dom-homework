import { fetchComments, registration } from "./api.js"

export const renderRegistration = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
        <h1>Страница регистрации</h1>
        <div class="form">
            <h3 class="form-titel">Форма ввода</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин"/>
                <input type="text" id="name-input" class="input" placeholder="Имя"/>
                <input type="text" id="password-input" class="input" placeholder="Пароль"/>
            </div>
            <br />
            <button class="button" id="reg-button">Зарегистрироваться</button>
        </div>
    `

    const button = document.getElementById('login-button')
    const loginElement = document.getElementById('login-input')
    const nameElement = document.getElementById('name-input')
    const passwordElement = document.getElementById('password-input')
    
        button.addEventListener('click', () => {
            registration({
                login: loginElement.value,
                name: nameElement.value,
                password: passwordElement.value,
            }).then((responseData) => {
                updateToken(data.user.token)
                fetchComments()            
            })
        })
}