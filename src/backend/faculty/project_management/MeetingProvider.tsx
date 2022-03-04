import { Component, createContext, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
	showErrorAlert,
	showLoadingAlert,
	showNetworkError,
	showSuccessAlert,
	showYesNoAlert,
} from "../../../services/AlertService";
import getTimeZone from "../../../services/TimezoneService";
import MeetingType from "../../common/MeetingType";
import { ApplicantType } from "../types/ApplicantType";
import instance from "./axiosinstance";

export let MeetingContext = createContext<ContextType>({
	loading: true,
	meetings: [],
	logged_in: false,
	log_in: () => {},
	create_meeting: () => {},
	access_token: null,
	accepted_applications: [],
});

class MeetingProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			meetings: [],
			logged_in: false,
			log_in: this.log_in,
			create_meeting: this.create_meeting,
			access_token: null,
			accepted_applications: [],
		};
	}

	log_in = (access_token: string) => {
		this.setState({
			logged_in: true,
			access_token: access_token,
		});
	};

	create_meeting = (
		description: string,
		start_date: string,
		end_date: string,
		students: OptionsType[]
	) => {
		type DataType = {
			status: "successful" | "unsuccessful";
			meeting: MeetingType;
			error: null | string;
		};
		let date = new Date(start_date);
		showYesNoAlert(
			"Are you sure you want to schedule this meeting ? ",

			`Start Date: ${date.toLocaleDateString("en-GB", {
				month: "long",
				year: "numeric",
				day: "numeric",
			})}`,
			"Yes",
			"No",
			"warning"
		).then((value) => {
			if (value) {
				showLoadingAlert();
				instance
					.post("create_meeting/", {
						description: description,
						start_date: start_date + getTimeZone(),
						end_date: end_date + getTimeZone(),
						students: students,
						uuid_field: this.props.match.params.project_uuid,
						access_token: this.state.access_token,
					})
					.then(({ data }: { data: DataType }) => {
						if (data.status === "successful") {
							this.setState(
								(prev) => {
									return {
										meetings: [data.meeting, ...prev.meetings],
									};
								},
								() => {
									this.logout();
									showSuccessAlert("Meeting Created Successfully");
								}
							);
						} else {
							showErrorAlert(data.error!);
						}
					})
					.catch(() => {
						showNetworkError();
					});
			}
		});
	};

	logout = () => {
		this.setState({
			logged_in: false,
			access_token: null,
		});
	};

	componentDidMount() {
		type DataType = {
			meetings: MeetingType[];
			accepted_applications: ApplicantType[];
		};
		instance
			.get(`get_meetings/${this.props.match.params.project_uuid}/`)
			.then(({ data }: { data: DataType }) => {
				this.setState({
					loading: false,
					meetings: data.meetings,
					accepted_applications: data.accepted_applications,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render(): ReactNode {
		return (
			<MeetingContext.Provider value={this.state}>
				{this.props.children}
			</MeetingContext.Provider>
		);
	}
}

export type OptionsType = {
	label: string;
	value: string;
};

type ContextType = {
	loading: boolean;
	meetings: MeetingType[];
	logged_in: boolean;
	log_in: (access_token: string) => void;
	create_meeting: (
		descripion: string,
		start_date: string,
		end_date: string,
		students: OptionsType[]
	) => void;
	access_token: null | string;
	accepted_applications: ApplicantType[];
};

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

export default withRouter(MeetingProvider);
