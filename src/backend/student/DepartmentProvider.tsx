import React, { Component, createContext } from 'react';
import { RouteComponentProps,withRouter } from 'react-router';
import { FacultyType } from '../common/CommonTypes';


export const DepartmentContext= createContext<ContextType>({
    loading:true,
    projects:[],
    department_name:null,
    department_slug:null
});

class DepartmentProvider extends Component <PropsType,ContextType>
{
    constructor(props:PropsType)
    {
        super(props);
        this.state={
            loading:true,
            projects:[],
            department_name:null,
            department_slug:this.props.match.params.department_slug,
        };
    }

    componentDidMount()
    {
        
        fetch(`/student/api/get_projects/${this.state.department_slug}/`)
        .then((resp)=>resp.json())
        .then((data)=>{
           
            if(data.status==='slug does not exist')
            {
                this.props.history.replace('/student/not-found');
            }
            else
            {
                this.setState({
                    loading:false,
                    department_name:data.department_name,
                    projects:data.projects
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render()
    {
        return(
            <DepartmentContext.Provider value={this.state}>
                {this.props.children}
            </DepartmentContext.Provider>
        );
    }
}

export default withRouter(DepartmentProvider);

type ContextType={
    loading:boolean,
    projects:Array<ProjectType>,
    department_name:string | null,
    department_slug:string | null
}

export type ProjectType={
    uuid_field:string,
    title:string,
    description:string,
    faculty:FacultyType
    applied:boolean,
    tags:string,
    max_students:number,
    start_date:string,
    end_date:string,
    is_active:boolean

}

interface PropsType extends RouteComponentProps<{department_slug:string}>
{

}