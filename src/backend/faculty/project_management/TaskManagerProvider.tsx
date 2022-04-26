import { Component, createContext, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Swal from "sweetalert2";
import { showReactAlert } from "../../../services/alerts/common";
import {
	showErrorAlert,
	showLoadingAlert,
	showNetworkError,
	showYesNoAlert,
} from "../../../services/AlertService";
import TaskType from "../../common/TaskType";
import { StudentType } from "../../common/UserTypes";
import { ApplicantType } from "../types/ApplicantType";
import instance from "./axiosinstance";

export let TaskManagerContext = createContext<ContextType>({
	loading: true,
	tasks: [],
	accepted_applications: [],
	change_task_status: () => {},
	create_task: () => {},
});

class TaskManagerProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			tasks: [],
			accepted_applications: [],
			change_task_status: this.change_task_status,
			create_task: this.create_task,
		};
	}

	componentDidMount() {
		type SuccessfulType = {
			status: "successful";
			tasks: TaskType[];
			accepted_applications: ApplicantType[];
		};

		type UnsuccessfulType = {
			status: "unsuccessful";
			error: string;
		};

		instance
			.get(`get_tasks/${this.props.match.params.project_uuid}/`)
			.then(({ data }: { data: SuccessfulType | UnsuccessfulType }) => {
				console.log(data);
				if (data.status === "successful") {
					if (data.accepted_applications.length === 0) {
						showErrorAlert(
							"You need to accept applications before assigning tasks to students",
							() =>
								this.props.history.replace(
									`/faculty/applications/${this.props.match.params.project_uuid}`
								),
							"Message"
						);
					}

					this.setState({
						loading: false,
						tasks: data.tasks,
						accepted_applications: data.accepted_applications,
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

	change_task_status = (pk: number, change_to: boolean) => {
		let task_index = this.state.tasks.findIndex((task) => task.pk === pk);

		let tasks = [...this.state.tasks];

		tasks[task_index].status = change_to;

		this.setState({ tasks: tasks });

		instance
			.post("change_task_status/", {
				pk: pk,
				status: change_to,
			})
			.then((data) => console.log(data))
			.catch(() => {
				showNetworkError();
			});
	};

	create_task = (description: string, student: ApplicantType) => {
		showLoadingAlert();
		interface SuccessfulType {
			status: "successful";
			task: TaskType;
		}
		interface UnsuccessfulType {
			status: "unsuccessful";
			error: string;
		}

		instance
			.post(`create_task/`, {
				description: description,
				student_email: student.email,
				project_uuid: this.props.match.params.project_uuid,
			})
			.then(({ data }: { data: SuccessfulType | UnsuccessfulType }) => {
				if (data.status === "successful") {
					this.setState(
						{
							tasks: [data.task, ...this.state.tasks],
						},
						() => Swal.close()
					);
				} else {
					showErrorAlert(data.error);
				}
			})
			.catch(() => showNetworkError());
	};

	render(): ReactNode {
		return (
			<TaskManagerContext.Provider value={this.state}>
				{this.props.children}
			</TaskManagerContext.Provider>
		);
	}
}

export type ContextType = {
	loading: boolean;
	tasks: TaskType[];
	accepted_applications: ApplicantType[];
	change_task_status: (pk: number, change_to: boolean) => void;
	create_task: (description: string, student: ApplicantType) => void;
};

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

export default withRouter(TaskManagerProvider);
