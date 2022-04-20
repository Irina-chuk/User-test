class UserService {
    getResource = async(url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    getAllUsers = () => {
        return this.getResource("https://jsonplaceholder.typicode.com/users");
    }

    getUser = async(id) => {
        const res = await this.getResource(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        return this._transformUser(res);
       
        
    }


    _transformUser = (user) => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            street: user.address.street,
            city: user.address.city,
            zipcode: user.address.zipcode,
            phone: user.phone,
            website: user.website

        }
    }
}

export default UserService;