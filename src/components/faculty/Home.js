import React, { Component } from 'react';


import {CSSTransition} from 'react-transition-group';
import Spinner from '../common/Spinner';
import DateComponent from '../common/Date';

class Home extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            loading:true,
            active_projects:[],
            past_projects:[],
            active_projects_shown:true,
            past_projects_shown:false,

        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    componentDidMount()
    {
        fetch('/faculty/api/get_active_projects/')
        .then((resp)=>resp.json())
        .then((data)=>{
            this.setState({
                loading:false,
                active_projects:data.active_projects,
                past_projects:data.past_projects
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    render_active_projects()
    {
        if(this.state.active_projects.length>0)
        {
            let projects=this.state.active_projects.map((project)=>{
                return(
                    <CSSTransition in={this.state.active_projects_shown} classNames="department-card-design-" timeout={500} unmountOnExit={true}  key={project.uuid_field}>
                        <div className="col-lg-3" onClick={()=>this.props.history.push(`/faculty/applications/${project.uuid_field}`)}>
                            
                            <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400" style={{cursor:'pointer'}}>
                                <div className="text-content">
                                    <span className="department-card-design-title"><strong>{project.title}</strong></span>
                                    <p className="department-card-design-p"><strong>Start Date:</strong> <DateComponent date={project.start_date} locale={'en-GB'} year={'numeric'} day={'numeric'} month={'long'}/></p>

                                </div>
                            </div>
                            
                        </div>
                    </CSSTransition>
                 
                    
            

                );
            });

            return projects;
        }
        else
        {
            return(
                <CSSTransition in={this.state.active_projects_shown} classNames="department-card-design-" timeout={500} unmountOnExit={true} >
                    <div className="col-12">                    
                        <div className="w3-container text-center" style={{marginBottom:'6%'}}> 
                            <div className="text-center w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                                <h4>No active projects to show</h4>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
           
            );
        }
    }

    render_past_projects()
    {
        
        if(this.state.past_projects_shown)
        {
            if(this.state.past_projects.length>0)
            {                
                let output=this.state.past_projects.map((project)=>{
                    return(
                            
                                <div className="col-lg-3" key={project.uuid_field}>
                                    <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400" 
                                    onClick={()=>this.props.history.push(`/faculty/project/edit/${project.pk}`)} 
                                    style={{cursor:'pointer'}}>
                                        <div className="text-content">
                                            <span className="department-card-design-title"><strong>{project.title}</strong></span>
                                            <p className="department-card-design-p"><strong>Start Date:</strong> <DateComponent date={project.start_date} locale={'en-GB'} year={'numeric'} day={'numeric'} month={'long'}/></p>

                                        </div>
                                    </div>
                                </div>
                            
                    

                    );
                });

                return output;
            }
            else
            {
                return(
                    <div className="col-12">                    
                        <div className="w3-container text-center" style={{marginBottom:'6%'}}> 
                            <div className="text-center w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                                <h4>No past projects to show</h4>
                            </div>
                        </div>
                    </div>
               
                );
            }
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
        
              <button onClick={()=>this.props.history.push('/faculty/project/add')} className="btn-mystyle"> <h5>Add Project</h5> </button>
          
        </div>
        {!this.state.loading ? 
            <>
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-12">
                        <h2 className="sub-heading-faculty" onClick={()=>this.toggle_show_variable('active_projects_shown')} style={{cursor:'pointer'}}>
                            Active Projects { this.render_arrow(this.state.active_projects_shown)}
                        </h2>
                    </div>

                </div>
                    <div className="row align-items-center">
                        
                            {this.render_active_projects()}
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-12">
                            <h2 className="sub-heading-faculty" onClick={()=>this.toggle_show_variable('past_projects_shown')} style={{cursor:'pointer'}}>
                                Past Projects { this.render_arrow(this.state.past_projects_shown)}
                            </h2>
                        </div>

                    </div>
                    <div className="row">
                        {this.render_past_projects()}
                    </div>
                </div>
                </>
                   : <Spinner size={50} position={'relative'}/>
                   }
     

        </>
        );
    }
}

export default Home;