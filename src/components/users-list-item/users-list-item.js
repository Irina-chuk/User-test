import {Link} from "react-router-dom";
import "./users-list-item.scss"



 const UsersListItem = ({data}) => {
     

 
    return (
            <li className="item_user">
                <div className="item_user_inform">
                    <span>ФИО:</span><div className="item_user_data">{data.name}</div>
                </div>  
                <div className="item_user_inform">
                    <span>город:</span><div className="item_user_data">{data.address.city}</div>
                </div>
                <div className="item_user_inform">
                    <span>компания:</span><div className="item_user_data">{data.company.name}</div>
                </div>
                <Link to={`/users_list/${data.id}`} className="item_user_link">Подробнее</Link>
            
        </li>
        
    )
}

export default UsersListItem;