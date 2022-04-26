import { useContext } from "react";
import { TaskManagerContext } from "../../../backend/student/project_management/TaskManagerProvider";
import Jumbotron from "../../../widgets/common/Jumbotron";
import TaskCard from "../../../widgets/common/TaskCard";
import Spinner from "../../common/Spinner";

const TaskManager = () => {
	let state = useContext(TaskManagerContext);

	return (
		<>
			<title>Meetings</title>
			<Jumbotron
				title="Tasks for the project"
				subtitle="View all the tasks assigned the faculty"
			></Jumbotron>

			{state.loading ? (
				<Spinner size={100} position={"absolute"} />
			) : (
				<div className="container-fluid">
					{state.tasks.map((task, id) => (
						<TaskCard task={task} is_editable={false} key={id} />
					))}
				</div>
			)}
		</>
	);
};

export default TaskManager;
