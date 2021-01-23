import React, { Component } from 'react';
import user from '../../temporary/user_details';
import '../../assets/profile.css';

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            user:user

        };

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    
    }

    render() 
    {
      return (
        <>
            <title>Your Profile</title>
            <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                <h1 className="display-1" id="jumbo-text">Your Profile</h1>
            </div>
            <div className="container-fluid text-center mx-lg-5" style={{marginTop:'10%'}}>
 <div className="row">
     <div className="col-lg-6 col-sm-5" >
         <div className="details text-left" id="font-mobile">
             <p> <b>Name: </b> Insha Manowar</p>
             <p> <b>Registration Number: </b> 190906184</p>
             <p> <b>Branch: </b> Electrical and Electronics Engineering</p>
         </div>
        <div className="buttons">
            <a href="/" className="btn btn-primary my-sm-3">Edit Details</a>
            <a href="/" className="btn btn-primary">Applied Projects</a>
        </div>

     </div>
     <div className="col-lg-4 col-sm-12" >
         <div className="uploads" id="font-mobile">
            <div className="mb-2">
                <label htmlFor="formFile" className="form-label">Choose file or drag to upload CV</label>
                <input className="form-control" type="file" id="formFile"/>
              </div>             
              <a href="/" className="btn btn-primary">Save</a>
             
         </div>

     </div>
    
 </div>
    </div>
        </>

      )
    };

}


export default Profile;