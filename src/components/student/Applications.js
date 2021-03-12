import React, { Component } from 'react'
import Spinner from '../common/Spinner';
import DateComponent from '../common/Date'
import Tags from '../common/Tags';
import {APPLIED,ACCEPTED,REJECTED} from '../common/ProjectStatus';

class Applications extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            loading:true,
            projects:[]
        }
    }

    componentDidMount()
    {
        fetch('/student/api/get_applied_projects/')
        .then((resp)=>resp.json())
        .then((data)=>{
            this.setState({
                loading:false,
                projects:data.projects
            })
        })
        .catch(err=>console.log(err))


    }

    render_status(status)
    {
        if(status===ACCEPTED)
        {
            return <Tags tag_string="Accepted" bootstrap_color={'success'}/>
        }
        else if(status===REJECTED)
        {
            return <Tags tag_string="Rejected" bootstrap_color={'danger'}/>

        }
        else if(status===APPLIED)
        {
            return <Tags tag_string="Applied" bootstrap_color={'info'}/>
        }
    }

    render_projects()
    {
        if(this.state.loading)
        {
            return <Spinner size={50} position={'absolute'}/>
        }
        else
        {
            if(this.state.projects.length>0)
            {    
                let projects=this.state.projects.map((project)=>{
                    return(
                        <div className="col-lg-3" key={project.uuid_field} style={{cursor:'pointer'}} onClick={()=>{
                            this.props.history.push(`/student/${project.department_slug}/project/${project.uuid_field}`)
                        }}>
                            <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
                                {this.render_status(project.status)}
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
                });

                return projects;
            }
            else
            {
                return(
                <div className="col-12 text-center">
                    <h3>You have not applied for any projects yet</h3>

                </div>
                );
            }
        }
    }

    render()
    {
        return(
        <>
        <title>Student|Applications</title>
        <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
            <h3 className="display-1" id="jumbo-text">Your Applications</h3>
            <p className="lead my-4" style={{fontFamily:'Quicksand'}}>
                You can view all your applications here
            </p>
            <br/>
        </div>

        <div className="container-fluid ">
            <div className="row" >
                {this.render_projects()}
            </div>
        </div>
        </>
        );
    }
}

export default Applications;