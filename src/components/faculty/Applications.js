import React, { Component } from 'react';
import Spinner from '../common/Spinner';

class Applications extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isAllowed:false,
            applications:null,
            loading:true,
            project_name:null
        }
    }

    componentDidMount()
    {
        //code for fetching applications

        fetch(`/faculty/api/get_applicants/${this.props.match.params.project_uuid}`)
        .then((resp)=>resp.json())
        .then((data)=>{
            if(data.status==='successful')
            {
                this.setState({
                    applications:data.applications,
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

    render_applications()
    {
        if(!this.state.loading)
        {
            if(this.state.isAllowed)
            {
                return(
                    
                     <table className="table table-bordered table-style table-scroll">
                        <thead>
                            <tr className="color-custom">
                                <th scope="col">Registration Number</th>
                                <th scope="col">Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">View CV</th>
                                <th scope="col">Email ID</th>
                                <th scope="col">Active/Inactive</th>
                               
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
                                        <th><a href={`mailto:${applicant.email}`}>Status</a></th>
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
                <h3 className="display-1" id="jumbo-text">Student Information for {this.state.project_name}</h3>
            </div>
            <div className="container">
                <div className="table-scroll">
                    {this.render_applications()}
                </div>
            </div>
            
            </>
        );

    }
}

export default Applications;