import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from './Home';
import Navbar from './Navbar';
import Applications from './Applications';
import Profile from './Profile';
import ProjectAdd from './ProjectAdd';

class FacultyRoot extends Component
{
    render()
    {
        return(
            <>
            <Navbar/>
            <Switch>
                <Route exact path="/faculty/home" component={(props)=><Home {...props}/>}/>
                <Route exact path="/faculty/applications/:project_uuid" component={(props)=><Applications {...props}/>}/>
                <Route exact path="/faculty/profile" component={(props)=><Profile {...props}/>}/>
                <Route exact path="/faculty/project/add" component={(props)=><ProjectAdd {...props}/>}/>
            </Switch>
            </>
        );  
    }
}

export default FacultyRoot;