import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/user-service";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";

import "./users-profile.scss";



const UsersProfile = () => {
    const {userId} = useParams();
    const [user, setUser] = useState({
        'name': '',
        'phone': '',
        'username': '',
        'email': '',
        'street': '',
        'city': '',
        'zipcode': '',
        'website': ''
     });
     console.log("rendered UsersProfile again"); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isRead, setRead] = useState(true);
    const userService = new UserService();

    useEffect(() => { 
        updateUser();    
    }, [userId]);

    const updateUser = async() => {
        setLoading(true);
        await userService.getUser(userId)
        .then(onUserLoaded)
        .catch(onError);   
    }

    const onUserLoaded = (user) => {
        setLoading(false);
        setUser(user);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onEditUser = () => {
        setRead(false);
    }
    const onHandleChange = (event) => onEditUserField(event);
    
    const onEditUserField  = (event) => {
        console.log(event.target.value);
        console.log(event.target.name);
        setUser({...user, ...{[event.target.name]: event.target.value}});
    }


    const onSendData = (e) => {
        e.preventDefault();
       return (console.log(JSON.stringify(user))) 
        
    }
    
    const UserInfo = ({user}) => {
        console.log("rendered UserInfo again"); 
        const {name, phone, username, email, street, city, zipcode, website} = user;
        return (
            <div className="users_list_item">
                <h2 className="title">Профиль пользователя</h2>
                <button className="btn-edit" onClick={onEditUser}>Редактировать</button>
                <form onSubmit={onSendData}>
                <li className="user_item">
                    <div className="users_input">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} readOnly={isRead} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div className="users_input">
                        <label htmlFor="user_name">User Name</label>
                        <input type="text" name="username" defaultValue={username} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="e-mail">E-mail</label>
                        <input type="e-mail" name="email" defaultValue={email} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="street">Street</label>
                        <input type="text" name="street" defaultValue={street} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" defaultValue={city} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="zip_code">Zip code</label>
                        <input type="text" name="zip_code" defaultValue={zipcode} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="phone">Phone</label>
                        <input type="phone" name="phone" defaultValue={phone} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="website">Website</label>
                        <input type="text" name="website" defaultValue={website} readOnly={isRead} onChange={onHandleChange}/>
                    </div>
                    <div className="users_input">
                        <label htmlFor="comment">Comment</label>
                        <textarea name="comment" id="comment"></textarea>
                    </div>
                </li>
                <button className="btn-send" type="submit">Отправить</button>
                </form>
                
                
            </div>
        )
    }
    
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error ||!user) ? <UserInfo user={user}/> : null;
    
    
    return (
        <>
        {spinner}
        {errorMessage}
        {content}
        </>
        )
     }

export default UsersProfile;
    

