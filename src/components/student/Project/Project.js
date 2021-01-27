import React, { Component } from 'react';


class Project extends Component
{
    // constructor(props)
    // {
    //     super(props);


        
    // }

    render()
    {
        return(
            <>
            <title>{this.props.project.name}</title>

        <div class="main-wrap">
    <div class="wrap-two" style={{backgroundColor:'#2a2a72',backgroundImage:'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'}}>
            
                <div class="w3-container ">
                <button class="w3-button w3-xlarge" onClick={(event)=>this.clickHandler(event)} ><i class="fas fa-angle-left" style={{color:'white'}} title="Back"></i></button>
       

                    <h1 class="heading">{this.props.project.name}</h1>
                </div>
            </div>
            
            <div class="w3-container mt-2 w3-animate-bottom text-center">

    <div class="w3-container" style={{marginBottom:'6%'}}> 
      <p class="detail-content text-left"> <span class="detail-content-main">Professor In charge: </span> XYZ</p>
      <p class="detail-content text-left"> <span class="detail-content-main">Dates: </span> Today </p>
      <hr/>

       <p class="para-content text-left">{this.props.project.description}</p><br/>


     
    </div>
    <button class="btn btn-mystyle ">Apply</button>
  </div>

            
        </div>
            </>
        );
    }

    clickHandler(event) {
        event.preventDefault();
        this.props.goBack();
    }
}

export default Project;