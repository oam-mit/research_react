import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Department from './Department';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectRoot from './Project/ProjectRoot';
import Applications from './Applications'
import NotFound from '../common/404'
import DepartmentProvider from '../../backend/student/DepartmentProvider';
import HomeProvider from '../../backend/student/HomeProvider';
import ApplicationProvider from '../../backend/student/ApplicationProvider';


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
                <Route path="/student/home" render={(props)=><HomeProvider><Home {...props}/></HomeProvider>}/>
                <Route path="/student/profile" render={(props)=><Profile {...props}/>}/>
                <Route path="/student/department/:department_slug" render={(props)=><DepartmentProvider><Department {...props}/> </DepartmentProvider>}/>
                <Route path="/student/:department_slug/project/:uuid_field" render={(props)=><ProjectRoot {...props} toggleNavbar={(value)=>this.toggleNavbar(value)}/>}/>
                <Route path="/student/applications" render={(props)=> <ApplicationProvider><Applications {...props}/></ApplicationProvider>  }/>
                <Route path="/student/not-found" render={()=><NotFound/>}/>
              </Switch>
        
           
          </>
      )
    };
}


export default StudentRoot;