import React, { Component } from 'react';
import projects from '../../../temporary/projects';
import SideNav from './SideNav';
import 'w3-css/w3.css';
import Project from './Project';



class ProjectRoot extends Component
{
    constructor(props)
    {
        super(props);
        this.state={

            projects:projects,
            selected_project:this.props.match.params.pk

        }
    }
    componentDidMount()
    {
        //code for fetching department projects


        this.props.toggleNavbar(false);
    }
    componentWillUnmount()
    {
        this.props.toggleNavbar(true);
    }

    select_project(project_pk)
    {
        console.log(project_pk);
        this.setState({selected_project:project_pk});
    }

    return_project()
    {
        for(let i=0;i<this.state.projects.length;i++)
        {
            if(this.state.projects[i].pk === this.state.selected_project)
                return this.state.projects[i]
        }
    }
    render()
    {
        return(
            <>
            
            <SideNav projects={this.state.projects} selected_project={this.state.selected_project} department_slug={this.props.match.params.department_slug} select_project={(project_pk)=>this.select_project(project_pk)}/>
            <Project project={this.return_project()} goBack={()=>this.props.history.goBack()}/>
           
            </>

        );

    }
}

export default ProjectRoot;
