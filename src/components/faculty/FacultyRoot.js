import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from './Home';
import Navbar from './Navbar';
import Applications from './Applications';
import Profile from './Profile';
import ProjectAdd from './ProjectAdd';
import AcceptedApplications from './AccecptedApplicants';
import HomeProvider from '../../backend/faculty/HomeProvider';
import ProjectAddProvider from '../../backend/faculty/ProjectAddProvider';

class FacultyRoot extends Component
{
    render()
    {
        return(
            <>
            <Navbar/>
            <Switch>
                <Route exact path="/faculty/home" 
                component={()=>
                <HomeProvider>
                    <Home/>
                </HomeProvider>}
                />
                <Route exact path="/faculty/applications/:project_uuid" component={(props)=><Applications {...props}/>}/>
                <Route exact path="/faculty/applications/accepted/:project_uuid" component={(props)=><AcceptedApplications {...props}/>}/>
                <Route exact path="/faculty/profile" component={(props)=><Profile {...props}/>}/>
                <Route exact path="/faculty/project/add" 
                component={()=>
                <ProjectAddProvider>
                    <ProjectAdd/>
                </ProjectAddProvider>
                }/>
            </Switch>
            </>
        );  
    }
}

export default FacultyRoot;