import { Component } from "react";
import { createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { showNetworkError } from "../../services/AlertService";
import instance from "./axiosInstance";
import { ApplicantType } from "./types/ApplicantType";

export type ContextType = {
	isAllowed: boolean;
	applications: Array<ApplicantType>;
	loading: boolean;
	project_title: string;
	//project_uuid:string
};

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

export const AcceptedApplicationsContext = createContext<ContextType>({
	isAllowed: false,
	applications: [],
	loading: false,
	project_title: "",
	//project_uuid:''
});

class AcceptedApplicationsProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			isAllowed: false,
			applications: [],
			loading: true,
			project_title: "",
			//project_uuid:this.props.match.params.project_uuid
		};
	}

	componentDidMount() {
		type DataType = {
			applications: Array<ApplicantType>;
			title: string;
			status: "successful" | "unsuccessful";
		};

		instance
			.get(`get_accepted_applicants/${this.props.match.params.project_uuid}`)
			.then(({ data }: { data: DataType }) => {
				if (data.status === "successful") {
					this.setState({
						applications: data.applications,
						project_title: data.title,
						loading: false,
						isAllowed: true,
					});
				} else {
					this.setState({
						loading: false,
					});
				}
			})
			.catch(() => {
				showNetworkError();
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		return (
			<AcceptedApplicationsContext.Provider value={this.state}>
				{this.props.children}
			</AcceptedApplicationsContext.Provider>
		);
	}
}

export default withRouter(AcceptedApplicationsProvider);
