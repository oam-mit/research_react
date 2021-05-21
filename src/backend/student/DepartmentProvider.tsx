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
	filter: () => {},
});

class DepartmentProvider extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			loading: true,
			projects: [],
			department_name: null,
			department_slug: this.props.match.params.department_slug,
			_projects: [],
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
						_projects: data.projects,
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

	private filter = (tags: Array<string>) => {
		if (tags.length === 0) {
			this.setState({
				projects: this.state._projects,
			});
		} else {
			let result_set = new Set<ProjectType>();

			for (let i = 0; i < tags.length; i++) {
				//console.log(tags[i]);
				this.state._projects.map(project => {
					if (project.tags.includes(tags[i])) {
						result_set.add(project);
					}
					return null;
				});
			}

			this.setState({
				projects: Array.from(result_set),
			});
		}
	};

	render() {
		return (
			<DepartmentContext.Provider
				value={{
					loading: this.state.loading,
					projects: this.state.projects,
					department_name: this.state.department_name,
					department_slug: this.state.department_slug,
					filter: this.filter,
				}}
			>
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
	filter: (tags: Array<string>) => void;
};

type StateType = {
	loading: boolean;
	projects: Array<ProjectType>;
	department_name: string | null;
	department_slug: string | null;
	_projects: Array<ProjectType>;
};

interface PropsType extends RouteComponentProps<{ department_slug: string }> {}
