import React, { Component } from 'react';
import SideNav from './SideNav';
import 'w3-css/w3.css';
import Project from './Project';

import Spinner from '../../common/Spinner';



class ProjectRoot extends Component
{
    static getDerivedStateFromProps(props, state)
    {
        if(state.select_project!==props.match.params.uuid_field)
        {
            return(
                {
                    ...state,
                    selected_project:props.match.params.uuid_field
                }
            );
        }

        else
        {
            return null;
        }
    }
    constructor(props)
    {
        super(props);
        this.state={
            loading:true,
            projects:[],
            selected_project:this.props.match.params.uuid_field,
            department_slug:this.props.match.params.department_slug

        }
    }
    componentDidMount()
    {
        //code for fetching department projects
        fetch(`/student/api/get_projects/${this.state.department_slug}/`)
        .then((resp)=>resp.json())
        .then((data)=>{
            if(data.status==='slug does not exist')
            {
                this.props.history.replace('/student/not-found')
            }
            else
            {
                this.setState({
                    loading:false,
                    projects:data.projects
                })
            }

            
        })
        .catch((err)=>{
            console.log(err);
        })
        

        this.props.toggleNavbar(false);
    }
    componentWillUnmount()
    {
        this.props.toggleNavbar(true);
    }

    select_project(project_uuid_field)
    {
        this.props.history.push(`/student/${this.state.department_slug}/project/${project_uuid_field}`)
        
    }

    redirect_to_department()
    {
        this.props.history.replace(`/student/department/${this.state.department_slug}`);
    }


    return_project()
    {
        for(let i=0;i<this.state.projects.length;i++)
        {
            if(this.state.projects[i].uuid_field === this.state.selected_project)
                return this.state.projects[i]
        }
    }
    render()
    {
        if(!this.state.loading)
        {    
            return(
                <>
                
                <SideNav projects={this.state.projects} selected_project={this.state.selected_project} department_slug={this.props.match.params.department_slug} select_project={(project_uuid_field)=>this.select_project(project_uuid_field)}/>
                <Project redirect_404={()=>this.props.history.replace('/student/not-found')} project={this.return_project()} goBack={()=>this.props.history.goBack()} redirect_to_department={()=>this.redirect_to_department()}/>
            
                </>

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

export default ProjectRoot;
