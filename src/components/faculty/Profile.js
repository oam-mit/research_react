import React, { Component } from 'react';
import faculty from '../../temporary/faculty'
import '../../assets/edit_prof.css';

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isLoaded:false,
            faculty:null,
            is_editable:false,
        }

        this.changeHandler=this.changeHandler.bind(this);
    }

    componentDidMount()
    {
        //code for fetching details

        this.setState({faculty:faculty,isLoaded:true,edit_details:faculty})
    }

    render_display()
    {
        if(this.state.isLoaded)
        {
            return(
            <>
            <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                <h3 className="display-1" id="jumbo-text">{this.state.faculty.designation}. {this.state.faculty.first_name} {this.state.faculty.last_name}</h3>
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
                    [event.target.name]:event.target.vale
                }
            })
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
                          fill-rule="evenodd"
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
                                    <div className="col-md-2 mb-3">
                                        <label for="designation">Designation</label>
                                        <input type="text" name="designation" className={`form-control${!this.state.is_editable ? '-plaintext': ''}`} id="designation" value={this.state.edit_details.designation} onChange={this.changeHandler}/>
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label for="first_name">First Name</label>
                                        <input type="text" name="first_name" className={`form-control${!this.state.is_editable ? '-plaintext': ''}`} id="first_name" value={this.state.edit_details.first_name} onChange={this.changeHandler} />
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" name="last_name" className={`form-control${!this.state.is_editable ? '-plaintext': ''}`} id="last_name" value={this.state.edit_details.last_name} onChange={this.changeHandler}/>
                                    </div>
                                </div>
                                { this.state.is_editable ? <button type="submit" className="btn btn-primary">Submit</button> : <></>}
                            </fieldset>
                        </form>
                    </div>
                    
                  </div>
                  <div className="col-lg-5">
                    <div className="profile-image">
                      <img
                        className="img-responsive profile_image"
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8041e6ce-6445-45c3-91aa-0fc71cb86551/ddv71b9-2f099983-525a-4c1c-832a-f6fc9c26d81a.png/v1/fill/w_999,h_800,q_70,strp/baby_toucan_by_beastmother_ddv71b9-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MjAiLCJwYXRoIjoiXC9mXC84MDQxZTZjZS02NDQ1LTQ1YzMtOTFhYS0wZmM3MWNiODY1NTFcL2RkdjcxYjktMmYwOTk5ODMtNTI1YS00YzFjLTgzMmEtZjZmYzljMjZkODFhLnBuZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.yijYZBz8N5D36EcoV5AG25UTu1TeTE7ONkYXByYthTY"
                        width="400"
                        alt="Profile_image"
                      />
                      <div className="btn edit-btn my-4">Change</div>
                    </div>
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