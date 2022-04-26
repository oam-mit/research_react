import { useContext } from "react";
import { TaskManagerContext } from "../../../backend/faculty/project_management/TaskManagerProvider";
import { showTaskCreateAlert } from "../../../services/alerts/faculty";
import Jumbotron from "../../../widgets/common/Jumbotron";
import TaskCard from "../../../widgets/common/TaskCard";
import Spinner from "../../common/Spinner";

const TaskManager = () => {
	const state = useContext(TaskManagerContext);

	const render_tasks = () => {
		if (state.tasks.length === 0) {
			return (
				<h4 className="text-center">
					To create a task, click on the '+' icon in the bottom right corner
				</h4>
			);
		}
		return state.tasks.map((task, index) => (
			<TaskCard
				key={index}
				task={task}
				is_editable
				change_task_status={state.change_task_status}
			/>
		));
	};
	return (
		<>
			<title>Faculty | Task Manager</title>
			<Jumbotron
				title="Manage Tasks"
				subtitle="Assign Tasks to selected students"
			/>

			{state.loading ? (
				<Spinner size={100} position={"absolute"} />
			) : (
				<>
					<div className="container-fluid">{render_tasks()}</div>

					<div id="mybutton">
						<button
							onClick={() => {
								showTaskCreateAlert(
									state.create_task,
									state.accepted_applications
								);
							}}
							style={{ position: "fixed", bottom: "10px", right: "40px" }}
							className="addTask"
						>
							+
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default TaskManager;
