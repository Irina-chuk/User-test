
import UsersListItem from "../users-list-item/users-list-item";


import "./users-list.scss";


const UsersList = ({data}) => {
        const elements = data.map(item => {
            const {id} = item;
            return (<UsersListItem
                key={id}
                data={item}
               />)
        
               
        });
       
    

    
    return (
        
        <div className="users_list">
            <h2>Список пользователей</h2>
            {elements}
            
        </div>
        
        
    )
}

export default UsersList;