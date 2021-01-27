import React, { Component } from 'react';
import projects from '../../temporary/projects'
import Footer from './Footer'

class Department extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            department_slug:this.props.match.params.department_slug,
            projects:projects,
            department_name:'Testing'

        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render_projects()
    {
        let projects=this.state.projects.map((project)=>
            <div className="col-lg-3" key={project.pk} style={{cursor:'pointer'}} onClick={(event)=>{
                this.navigateToProject(event, project);
            }}>
                <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
                    <div className="text-content">
                        <span className="department-card-design-title"><strong>{project.name}</strong></span>
                        <p className="department-card-design-p">{project.description}</p>
                        <button class="btn btn-mystyle">Know More</button>
                    </div>
                </div>
            </div>
        );

        return projects;
    }


    navigateToProject(event, project) {
        event.preventDefault();
        this.props.history.push(`/student/${this.state.department_slug}/project/${project.pk}`);
    }

    render()
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
            <Footer/>
            </>
        );
    }
}

export default Department;