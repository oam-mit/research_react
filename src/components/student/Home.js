import React from 'react';
import { Component } from 'react';
import departments from '../../temporary/departments';
import TopButton from './TopButton';
import '../../assets/home.css';
import logo from '../../assets/iste_logo.png';

import Footer from './Footer';

class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            departments:departments

        };
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
     
    }

    render_departments()
    {
        let department_output=this.state.departments.map((department)=>{
            return(
           
                <div className="col-lg-3" key={department.pk}>
                    <div className="card department-card-design" data-aos="fade-up" data-aos-duration="500" data-aos-delay="400" 
                    onClick={()=>this.props.history.push(`/student/department/${department.slug}`)} 
                    style={{cursor:'pointer'}}>
                        <div className="text-content">
                            <span className="department-card-design-title"><strong>{department.name}</strong></span>
                            <p className="department-card-design-p">{department.description}</p>

                        </div>
                    </div>
                </div>
                
           

            );
        });

        return department_output;
    }
    
    render()
    {
        return(
            <>
            <title>Home</title>
            <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                <h3 className="display-1" id="jumbo-text">Welcome to the Research Portal!</h3>
                <p className="lead my-4" style={{fontFamily:'Quicksand'}}>Finding projects finally made easy!</p>
            </div>
            <div className="container section-title-1 text-center m-auto">
                <h1 className="m-auto">Projects sorted department wise!</h1>
            </div>
            <hr/>
            <div className="container-fluid">
                <div className="row">
                    {this.render_departments()}
                </div>
            </div>

            <div className="services-section">
                <div className="inner-width">
                <h1 className="section-title">Features</h1>
                <div className="border"></div>
                <div className="services-container">

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-paint-brush"></i>
                        </div>
                        <div className="service-title">Upload CV</div>
                        <div className="service-desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
                        </div>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-code"></i>
                        </div>
                        <div className="service-title">All in one place</div>
                        <div className="service-desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
                        </div>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-brush"></i>
                        </div>
                        <div className="service-title">Separate Departments</div>
                        <div className="service-desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
                        </div>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-object-ungroup"></i>
                        </div>
                        <div className="service-title">Your Profile</div>
                        <div className="service-desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
                        </div>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-database"></i>
                        </div>
                        <div className="service-title">Connect with Professors</div>
                        <div className="service-desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
                        </div>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fab fa-android"></i>
                        </div>
                        <div className="service-title">Another Feature</div>
                        <div className="service-desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eaque ratione rem porro, nihil.
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="container info-section">
    <div className="row m-auto">
        <div className="col-lg-5">
            <img  src={logo} alt="logo" className="m-auto" width="300"/>
        </div>
        <div className="col-lg-6 m-auto"data-aos="fade-left"
        data-aos-offset="300" data-aos-duration="800"
        data-aos-easing="ease-in-sine">
            <h1 className="sub-text">
                Indian Society for Technical Education, Manipal
            </h1>
<p className="style-text">This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. </p>
        </div>
        <hr style={{border:"1px solid rgb(58, 57, 57)",width:"100%",margin:"5%"}}/>
        <div className="col-lg-5 m-auto d-lg-none">
          <img  src="https://images.shiksha.com/mediadata/images/1602828916phpIjgYq2.jpeg" alt="logo" className="m-auto d-lg-none"/>

      </div>
        <div className="col-lg-6 m-auto"data-aos="fade-right"
        data-aos-offset="300" data-aos-duration="800"
        data-aos-easing="ease-in-sine">
              <h1 className="sub-text">
                Manipal Insitute of Technology
            </h1>
            <p className="style-text">This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. This is a text about the vision for research portal and the working on the project. </p>

        </div>

        <div className="col-lg-5 m-auto d-none d-lg-block images-mobile">
            <img  src="https://images.shiksha.com/mediadata/images/1602828916phpIjgYq2.jpeg" alt="logo" className="m-auto d-none d-lg-block images-mobile"/>

        </div>
    </div>
</div>

           
            <TopButton/>
            <Footer/>
           
            </>
        );
    }
}

export default Home;