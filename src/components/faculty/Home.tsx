import React, { Component } from 'react';



import Spinner from '../common/Spinner';

import HomeCard from '../../widgets/faculty/HomeCard';
import NoProjects from '../../backend/common/NoProjectToShow';
import { RouteComponentProps, withRouter } from 'react-router';
import { HomeContext } from '../../backend/faculty/HomeProvider';
import { ProjectType } from "../../backend/common/ProjectType";



class Home extends Component<PropsType,StateType>
{

    constructor(props:any)
    {
        super(props);
        this.state={
            active_projects_shown:true,
            past_projects_shown:false,

        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render_active_projects(active_projects:Array<ProjectType>)
    {
        if(this.state.active_projects_shown)
        {    
            if(active_projects.length>0)
            {
                let projects=active_projects.map((project)=>
                    
                        <HomeCard project={project}/>
                
                   
                );

                return projects;
            }
            else
            {
                return(
                    
                        <NoProjects message={'No Active projects to Show'}/>
                
            
                );
            }
        }
        else
        {
            return <></>
        }
    }

    render_past_projects(past_projects:Array<ProjectType>)
    {
        
        if(this.state.past_projects_shown)
        {
            if(past_projects.length>0)
            {                
                let output=past_projects.map((project)=>
                   <HomeCard project={project}/>
                );

                return output;
            }
            else
            {
                return(
                    <NoProjects message={'No Past Project to show'}/>
               
                );
            }
        }
        else
        {
            return <></>
        }
     
       
    }

    render_arrow(variable:boolean)
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

    toggle_show_variable(variable:string)
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

       <HomeContext.Consumer>
           {(props)=>

                !props.loading ? 
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
                            
                                {this.render_active_projects(props.active_projects)}
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
                            {this.render_past_projects(props.past_projects)}
                        </div>
                    </div>
                    </>
                    : <Spinner size={50} position={'relative'}/>
                

           
           }
       </HomeContext.Consumer>
       

        </>
        );
    }
}


type StateType={
    active_projects_shown:boolean,
    past_projects_shown:boolean
};


interface PropsType extends RouteComponentProps
{

}


export default withRouter(Home);