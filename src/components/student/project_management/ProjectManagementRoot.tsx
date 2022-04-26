import { Route, Switch } from "react-router";
import MeetingProvider from "../../../backend/student/project_management/MeetingProvider";
import TaskManagerProvider from "../../../backend/student/project_management/TaskManagerProvider";
import Meeting from "./Meeting";
import TaskManager from "./TaskManager";

const ProjectManagementRoot = () => {
	return (
		<Switch>
			<Route
				exact
				path="/student/project_management/meetings/:project_uuid"
				component={() => (
					<MeetingProvider>
						<Meeting />
					</MeetingProvider>
				)}
			/>
			<Route
				exact
				path="/student/project_management/tasks/:project_uuid"
				component={() => (
					<TaskManagerProvider>
						<TaskManager />
					</TaskManagerProvider>
				)}
			/>
		</Switch>
	);
};

export default ProjectManagementRoot;
