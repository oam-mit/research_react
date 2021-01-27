import React, { Component } from "react";



class SideNav extends Component
{
    render_projects()
    {
        let project_names=this.props.projects.map((project)=>{
            if(this.props.selected_project===project.pk)
            {
                return(
                    <li className="active" key={project.pk}><a href="/" onClick={(event)=>event.preventDefault()}>{project.name}</a></li>
                );
            }
            else
            {
                return(
                    <li key={project.pk}><a href="/"  onClick={(event)=>{
                      event.preventDefault();
                      this.props.select_project(project.pk);
                  }}>{project.name}</a></li>
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
       
          <nav class="nav">
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
