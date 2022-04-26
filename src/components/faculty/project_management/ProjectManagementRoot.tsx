import { Route, Switch } from "react-router";
import MeetingProvider from "../../../backend/faculty/project_management/MeetingProvider";
import TaskManagerProvider from "../../../backend/faculty/project_management/TaskManagerProvider";
import Meeting from "./Meeting";
import TaskManager from "./TaskManager";

const ProjectManagementRoot = () => {
	return (
		<Switch>
			<Route
				exact
				path="/faculty/project_management/meeting/:project_uuid"
				component={() => (
					<MeetingProvider>
						<Meeting />
					</MeetingProvider>
				)}
			/>
			<Route
				exact
				path="/faculty/project_management/tasks/:project_uuid"
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
