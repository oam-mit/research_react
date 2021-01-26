import React, { Component } from 'react';
import user from '../../temporary/user_details'
import '../../assets/edit_prof.css';

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isLoaded:false,
            student:null,
            is_editable:false,
            cv:null
        }

        this.changeHandler=this.changeHandler.bind(this);
    }

    componentDidMount()
    {
        //code for fetching details

        this.setState({student:user,isLoaded:true,edit_details:user})
    }

    render_display()
    {
        if(this.state.isLoaded)
        {
            return(
            <>
            <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                <h3 className="display-1" id="jumbo-text">{this.state.student.first_name} {this.state.student.last_name}</h3>
                <p className="lead my-4" style={{fontFamily:'Quicksand'}}>
                    Welcome to the research portal!
                </p>
                <br/>
            </div>
            {this.render_edit_detials()}

            </>
            );

        }

    }

    changeHandler(event)
    {
        this.setState((prev)=>{
            return({
                edit_details:{
                    ...prev.edit_details,
                    [event.target.name]:event.target.value
                }
            })
        });


    }

    cvUploadChangeHandler(event)
    {
        this.setState({
            cv:event.target.files[0]
        });
    }

    render_edit_detials()
    {
            return(
                <div className="container prof_details">
                <div className="row">
                  <div className="col-lg-7 details_prof">
                    <span className="sub_text">About me</span>
                    <span className="icon-edit" onClick={()=>this.setState((prev)=>{
                        return(
                            {is_editable:!prev.is_editable}
                        );
                    })}>
                      <svg
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        className="bi bi-pencil-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                        />
                      </svg>
                    </span>
                    <br />
                    <div className="wrap_details">
                        <form> 
                            <fieldset disabled={!this.state.is_editable}>
                                <legend>Details</legend>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text" name="first_name" className={`form-control${!this.state.is_editable ? '-plaintext': ''}`} id="first_name" value={this.state.edit_details.first_name} onChange={this.changeHandler} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input type="text" name="last_name" className={`form-control${!this.state.is_editable ? '-plaintext': ''}`} id="last_name" value={this.state.edit_details.last_name} onChange={this.changeHandler}/>
                                    </div>
                                </div>
                                { this.state.is_editable ? <button type="submit" className="btn btn-primary">Submit</button> : <></>}
                            </fieldset>
                        </form>
                    </div>
                    
                  </div>
                  <div className="col-lg-5">
                        <form>
                        <legend>Upload CV</legend>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customFile" onChange={(event)=>this.cvUploadChangeHandler(event)} accept="application/pdf"/>
                                <label className="custom-file-label" htmlFor="customFile">{this.state.cv ? <>Chosen file: {this.state.cv.name}</>: <>Upload File</>}</label>
                            </div>

                        </form>
                  </div>
                </div>
              </div>
            );

    }
    render()
    {
        return(
            <>
            <title>Faculty | Profile</title>
            {this.render_display()}
            </>
        );
    }
}

export default Profile;