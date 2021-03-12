import React, { Component } from 'react';

import Footer from './Footer'

import Spinner from '../common/Spinner';
import Tags from '../common/Tags';
import DateComponent from '../common/Date';

class Department extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            loading:true,
            department_slug:this.props.match.params.department_slug,
            projects:null,
            department_name:null

        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    componentDidMount()
    {
        fetch(`/student/api/get_projects/${this.state.department_slug}/`)
        .then((resp)=>resp.json())
        .then((data)=>{
            console.log(data);
            if(data.status==='slug does not exist')
            {
                this.props.history.replace('/student/not-found');
            }
            else
            {
                this.setState({
                    loading:false,
                    department_name:data.department_name,
                    projects:data.projects
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    render_projects()
    {
        if(this.state.projects.length>0)
        {  
            let projects=this.state.projects.map((project)=>
                <div className="col-lg-3" key={project.uuid_field} style={{cursor:'pointer'}} onClick={(event)=>{
                    this.navigateToProject(event, project);
                }}>
                    <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
                    {project.applied? <Tags tag_string={'Applied'} bootstrap_color={'success'}/> :<></>}
                        <div className="text-content">
                        
                            <span className="department-card-design-title"><strong>{project.title}</strong></span>
                            <p className="department-card-design-p"><strong>Faculty:</strong> {project.faculty.first_name} {project.faculty.last_name}</p>
                            <p className="department-card-design-p"><strong>Start Date: </strong><DateComponent date={project.start_date} locale={'en-GB'} year={'numeric'} day={'numeric'} month={'long'}/>
                            </p>
                            <button className="btn btn-mystyle">Know More</button>
                            
                        </div>
                    </div>
                </div>
            );

            return projects;
        }
        else
        {
            return(
                <div className="col-12 text-center">
                    <h3>No Projects to show under this department</h3>

                </div>
            );
        }
    }


    navigateToProject(event, project) {
        event.preventDefault();
        this.props.history.push(`/student/${this.state.department_slug}/project/${project.uuid_field}`);
    }

    render()
    {
        if(!this.state.loading)
        {   
            return(
                <>
                <title>{this.state.department_name}</title>
                <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                    <h3 className="display-1" id="jumbo-text">{this.state.department_name}</h3>
                    <p className="lead my-4" style={{fontFamily:'Quicksand'}}>Projects related to that department !</p>
                </div>

                <div className="container-fluid ">
                    <div className="row" >
                        {this.render_projects()}
                    </div>
                </div>

                {this.state.projects.length>0? <Footer/>:<></>}
                </>
            );
        }

        else
        {
            return <Spinner size={100} position={'absolute'}/>
        }
    }
}

export default Department;