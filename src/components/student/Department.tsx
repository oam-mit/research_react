import React, {useContext } from 'react';
import Footer from './Footer'
import Spinner from '../common/Spinner';
import DepartmentCard from '../../widgets/student/DepartmentCard';
import {DepartmentContext} from '../../backend/student/DepartmentProvider';
import {ProjectType} from '../../backend/student/DepartmentProvider';

const Department = ()=>{

    const render_projects=(projects:ProjectType[],department_slug:string|null)=>
    {
        if(projects.length>0)
        {  
            let projects_temp=projects.map((project)=>
                <DepartmentCard 
                key={project.uuid_field}
                project={project} 
                department_slug={department_slug}/>
            );

            return projects_temp;
        }
        else
        {
            return(
                <div className="col-12 text-center">
                    <h3>No Projects to show under this department</h3>

                </div>
            );
        }
    }

    let state = useContext(DepartmentContext);

    if (state.loading)
    {
        return(
            <Spinner size={100} position={'absolute'}/>
        );

    }
    else
    {
        return(
            <>
                <title>{state.department_name}</title>
                <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
                    <h3 className="display-1" id="jumbo-text">{state.department_name}</h3>
                    <p className="lead my-4" style={{fontFamily:'Quicksand'}}>Projects related to that department !</p>
                </div>

                <div className="container-fluid ">
                    <div className="row" >
                        {render_projects(state.projects,state.department_slug)}
                    </div>
                </div>

                {state.projects.length>0? <Footer/>:<></>}
            </>
        );
    }
}
export default Department;