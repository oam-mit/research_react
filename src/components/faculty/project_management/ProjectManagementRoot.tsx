import { Route, Switch } from "react-router";
import MeetingProvider from "../../../backend/faculty/project_management/MeetingProvider";
import Meeting from "./Meeting";

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
		</Switch>
	);
};

export default ProjectManagementRoot;
