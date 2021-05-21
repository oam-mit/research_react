import { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ProjectType } from "../common/ProjectType";
import {
	showErrorAlert,
	showNetworkError,
	showSuccessAlert,
} from "../../services/AlertService";
import UserProvider from "../../providers/UserProvider";
import instance from "./axiosInstance";

class ProjectProvider extends Component<IProps, ContextType> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			loading: true,
			projects: [],
			department_slug: this.props.match.params.department_slug,
			submitted: false,
			submit_application: this.submit_application,
		};
	}

	componentDidMount() {
		type DataType = {
			status: "slug does not exist" | "successful";
			projects: Array<ProjectType>;
		};
		instance
			.get(`get_projects/${this.state.department_slug}/`)
			.then(({ data }: { data: DataType }) => {
				if (data.status === "slug does not exist") {
					this.props.history.replace("/student/not-found");
				} else {
					this.setState({
						loading: false,
						projects: data.projects,
					});
				}
			})
			.catch(() => {
				showNetworkError();
				this.setState({
					loading: false,
				});
			});

		this.props.toggleNavbar(false);
	}

	redirect_to_department = () => {
		this.props.history.replace(
			`/student/department/${this.state.department_slug}`
		);
	};

	submit_application = (uuid_field: string) => {
		type DataType = {
			status: "successful" | "unsuccessful";
			error: string;
		};
		this.setState(
			{
				submitted: true,
			},
			() => {
				let form_data = new FormData();
				form_data.append("project_uuid_field", uuid_field);

				instance
					.post("submit_application/", form_data)
					.then(({ data }: { data: DataType }) => {
						if (data.status === "successful") {
							showSuccessAlert(
								"Application Submitted Successfully",
								this.redirect_to_department
							);
						} else {
							this.setState({
								submitted: false,
							});
							showErrorAlert(data.error);
						}
					});
			}
		);
	};

	componentWillUnmount() {
		this.props.toggleNavbar(true);
	}

	render() {
		return (
			<ProjectContext.Provider value={this.state}>
				{this.props.children}
			</ProjectContext.Provider>
		);
	}
}

ProjectProvider.contextType = UserProvider;

export default withRouter(ProjectProvider);

export type ContextType = {
	loading: boolean;
	projects: Array<ProjectType>;
	department_slug: string;
	submitted: boolean;
	submit_application: (uuid_field: string) => void;
};

interface IProps
	extends RouteComponentProps<{ uuid_field: string; department_slug: string }> {
	toggleNavbar: (value: boolean) => void;
}

export const ProjectContext = createContext<ContextType>({
	loading: true,
	projects: [],
	department_slug: "",
	submitted: false,
	submit_application: (uuid_field: string) => {},
});
