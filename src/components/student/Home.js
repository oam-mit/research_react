import React from 'react';
import { Component } from 'react';
import departments from '../../temporary/home_projects';
import TopButton from './TopButton';


class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            departments:departments

        };
     
    }

    render_projects(department)
    {
        let projects=department.projects.map((project)=>{
            return(
                <>
                <div className="col-lg-3 mt-2" key={project.pk+100}>
                    <div className="card">
                        <div className="card_image">
                            <img className="image-fluid" src="https://picsum.photos/500/300/?image=14" alt={project.title}/>

                        </div>
                        <div className="card_content text-center">
                            <h2 className="card_title">{project.title} </h2>
                            <p className="card_text">{project.text} </p>
                            <button className="btn card_btn">Read More</button>
                        </div>
                </div>
            </div>
            </>

            );
        });

        return projects;
    }



    render_departments()
    {
        let output = departments.map((department)=>{
            return(
                <div className="container-fluid" key={department.pk}>
                     <div className="row">
                        <div className="col-12 ">
                            <h1 id="sub-text">{department.department}</h1>
                        <div className="container-fluid custom-margin">
                        <div className="row">
                            {this.render_projects(department)}
                        </div>
                        </div>
                        </div>
                     </div>
                </div>
            );
        });

        return output;

    }
    render()
    {
        return(
            <>
            <title>Home</title>
            <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                <h1 className="display-1" id="jumbo-text">Research Project Portal</h1>
                <p className="lead my-4" style={{fontFamily:'Quicksand'}}>a website that connects you with a project of your choice!</p>
            </div>
            {this.render_departments()}
            <TopButton/>
           
            </>
        );
    }
}

export default Home;