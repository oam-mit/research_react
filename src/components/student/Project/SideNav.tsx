import React, { Component } from "react";
import { ProjectType } from "../../../backend/student/DepartmentProvider";

class SideNav extends Component<PropsType>
{
    render_projects()
    {
        let project_names=this.props.projects.map((project)=>{
            if(this.props.selected_project===project.uuid_field)
            {
                return(
                    <li className="active" key={project.uuid_field}><a href="/" onClick={(event)=>event.preventDefault()}>{project.title}</a></li>
                );
            }
            else
            {
                return(
                    <li key={project.uuid_field}><a href="/"  onClick={(event)=>{
                      event.preventDefault();
                      this.props.select_project(project.uuid_field);
                  }}>{project.title}</a></li>
                );
            }
        });

        return project_names;
    }

    render() {
      return (
        <main className="main ">
        
        <aside className="sidebar d-lg-block d-none">
        <header>
            <h2 className="header">Other projects from the dept</h2>
            <hr></hr>
        </header>
       
          <nav className="nav">
            <ul>
              {this.render_projects()}
            </ul>
          </nav>
        </aside>
      
      </main>
      
      )
    };
}

export default SideNav;

type PropsType={
  projects:Array<ProjectType>,
  selected_project:string,
  department_slug:string,
  select_project:(project_uuid:string)=>void
}

