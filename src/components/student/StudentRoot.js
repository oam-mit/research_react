import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Department from './Department';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectRoot from './Project/ProjectRoot';


class StudentRoot extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
          showNavbar:true

        };

        this.toggleNavbar=this.toggleNavbar.bind(this);

    }

    toggleNavbar(value)
    {
      console.log("hello");
      this.setState(()=>{
        return{
          showNavbar:value
        }
      })
    }

    render() {
      return (
          <>
            {this.state.showNavbar && <Navbar/>}
              <Switch>
                <Route path="/student/home" render={(props)=><Home {...props}/>}/>
                <Route path="/student/profile" render={(props)=><Profile {...props}/>}/>
                <Route path="/student/department/:department_slug" render={(props)=><Department {...props}/>}/>
                <Route path="/student/:department_slug/project/:pk" render={(props)=><ProjectRoot {...props} toggleNavbar={(value)=>this.toggleNavbar(value)}/>}/>
              </Switch>
        
           
          </>
      )
    };
}


export default StudentRoot;