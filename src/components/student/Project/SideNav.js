import React, { Component } from "react";



class SideNav extends Component
{
    render_projects()
    {
        let project_names=this.props.projects.map((project)=>{
            if(this.props.selected_project===project.pk)
            {
                return(
                    <span className="w3-bar-item w3-button w3-green" key={project.pk}>{project.name}</span>
                );
            }
            else
            {
                return(
                    <span 
                    onClick={()=>{
                        console.log('selected');
                        this.props.select_project(project.pk);
                    }}
                     className="w3-bar-item w3-button" key={project.pk}>{project.name}</span>
                );
            }
        });

        return project_names;
    }

    render() {
      return (
        <div className="w3-sidebar w3-bar-block w3-collapse w3-card" style={{width:'20%'}} id="mySidebar">
        <div className="w3-bar w3-dark-grey">
            <div className="w3-bar-item w3-padding-16">
                    Other Projects from this Department
            </div>

        </div>
        {this.render_projects()}
    </div>
      )
    };
}

export default SideNav;