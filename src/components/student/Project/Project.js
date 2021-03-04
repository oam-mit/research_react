import React, { Component } from 'react';
import Tags from '../../common/Tags';
import UserProvider from '../../../providers/UserProvider'

import DateComponent from '../../common/Date';

class Project extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            submitted:false,
            already_submitted:false
        }
    }
    

    submit_application()
    {
        this.setState({
            submitted:true
        },()=>{

            let form_data=new FormData();
            form_data.append('project_uuid_field',this.props.project.uuid_field);

            fetch('/student/api/submit_application/',{
                'method':'POST',
                'body':form_data,
                'headers':{'X-CSRFToken':this.context.getCookie('csrftoken')}
            })
            .then((resp)=>resp.json())
            .then((data)=>{
                if(data.status==='successful')
                { 
                    this.props.redirect_to_department();

                }
                else
                {
                    this.setState({
                        submitted:false
                    },()=>{
                        alert(data.error)
                    })
                }
    
            })
            .catch((err)=>{
                console.log(err);
            });

            
        });
        
    }
    componentDidMount()
    {
        if(!this.props.project)
        { 
            this.props.redirect_404();
            
        }
    }

    render_button(cv_null)
    {
        console.log(cv_null);
        if(!cv_null && !this.props.project.applied)
        {
            return(
                <button disabled={this.state.submitted} onClick={()=>this.submit_application()} className="btn btn-mystyle">{this.state.submitted ? <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>:'Submit'}</button>
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
                
                <div className="w3-container mt-2 w3-animate-bottom text-center">

                    <div className="w3-container" style={{marginBottom:'6%'}}> 
                        <div className="w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                            <h1>Description</h1>
                            <p>{this.props.project.description}</p>
                        </div>
                        <div className="w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
                            <h1>Faculty In-charge</h1>
                            <p><b>Name:</b> {this.props.project.faculty.first_name} {this.props.project.faculty.last_name}</p>
                            <p><b>Department:</b> {this.props.project.faculty.department}</p>
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

    clickHandler(event) {
        event.preventDefault();
        this.props.goBack();
    }
}
Project.contextType=UserProvider
export default Project;