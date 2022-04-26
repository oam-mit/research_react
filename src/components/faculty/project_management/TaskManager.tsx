import { useContext } from "react";
import { TaskManagerContext } from "../../../backend/faculty/project_management/TaskManagerProvider";
import { showTaskCreateAlert } from "../../../services/alerts/faculty";
import TaskCard from "../../../widgets/common/TaskCard";
import Spinner from "../../common/Spinner";

const TaskManager = () => {
	const state = useContext(TaskManagerContext);

	const render_tasks = () => {
		return state.tasks.map((task) => (
			<TaskCard
				task={task}
				is_editable
				change_task_status={state.change_task_status}
			/>
		));
	};
	return (
		<>
			<title>Faculty | Task Manager</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Manage Tasks
				</h3>
				<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
					Assign Tasks to selected students
				</p>
				<br />
			</div>

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
