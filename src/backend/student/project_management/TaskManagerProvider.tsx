import { Component, createContext, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
	showErrorAlert,
	showNetworkError,
} from "../../../services/AlertService";
import TaskType from "../../common/TaskType";
import instance from "../../faculty/project_management/axiosinstance";

export const TaskManagerContext = createContext<ContextType>({
	loading: true,
	tasks: [],
});

class TaskManager extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			tasks: [],
		};
	}

	componentDidMount() {
		type SuccessfulType = {
			status: "successful";
			tasks: TaskType[];
		};

		type UnsuccessfulType = {
			status: "unsuccessful";
			error: string;
		};

		instance
			.get(`get_tasks/student/${this.props.match.params.project_uuid}/`)
			.then(({ data }: { data: SuccessfulType | UnsuccessfulType }) => {
				console.log(data);
				if (data.status === "successful") {
					this.setState({
						loading: false,
						tasks: data.tasks,
					});
				} else {
					showErrorAlert(data.error!);
					console.log(data.error);
				}
			})
			.catch(() => {
				showNetworkError();
			});
	}

	render(): ReactNode {
		return (
			<TaskManagerContext.Provider value={this.state}>
				{this.props.children}
			</TaskManagerContext.Provider>
		);
	}
}

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

type ContextType = {
	loading: boolean;
	tasks: TaskType[];
};
export default withRouter(TaskManager);
