import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FeedbackType } from "../backend/faculty/types/FeedbackType";
import FeedbackForm from "../widgets/faculty/FeedbackForm";

export const yesNoAlert = async (
	title: string,
	text: string,
	confirmButtonText: string,
	cancelButtonText: string,
	icon: "error" | "warning"
) => {
	let value = await Swal.fire({
		title: title,
		text: text,
		confirmButtonText: confirmButtonText,
		cancelButtonText: cancelButtonText,
		showCancelButton: true,
		icon: icon,
	});

	return value.isConfirmed;
};

export const showLoadingAlert = () => {
	Swal.fire({
		html: `<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
            </div>`,
		showConfirmButton: false,
	});
};

export const showSuccessAlert = (text: string, onOkFunction?: () => void) => {
	Swal.fire({
		title: "Success",
		text: text,
		icon: "success",
	}).then(() => {
		if (onOkFunction) {
			onOkFunction();
		}
	});
};

export const showErrorAlert = (text: string, onOkFunction?: () => void) => {
	Swal.fire({
		title: "Error",
		text: text,
		icon: "error",
	}).then(() => {
		if (onOkFunction) {
			onOkFunction();
		}
	});
};

export const showNetworkError = () => {
	Swal.fire({
		title: "Error",
		text: "Please check your internet connection",
		icon: "error",
	});
};

export const showReactAlert = (
	title: string,
	body: JSX.Element,
	icon: "error" | "info"
) => {
	const ReactSwal = withReactContent(Swal);

	ReactSwal.fire({
		title: title,
		icon: icon,

		html: body,
	});
};

export const showContactUsAlert = () => {
	showReactAlert(
		"Contact Details",
		<>
			<table
				style={{
					width: "100%",
					fontFamily: "arial, sans-serif",
					borderCollapse: "collapse",
				}}
				className={"table"}
			>
				<tr>
					<th>Name</th>
					<th>Contact Number</th>
				</tr>
				<tr>
					<td>Omkar Masur</td>
					<td>+919930147279</td>
				</tr>
				<tr>
					<td>Insha Manowar</td>
					<td>+919477281022</td>
				</tr>
				<tr>
					<td>Tinku Chowdhary</td>
					<td>+919680411907</td>
				</tr>
			</table>

			<span>OR</span>
			<br />
			<button className={"btn btn-primary"}>
				{" "}
				<a href={"mailto:contactus@istemanipal.com"}>MAIL US </a>
			</button>
			<br />
		</>,
		"info"
	);
};

export const showFeedback = (feedback: FeedbackType) => {
	Swal.fire({
		title: "Your Feedback",
		text: feedback.feedback,
		footer: feedback.project_is_complete
			? "Student completed the project"
			: "Student did not complete the project",
	});
};

export const submitFeedbackAlert = (
	submitHandler: (feedback: string, completed: boolean) => void
) => {
	const ReactSwal = withReactContent(Swal);

	ReactSwal.fire({
		title: "Feedback Form",
		html: <FeedbackForm submit_handler={submitHandler} />,
		showCancelButton: true,
		showConfirmButton: false,
	});
};
