import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProjectType } from "../backend/common/ProjectType";
import { FeedbackType } from "../backend/faculty/types/FeedbackType";
import DateComponent from "../components/common/Date";
import FeedbackForm from "../widgets/faculty/FeedbackForm";

export const showYesNoAlert = async (
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

export const showErrorAlert = (
	text: string,
	onOkFunction?: () => void,
	errorText = "Error"
) => {
	Swal.fire({
		title: errorText,
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
	icon: "error" | "info",
	confirmButtonText = "OK"
) => {
	const ReactSwal = withReactContent(Swal);

	ReactSwal.fire({
		title: title,
		icon: icon,

		html: body,
		confirmButtonColor: "#0069d9",
		confirmButtonText: confirmButtonText,
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
					<td>Varshil Shah</td>
					<td>+919328608339</td>
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

export const showProjectAlert = (
	project: ProjectType,
	showDescription: boolean = false
) => {
	const ReactSwal = withReactContent(Swal);

	ReactSwal.fire({
		title: project.title,
		showCancelButton: false,
		html: (
			<>
				<div className="card">
					<div className="card-body">
						<h4 className="font-weight-bold card-title">Faculty In-Charge</h4>
						<p className="card-text">
							{project.faculty.designation}. {project.faculty.first_name}{" "}
							{project.faculty.last_name}
						</p>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h4 className="font-weight-bold card-title">Outcome</h4>
						<p className="card-text">{project.outcome}</p>
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h4 className="font-weight-bold card-title">Important Dates</h4>
						<p className="card-text">
							Start Date:{" "}
							<DateComponent
								date={project.start_date}
								locale={"en-GB"}
								year={"numeric"}
								day={"numeric"}
								month={"long"}
							/>{" "}
						</p>
						<p className="card-text">
							End Date:{" "}
							<DateComponent
								date={project.end_date}
								locale={"en-GB"}
								year={"numeric"}
								day={"numeric"}
								month={"long"}
							/>{" "}
						</p>
					</div>
				</div>
				{showDescription ? (
					<div className="card">
						<div className="card-body">
							<h4 className="font-weight-bold card-title">Description</h4>
							<p className="card-text">{project.description}</p>
						</div>
					</div>
				) : (
					<></>
				)}
			</>
		),
		showClass: {
			popup: "animated fadeInDown",
			icon: "animated heartBeat delay-1s",
		},
		confirmButtonColor: "#0069d9",
	});
};

export type OptionsType = {
	name: string;
	url: string;
};
export const showProjectOptions = (
	options: OptionsType[],
	pushFunction: (url: string) => void
) => {
	showReactAlert(
		"Select One of the following options",
		<>
			{options.map((option, index) => {
				return (
					<button
						key={index}
						className="btn-mystyle"
						onClick={(event) => {
							event.preventDefault();
							pushFunction(option.url);
							Swal.close();
						}}
					>
						<h5>{option.name}</h5>
					</button>
				);
			})}
		</>,
		"info",
		"CLOSE"
	);
};
