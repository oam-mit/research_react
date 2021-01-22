import React, { Component } from 'react';
import projects from '../../temporary/projects'

import {CSSTransition} from 'react-transition-group';

class Home extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            active_projects:projects,
            past_projects:projects,
            active_projects_shown:true,
            past_projects_shown:false,

        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render_projects()
    {
       
            let output=this.state.active_projects.map((project)=>{
                return(
                    <CSSTransition in={this.state.active_projects_shown} classNames="department-card-design-" timeout={500} unmountOnExit={true}  key={project.pk}>
                        <div className="col-lg-3" onClick={()=>this.props.history.push(`/faculty/applications/${project.pk}`)}>
                            
                            <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400" style={{cursor:'pointer'}}>
                                <div className="text-content">
                                    <span className="department-card-design-title"><strong>{project.name}</strong></span>
                                    <p className="department-card-design-p">{project.description}</p>

                                </div>
                            </div>
                            
                        </div>
                    </CSSTransition>
                 
                    
            

                );
            });

            return output;
    }

    render_past_projects()
    {
        if(this.state.past_projects_shown)
        {
            let output=this.state.past_projects.map((project)=>{
                return(
                    
                        <div className="col-lg-3" key={project.pk}>
                            <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400" 
                            onClick={()=>this.props.history.push(`/faculty/project/edit/${project.pk}`)} 
                            style={{cursor:'pointer'}}>
                                <div className="text-content">
                                    <span className="department-card-design-title"><strong>{project.name}</strong></span>
                                    <p className="department-card-design-p">{project.description}</p>

                                </div>
                            </div>
                        </div>
                    
            

                );
            });

            return output;
        }
        else
        {
            return <></>
        }
    }

    render_arrow(variable)
    {
        if(variable)
        {
            return(<i style={{color:'black'}} className="fa fa-angle-down"></i>);
        }
        else
        {
            return(<i style={{color:'black'}} className="fa fa-angle-up"></i>)
        }
    }

    toggle_show_variable(variable)
    {
        switch(variable)
        {
            case 'active_projects_shown':
                this.setState((prev)=>{
                    return(
                        {
                            active_projects_shown:!prev.active_projects_shown
                        }
                    );
                });
                break;
            case 'past_projects_shown':
                this.setState((prev)=>{
                    return(
                        {
                            past_projects_shown:!prev.past_projects_shown
                        }
                    );
                },()=>{
                    document.body.scrollTop+= 200;
                    document.documentElement.scrollTop += 200;
                });
                
                break;
            
            default:
                console.log('not a valid input');
            

        }
    }
    render()
    {
        return(
        <>
        <title>Faculty | Home</title>
        <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
            <h3 className="display-1" id="jumbo-text">Your Projects</h3>
            <p className="lead my-4" style={{fontFamily:'Quicksand'}}>View applications and add more!</p><br/>
        
              <button onClick={()=>this.props.history.push('/faculty/project/add')} className="w3-button w3-black w3-round-xxlarge"> <h5>Add Project</h5> </button>
          
        </div>

        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12">
                    <h2 onClick={()=>this.toggle_show_variable('active_projects_shown')} style={{cursor:'pointer'}}>
                        Active Projects { this.render_arrow(this.state.active_projects_shown)}
                    </h2>
                </div>

            </div>
                <div className="row align-items-center">
                    
                        {this.render_projects()}
                </div>
            </div>

            <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12">
                    <h2 onClick={()=>this.toggle_show_variable('past_projects_shown')} style={{cursor:'pointer'}}>
                        Past Projects { this.render_arrow(this.state.past_projects_shown)}
                    </h2>
                </div>

            </div>
                <div className="row">
                    {this.render_past_projects()}
                </div>
            </div>

     

        </>
        );
    }
}

export default Home;