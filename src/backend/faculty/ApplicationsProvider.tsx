import { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ACCEPTED } from "../../components/common/ProjectStatus";
import UserProvider from "../../providers/UserProvider";
import {
	showErrorAlert,
	showNetworkError,
	showSuccessAlert,
	yesNoAlert,
} from "../../services/AlertService";
import instance from "./axiosInstance";
import { ApplicantType } from "./types/ApplicantType";

export type ContextType = {
	isAllowed: boolean;
	applications: Array<ApplicantType>;
	loading: boolean;
	project_title: string;
	count_accepted: number;
	count_max: number;
	is_active: boolean;
	change_applicant_status: (
		applicant: ApplicantType,
		status: string,
		status_show: string
	) => void;
	change_project_status: () => void;
};

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

export const ApplicationsContext = createContext<ContextType>({
	isAllowed: false,
	applications: [],
	loading: false,
	project_title: "",
	is_active: true,
	change_applicant_status: () => {},
	change_project_status: () => {},
	count_accepted: 0,
	count_max: 0,
});

class ApplicationsProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			isAllowed: false,
			applications: [],
			loading: true,
			project_title: "",
			is_active: false,
			count_accepted: 0,
			count_max: 0,
			change_applicant_status: this.change_application_status,
			change_project_status: this.change_project_status,
		};
	}

	componentDidMount() {
		this.fetch_applicants();
	}

	fetch_applicants() {
		type DataType = {
			status: "successful" | "unsuccessful";
			applications: Array<ApplicantType>;
			is_active: boolean;
			title: string;
			count_max: number;
			count_accepted: number;
		};

		instance
			.get(`get_applicants/${this.props.match.params.project_uuid}`)
			.then(({ data }: { data: DataType }) => {
				if (data.status === "successful") {
					this.setState({
						applications: data.applications,
						project_title: data.title,
						is_active: data.is_active,
						loading: false,
						isAllowed: true,
						count_max: data.count_max,
						count_accepted: data.count_accepted,
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

	private __change_application_status = (
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
				type DataType = {
					status: "successful" | "unsuccessful";
					error: string;
				};

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

						instance
							.post("application_change_status/", form_data)
							.then(({ data }: { data: DataType }) => {
								if (data.status === "successful") {
									this.fetch_applicants();

									this.setState({
										count_accepted: this.state.count_accepted + 1,
									});

									showSuccessAlert(
										`${applicant.first_name} ${applicant.last_name} has been ${status_show}ed`
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

	change_application_status = (
		applicant: ApplicantType,
		status: string,
		status_show: string
	) => {
		if (
			this.state.count_accepted >= this.state.count_max &&
			status === ACCEPTED
		) {
			yesNoAlert(
				"Alert",
				`You have set maximum number of students in the project to ${this.state.count_max}. By accepting this applicant you would exceed this number (Accepted: ${this.state.count_accepted})`,
				"Accept Anyway",
				"Cancel",
				"warning"
			).then(value => {
				if (value) {
					this.__change_application_status(applicant, status, status_show);
				}
			});
		} else {
			this.__change_application_status(applicant, status, status_show);
		}
	};

	change_project_status = () => {
		type DataType = {
			status: "successful" | "unsuccessful";
			error: string;
		};
		yesNoAlert("Confirmation", "Are you sure?", "Yes", "No", "warning").then(
			value => {
				if (value) {
					this.setState(
						{
							loading: true,
						},
						() => {
							let form_data = new FormData();
							form_data.append(
								"uuid_field",
								this.props.match.params.project_uuid
							);

							instance
								.post("change_project_status/", form_data)
								.then(({ data }: { data: DataType }) => {
									if (data.status === "successful") {
										this.props.history.replace(`/faculty/home`);
									} else {
										showErrorAlert(data.error);
									}
								})
								.catch(err => {
									showNetworkError();
								});
						}
					);
				}
			}
		);
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
