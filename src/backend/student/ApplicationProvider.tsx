import { Component, createContext } from "react";
import { showNetworkError } from "../../services/AlertService";
import { FacultyType } from "../common/UserTypes";
import instance from "./axiosInstance";

export const ApplicationContext = createContext<ApplicationContextType>({
	loading: true,
	projects: [],
});

class ApplicationProvider extends Component<{}, ApplicationContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			projects: [],
		};
	}

	componentDidMount() {
		type DataType = {
			projects: Array<ApplicationProjectType>;
		};
		instance
			.get("get_applied_projects/")
			.then(({ data }: { data: DataType }) => {
				this.setState({
					projects: data.projects,
					loading: false,
				});
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
			<ApplicationContext.Provider value={this.state}>
				{this.props.children}
			</ApplicationContext.Provider>
		);
	}
}

export default ApplicationProvider;

export interface ApplicationProjectType {
	uuid_field: string;
	title: string;
	start_date: string;
	end_date: string;
	faculty: FacultyType;
	department_slug: string;
	status: "applied" | "accepted" | "rejected";
}

type ApplicationContextType = {
	loading: boolean;
	projects: Array<ApplicationProjectType>;
};
