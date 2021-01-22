import React, { Component } from 'react';
import applications from '../../temporary/applications'

class Applications extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isAllowed:null,
            applications:null,
            isLoaded:false,
            project_name:null
        }
    }

    componentDidMount()
    {
        //code for fetching applications

        this.setState({
            applications:applications,
            isLoaded:true,
            isAllowed:true,
            project_name:'Testing'
        });
    }

    render_applications()
    {
        if(this.state.isLoaded)
        {
            if(this.state.isAllowed)
            {
                return(
                    
                     <table className="table table-bordered">
                        <thead>
                            <tr className="color-custom">
                                <th scope="col">Registration Number</th>
                                <th scope="col">Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">View CV</th>
                                <th scope="col">Email ID</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.applications.map((applicant,index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope ="row">{applicant.registration_number}</th>
                                        <th>{applicant.first_name} {applicant.last_name}</th>
                                        <th>{applicant.branch}</th>
                                        <th><a href={applicant.cv} target="_blank" rel="noreferrer">Click Here</a></th>    
                                        <th><a href={`mailto:${applicant.email}`}>{applicant.email}</a></th>
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
                <div className="row">
                        <div className="col-12 text-center">
                            <h3>Loading...</h3>

                        </div>

                    </div>
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