import React, { Component } from 'react';
import Tags from '../../common/Tags';
import UserProvider from '../../../providers/UserProvider'

import DateComponent from '../../common/Date';

import { ProjectType } from "../../../backend/common/ProjectType";
import { ContextType, ProjectContext } from '../../../backend/student/ProjectProvider';
import { showLoadingAlert, yesNoAlert } from '../../../services/AlertService';
import { RouteComponentProps,withRouter } from 'react-router';


import Fade from 'react-reveal/Fade';

class Project extends Component<IProps,IState>
{
    
    componentDidMount()
    {
        if(!this.props.project)
        { 
            this.props.history.replace('/student/not-found');
            
        }
    }

    submit_application(props:ContextType)
    {
        yesNoAlert('Confirmation','Are you sure you want to proceed?','Yes','No','warning')
        .then((res)=>{
            if(res && this.props.project)
            {
                showLoadingAlert();
                props.submit_application(this.props.project.uuid_field);
            }
        })
    }

    clickHandler(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) 
    {
        event.preventDefault();
        this.props.history.goBack();
    }

    render_button(cv_null:boolean)
    {
        if(!cv_null && this.props.project && !this.props.project.applied)
        {
            return(
                <ProjectContext.Consumer>
                    {(props)=>
                        <button 
                        disabled={props.submitted} 
                        onClick={()=>this.submit_application(props)} 
                        className="btn btn-mystyle">
                            {props.submitted ? 
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                                </div>
                                :
                                'Submit'
                                }
                        </button>
                    }
                </ProjectContext.Consumer>
            ) 
        }
        else
        {
            if(cv_null)
            {
                return(
                <button className="btn btn-mystyle" disabled={true}>Please submit your resume</button>
                );
            }
            else
            {
                return (
                    <button className="btn btn-mystyle" disabled={true}>Already Applied</button>
                );
            }
        }
        
    }


    render()
    {
        if(this.props.project)
        {    
            let cv_null=this.context.user.cv === null;
            return(
                <>
                <title>{this.props.project.title}</title>

            <div className="main-wrap">
                <div className="wrap-two" style={{backgroundColor:'#2a2a72',backgroundImage:'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'}}>
                
                    <div className="w3-container">
                    <button className="w3-button w3-xlarge" onClick={(event)=>this.clickHandler(event)} >
                        <i className="fas fa-angle-left" style={{color:'white'}} title="Back"></i>
                    </button>
        

                        <h1 className="heading">{this.props.project.title}</h1>
                    </div>
                </div>

                <Fade bottom>
                
                <div className="w3-container mt-2 text-center">

                    <div className="w3-container" style={{marginBottom:'6%'}}> 
                        <div className="w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                            <h1>Description</h1>
                            <p>{this.props.project.description}</p>
                        </div>
                        <div className="w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                            <h1>Faculty In-charge</h1>
                            <p><b>Name:</b> {this.props.project.faculty.first_name} {this.props.project.faculty.last_name}</p>
                            <p><b>Department:</b> {this.props.project.faculty.department}</p>
                            {this.props.project.faculty.profile_picture ? <img alt="" src={this.props.project.faculty.profile_picture}/>:<></>}
                        </div>
                        <div className="w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                            <h1>Other Details</h1>
                            <p><b>Start Date:</b><DateComponent date={this.props.project.start_date} locale={'en-GB'} year={'numeric'} day={'numeric'} month={'long'}/></p>
                            <p><b>End Date:</b> <DateComponent date={this.props.project.end_date} locale={'en-GB'} year={'numeric'} day={'numeric'} month={'long'}/></p>
                        </div>
                    <hr/>

                    <p className="text-center para-content text-left"><Tags tag_string={this.props.project.tags} bootstrap_color={'info'}/></p><br/>
                    
                    <div className="text-center mt-3">
                        {this.render_button(cv_null)}
                           
                    </div>


                    
                    </div>
                    
                </div>
                </Fade>

                
            </div>
                </>
            );
       }

       else
       {
           return(
               <></>
           );
       }
        
    }

}

Project.contextType=UserProvider;


type IState={
    
}

interface IProps extends RouteComponentProps<{}>
{
    project:ProjectType |undefined;

}



export default withRouter(Project);



