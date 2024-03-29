import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "w3-css/w3.css";
import {
	ContextType,
	ProjectContext,
} from "../../../backend/student/ProjectProvider";
import Project from "./Project";
import SideNav from "./SideNav";

class ProjectRoot extends Component<IProps, StateType> {
	static getDerivedStateFromProps(props: IProps, state: StateType) {
		if (state.selected_project !== props.match.params.uuid_field) {
			return {
				...state,
				selected_project: props.match.params.uuid_field,
			};
		} else {
			return null;
		}
	}

	constructor(props: IProps) {
		super(props);
		this.state = {
			selected_project: this.props.match.params.uuid_field,
		};
	}

	select_project(project_uuid_field: string, props: ContextType) {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		this.props.history.push(
			`/student/${props.department_slug}/project/${project_uuid_field}`
		);
	}

	redirect_to_department() {
		this.props.history.replace(
			`/student/department/${this.props.match.params.department_slug}`
		);
	}

	return_project(props: ContextType) {
		for (let i = 0; i < props.projects.length; i++) {
			if (props.projects[i].uuid_field === this.state.selected_project)
				return props.projects[i];
		}
	}
	render() {
		return (
			<ProjectContext.Consumer>
				{props => (
					<>
						<SideNav
							projects={props.projects}
							selected_project={this.state.selected_project}
							department_slug={this.props.match.params.department_slug}
							select_project={(project_uuid_field: string) =>
								this.select_project(project_uuid_field, props)
							}
							loading={props.loading}
						/>
						<Project
							loading={props.loading}
							project={this.return_project(props)}
						/>
					</>
				)}
			</ProjectContext.Consumer>
		);
	}
}

type StateType = {
	selected_project: string;
};

interface IProps
	extends RouteComponentProps<{
		uuid_field: string;
		department_slug: string;
	}> {}

export default withRouter(ProjectRoot);
