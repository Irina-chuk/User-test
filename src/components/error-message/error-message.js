import "./error-message.scss";

const ErrorMessage = () => {
    return (<div className="error">
    <h2>Ошибка 404: данной страницы не существует</h2>
    <a href="/users_list">Перейти на главную</a>
    </div>
    )
    
       
}

export default ErrorMessage;