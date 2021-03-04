import React, { Component } from 'react';
import StudentRoot from './components/student/StudentRoot';
import FacultyRoot from './components/faculty/FacultyRoot';
import { Route, Switch } from 'react-router';

import UserProvider from './providers/UserProvider'


import Spinner from './components/common/Spinner';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            loading:true,
            user:null,
            getCookie:this.getCookie


        };

        this.getCookie=this.getCookie.bind(this);


    }

    getCookie(name)
    {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    componentDidMount()
    {
        fetch('/api/get_logged_in_user/')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                user:data.user,
                loading:false
            })
        })
        .catch((err)=>console.log(err))

    }
    
    render()
    {
        if(!this.state.loading)
        {    return(
        
                    <UserProvider.Provider value={this.state}>
                        <Switch>
                            <Route path="/student" render={()=><StudentRoot/>}/>
                            <Route path="/faculty" render={()=><FacultyRoot/>}></Route>
                        </Switch>
                    </UserProvider.Provider>

         
            );
        }

        else 
        {
            return(
                
                    
                <Spinner size={100} position={'absolute'}/>
                
            );

        }
    }
}

export default App;