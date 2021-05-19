import { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import UserProvider from "../../providers/UserProvider";
import {
	showErrorAlert,
	showNetworkError,
	showSuccessAlert,
	yesNoAlert,
} from "../../services/AlertService";
import { ApplicantType } from "./types/ApplicantType";

export type ContextType = {
	isAllowed: boolean;
	applications: Array<ApplicantType>;
	loading: boolean;
	project_title: string;
	change_applicant_status: (
		applicant: ApplicantType,
		status: string,
		status_show: string
	) => void;
};

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

export const ApplicationsContext = createContext<ContextType>({
	isAllowed: false,
	applications: [],
	loading: true,
	project_title: "",
	change_applicant_status: () => {},
});

class ApplicationsProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			isAllowed: false,
			applications: [],
			loading: true,
			project_title: "",
			change_applicant_status: this.change_application_status,
		};
	}

	componentDidMount() {
		this.fetch_applicants();
	}

	fetch_applicants() {
		fetch(`/faculty/api/get_applicants/${this.props.match.params.project_uuid}`)
			.then(resp => resp.json())
			.then(data => {
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
			.catch(err => {
				console.log(err);
			});
	}

	change_application_status = (
		applicant: ApplicantType,
		status: string,
		status_show: string
	) => {
		yesNoAlert(
			"Confirmation",
			`Are you sure you want to ${status_show} ${applicant.first_name} ${applicant.last_name}?`,
			"Yes",
			"No",
			"warning"
		).then(value => {
			if (value) {
				this.setState(
					{
						loading: true,
					},
					() => {
						let form_data = new FormData();
						form_data.append("student_email", applicant.email);
						form_data.append(
							"uuid_field",
							this.props.match.params.project_uuid
						);
						form_data.append("status", status);

						fetch("/faculty/api/application_change_status/", {
							method: "POST",
							body: form_data,
							headers: {
								"X-CSRFToken": this.context.getCookie("csrftoken"),
							},
						})
							.then(resp => resp.json())
							.then(data => {
								if (data.status === "successful") {
									this.fetch_applicants();

									showSuccessAlert(
										`${applicant.first_name} ${applicant.last_name} has been ${status_show}`
									);
								} else {
									this.setState(
										{
											loading: false,
										},
										() => {
											showErrorAlert(data.error);
										}
									);
								}
							})
							.catch(() => {
								showNetworkError();
							});
					}
				);
			}
		});
	};

	render() {
		return (
			<ApplicationsContext.Provider value={this.state}>
				{this.props.children}
			</ApplicationsContext.Provider>
		);
	}
}

ApplicationsProvider.contextType = UserProvider;

export default withRouter(ApplicationsProvider);
