import { Component } from "react";
import { createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
	showErrorAlert,
	showFeedback,
	showLoadingAlert,
	showNetworkError,
	showSuccessAlert,
	submitFeedbackAlert,
} from "../../services/AlertService";
import instance from "./axiosInstance";
import { ApplicantType } from "./types/ApplicantType";
import { FeedbackType } from "./types/FeedbackType";

export type ContextType = {
	isAllowed: boolean;
	applications: Array<ApplicantType>;
	loading: boolean;
	project_title: string;
	feedbackHandler: (applicant: ApplicantType) => void;
};

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

export const AcceptedApplicationsContext = createContext<ContextType>({
	isAllowed: false,
	applications: [],
	loading: false,
	project_title: "",
	feedbackHandler: () => {},
});

class AcceptedApplicationsProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			isAllowed: false,
			applications: [],
			loading: true,
			project_title: "",
			feedbackHandler: this.feedbackHandler,
		};
	}

	componentDidMount() {
		type DataType = {
			applications: Array<ApplicantType>;
			title: string;
			status: "successful" | "unsuccessful";
		};

		instance
			.get(`get_accepted_applicants/${this.props.match.params.project_uuid}`)
			.then(({ data }: { data: DataType }) => {
				if (data.status === "successful") {
					this.setState({
						applications: data.applications,
						project_title: data.title,
						loading: false,
						isAllowed: true,
					});
				} else {
					this.setState({
						loading: false,
					});
				}
			})
			.catch(() => {
				showNetworkError();
				this.setState({
					loading: false,
				});
			});
	}

	feedbackHandler = (applicant: ApplicantType) => {
		type DataType = {
			status: "submitted" | "not submitted";
			feedback: FeedbackType | null;
		};
		showLoadingAlert();
		instance
			.get(
				`check_feedback_submitted/${this.props.match.params.project_uuid}/${applicant.email}`
			)
			.then(({ data }: { data: DataType }) => {
				if (data.status === "submitted") {
					showFeedback(data.feedback!);
				} else {
					submitFeedbackAlert((feedback: string, complete: boolean) =>
						this.submitFeedback(feedback, complete, applicant)
					);
				}
			})
			.catch(() => {
				showErrorAlert("Error");
			});
	};

	submitFeedback = (
		feedback: string,
		complete: boolean,
		applicant: ApplicantType
	) => {
		showLoadingAlert();
		let formdata = {
			email: applicant.email,
			project_uuid: this.props.match.params.project_uuid,
			feedback: feedback,
			project_is_complete: complete,
		};
		instance
			.post("submit_feedback", formdata)
			.then(({ data }) => {
				if (data.status === "successful") {
					showSuccessAlert("Feedback Submitted Successfully");
				} else {
					showErrorAlert("Error occurred");
				}
			})
			.catch(() => {
				showNetworkError();
			});
	};

	render() {
		return (
			<AcceptedApplicationsContext.Provider value={this.state}>
				{this.props.children}
			</AcceptedApplicationsContext.Provider>
		);
	}
}

export default withRouter(AcceptedApplicationsProvider);
