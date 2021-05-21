import React, { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { showNetworkError } from "../../services/AlertService";
import { ProjectType } from "../common/ProjectType";
import instance from "./axiosInstance";

export const DepartmentContext = createContext<ContextType>({
	loading: true,
	projects: [],
	department_name: null,
	department_slug: null,
});

class DepartmentProvider extends Component<PropsType, ContextType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			loading: true,
			projects: [],
			department_name: null,
			department_slug: this.props.match.params.department_slug,
		};
	}

	componentDidMount() {
		type DataType = {
			status: "successful" | "slug does not exist";
			department_name: string;
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
						department_name: data.department_name,
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
	}

	render() {
		return (
			<DepartmentContext.Provider value={this.state}>
				{this.props.children}
			</DepartmentContext.Provider>
		);
	}
}

export default withRouter(DepartmentProvider);

type ContextType = {
	loading: boolean;
	projects: Array<ProjectType>;
	department_name: string | null;
	department_slug: string | null;
};

interface PropsType extends RouteComponentProps<{ department_slug: string }> {}
