import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Spinner from '../common/Spinner';
import {ACCEPTED,REJECTED} from '../common/ProjectStatus'
import UserProvider from '../../providers/UserProvider'


class Applications extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isAllowed:false,
            applications:null,
            loading:true,
            project_title:null
        }
    }

    componentDidMount()
    {
        //code for fetching applications
        this.fetch_applicants()
        
    }

    fetch_applicants()
    {
        fetch(`/faculty/api/get_applicants/${this.props.match.params.project_uuid}`)
        .then((resp)=>resp.json())
        .then((data)=>{
            if(data.status==='successful')
            {
                this.setState({
                    applications:data.applications,
                    project_title:data.title,
                    loading:false,
                    isAllowed:true
                })
            }

            else
            {
                this.setState({
                    loading:false
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    change_application_status(applicant,status,status_show)
    {
        Swal.fire({
            title:'Confirmation',
            text:`Are you sure you want to ${status_show} ${applicant.first_name} ${applicant.last_name}?`,
            icon:'warning',
            showCancelButton:true

        })
        .then((resp)=>{
            if(resp.value)
            {
                this.setState({
                    loading:true
                },()=>{
                    let form_data=new FormData();
                    form_data.append('student_email',applicant.email)
                    form_data.append('uuid_field',this.props.match.params.project_uuid)
                    form_data.append('status',status)
                    fetch('/faculty/api/application_change_status/',{
                        method:'POST',
                        body:form_data,
                        headers:{
                            'X-CSRFToken':this.context.getCookie('csrftoken'),
                        }
                    })
                    .then((resp)=>resp.json())
                    .then(data=>{
                        if(data.status==='successful')
                        {
                            this.fetch_applicants()
                           
                            Swal.fire({
                                    title:'Success',
                                    text:`${applicant.first_name} ${applicant.last_name} has been ${status}`,
                                    icon:'success'
                        
                            })
                          
                        }

                        else
                        {
                            this.setState({
                                loading:false
                            },()=>{
                                Swal.fire({
                                    title:'Error',
                                    text:data.error,
                                    icon:'error'
                        
                                })
                            })
                           
                        }
                    })
                })
            }
        })
    }

    render_applications()
    {
        if(!this.state.loading)
        {
            if(this.state.isAllowed)
            {
                return(
                    
                     <table className="table table-bordered table-style table-scroll">
                        <thead>
                            <tr className="bg-primary">
                                <th scope="col">Registration Number</th>
                                <th scope="col">Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">View CV</th>
                                <th scope="col">Email ID</th>
                                <th scope="col">Action</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.applications.map((applicant)=>{
                                return(
                                    <tr key={applicant.registration_number}>
                                        <th scope ="row">{applicant.registration_number}</th>
                                        <th>{applicant.first_name} {applicant.last_name}</th>
                                        <th>{applicant.department}</th>
                                        <th><a href={applicant.cv} target="_blank" rel="noreferrer" style={{color:'red'}}>Click Here</a></th>    
                                        <th><a href={`mailto:${applicant.email}`}>{applicant.email}</a></th>
                                        <th>
                                        <div className="dropdown show">
                                            <a className="btn btn-info dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                               Action
                                            </a>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <button onClick={()=>this.change_application_status(applicant,ACCEPTED,'accept')}  className="dropdown-item" >Accept</button>
                                                <button onClick={()=>this.change_application_status(applicant,REJECTED,'reject')} className="dropdown-item" >Reject</button>
                                            </div>
                                        </div>
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                     </table>
                );
            }
            else
            {
                return(
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3>You are not allowed to view this. If you think this is an error, kindly contact us.</h3>

                        </div>

                    </div>
                );
            }
        }

        else
        {
            return(
                <Spinner size={50} position={'relative'}/>
            );
        }
        
    }


    render()
    {
        return(
            <>
            <title>Applications</title>
            <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                <h3 className="display-1" id="jumbo-text">Pending Applicants</h3>
                <button onClick={()=>this.props.history.push(`/faculty/applications/accepted/${this.props.match.params.project_uuid}`)} className="btn-mystyle"><h5>View Accepted Applicants</h5></button>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="btn-grp dropdown show">
                        <a className="btn dropdown-toggle" href="/" role="button" id="dropdownMenuMakeInactive" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h5>{this.state.project_title}</h5>
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <button className="btn btn-danger" >Make Project Inactive</button>
                        </div>
                    </div>
                </div>
                <div className="table-scroll">
                
                    {this.render_applications()}
                </div>
            </div>
            
            </>
        );

    }
}

Applications.contextType=UserProvider

export default Applications;