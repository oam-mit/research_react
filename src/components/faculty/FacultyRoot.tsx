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
import AcceptedApplicationsProvider from '../../backend/faculty/AcceptedApplicationsProvider';
import ApplicationsProvider from '../../backend/faculty/ApplicationsProvider';

const FacultyRoot = ()=>{
    
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
            
            <Route exact path="/faculty/applications/:project_uuid" 
            component={()=>
                <ApplicationsProvider>
                    <Applications/>
                </ApplicationsProvider>
                }
            />

            <Route exact path="/faculty/applications/accepted/:project_uuid" 
            component={
                ()=>
                <AcceptedApplicationsProvider>
                    <AcceptedApplications/>
                </AcceptedApplicationsProvider>
                }/>

            <Route exact path="/faculty/profile" component={()=><Profile />}/>
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

export default FacultyRoot;