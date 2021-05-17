import { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import UserProvider from "../../providers/UserProvider";
import { showErrorAlert, showLoadingAlert, showNetworkError, showSuccessAlert, yesNoAlert } from "../../services/AlertService";

export type ContextType={
    submitted:boolean,
    submit_data:(data:SubmitDataType)=>void
};

export type SubmitDataType={
    title:string,
    description:string,
    tags:string,
    is_department_specific:boolean,
    max_students:number,
    start_date:string,
    end_date:string
}

interface PropsType extends RouteComponentProps<{}>
{

}



export const ProjectAddContext = createContext<ContextType>({
    submitted:false,
    submit_data:()=>{}
});



class ProjectAddProvider extends Component <PropsType,ContextType>
{

    constructor(props:PropsType)
    {
        super(props);

        this.state={
            submitted:false,
            submit_data:this.submit_data
        }
    }

    submit_data=(data:SubmitDataType)=>{
        console.log(data);
        yesNoAlert('Confirmation','Are you sure you want to publish the proeject?','Yes','Cancel','warning')
        .then(value=>{

            if(value)
            {
                showLoadingAlert();
                this.setState({
                    submitted:true
                },()=>{
                    fetch('/faculty/api/submit_project/',{
                        'method':'POST',
                        'body':JSON.stringify(data),
                        'headers':{
                            'X-CSRFToken':this.context.getCookie('csrftoken'),
                            'Content-Type':'application/json'
                        }
                    })
                    .then(resp=>resp.json())
                    .then(data=>{
                        if(data.status==='successful')
                        {
                            showSuccessAlert('Project Saved Successfully',()=>this.props.history.push('/faculty/home'))

                        }
                        else
                        {
                           showErrorAlert(data.error);
                        }

                    })
                    .catch(()=>{
                        this.setState({
                            submitted:false,
                        })
                        showNetworkError();
                    })
                })
            }

        });
    }

    render()
    {
        return(
            <ProjectAddContext.Provider value={this.state}>
                {this.props.children}
            </ProjectAddContext.Provider>
        );
    }

}

ProjectAddProvider.contextType=UserProvider;

export default withRouter(ProjectAddProvider);