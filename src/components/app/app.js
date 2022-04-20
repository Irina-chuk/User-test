import {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserService from '../../services/user-service';
import ErrorMessage from '../error-message/error-message';


import AppFilter from '../app-filter/app-filter';
import UsersList from '../users-list/users-list';
import UsersProfile from '../users-profile/users-profile';
import Spinner from '../spinner/spinner';


import "./app.scss";

class App extends Component {
        state = {
           data: [],
           loading: true,
           error: false
        }

    userService = new UserService;
    componentDidMount() {
        this.userService.getAllUsers()
          .then((data) => this.setState({ data: data, loading: false}))
          .catch(this.onError);
      }

    onSort = (field) => {
        const copyArr = this.state.data.concat();
        switch (field) {
            case "city":
                let cityData = copyArr.sort((a, b) => {
                    if (a.address.city > b.address.city) return 1;
                    if (a.address.city < b.address.city) return -1;
                });
                return this.setState({data: cityData});
            case "company":
                let companyData = copyArr.sort((a, b) => {
                    if (a.company.name > b.company.name) return 1;
                    if (a.company.name < b.company.name) return -1;
                });
                return this.setState({data: companyData});
            default:
                return this.state.data;
        }   
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }
 
    render() {
        let field = "";
        const {loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;

    
        return ( 
            
            <Router>
                <div className='app'>
                    <AppFilter
                    onSort={this.onSort}
                    />
                    <main>
                        {spinner}
                        {errorMessage}
                        {!(loading || error) ?
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/users_list"/>
                            </Route>
                            <Route exact path="/users_list">
                                <UsersList data={this.onSort(field)}
                                />
                            </Route>
                            {/* <Route path="*" element={<ErrorMessage />} />  */}
                            <Route exact path="/users_list/:userId">
                                <UsersProfile/>
                            </Route> 
                        </Switch> : null}
                          
                    </main>   
                </div>
            </Router>
           
        )
    }
}

export default App;