import { StudentType } from "../../../backend/common/UserTypes";
import { ApplicantType } from "../../../backend/faculty/types/ApplicantType";
import TaskCreateForm from "../../../widgets/faculty/TaskCreateForm";
import { showReactAlert } from "../common";

export const showTaskCreateAlert = (
	create_function: (description: string, student: ApplicantType) => void,
	accepted_applications: ApplicantType[]
) => {
	showReactAlert(
		"Fill in the details",
		<TaskCreateForm
			accepted_applications={accepted_applications}
			create_task={create_function}
		/>,
		"info",
		"Cancel"
	);
};
