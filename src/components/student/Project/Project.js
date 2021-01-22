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

        <div class="w3-main" style={{marginLeft:'20%'}}>

            <div class="w3-teal" style={{backgroundColor:'#2a2a72',backgroundImage:'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'}}>
            
                <div class="w3-container ">
                <button class="w3-button w3-xlarge" onClick={(event)=>this.clickHandler(event)} ><i class="fas fa-angle-left" style={{color:'white'}} title="Back"></i></button>
                    <h1>{this.props.project.name}</h1>
                </div>
            </div>
            
            <div class="w3-container mt-2 w3-animate-bottom">
            <div class="w3-card-4">
    <header class="w3-container">
      <h3>{this.props.project.name}</h3>
    </header>
    <div class="w3-container">
      <p>Professor In charge: XYZ</p>
      <hr/>
      <p>{this.props.project.description}</p><br/>
    </div>
    <button class="w3-button w3-block w3-dark-grey">Apply</button>
  </div>
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