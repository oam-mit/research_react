import { Component, createContext } from "react";
import { FacultyType } from "../common/CommonTypes";

export const ApplicationContext= createContext<ApplicationContextType>({
    loading:true,
    projects:[]
});

class ApplicationProvider extends Component <{},ApplicationContextType>
{
    constructor(props:any)
    {
        super(props);
        this.state={
            loading:true,
            projects:[]
        }

    }

    componentDidMount()
    {
        fetch('/student/api/get_applied_projects/')
        .then((resp)=>resp.json())
        .then((data)=>{
            this.setState({
                loading:false,
                projects:data.projects
            })
        })
        .catch(err=>console.log(err))
    }

    render()
    {
        return(
            <ApplicationContext.Provider value={this.state}>
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
}

export default ApplicationProvider;


export interface ApplicationProjectType{

    uuid_field: string;
    title: string;
    start_date: string;
    end_date: string;
    faculty: FacultyType;
    department_slug: string;
    status: "applied" | "accepted" | "rejected";
}

type ApplicationContextType={
    loading:boolean,
    projects:Array<ApplicationProjectType>
}
