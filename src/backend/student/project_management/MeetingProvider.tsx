import { Component, createContext, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import MeetingType from "../../common/MeetingType";
import instance from "../../faculty/project_management/axiosinstance";
import { ApplicantType } from "../../faculty/types/ApplicantType";

export const MeetingContext = createContext<ContextType>({
	loading: true,
	meetings: [],
});

class MeetingProvider extends Component<PropsType, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			meetings: [],
		};
	}

	componentDidMount() {
		type DataType = {
			meetings: MeetingType[];
			accepted_applications: ApplicantType[];
		};
		instance
			.get(`get_meetings/student/${this.props.match.params.project_uuid}/`)
			.then(({ data }: { data: DataType }) => {
				this.setState({
					loading: false,
					meetings: data.meetings,
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

interface PropsType extends RouteComponentProps<{ project_uuid: string }> {}

type ContextType = {
	loading: boolean;
	meetings: MeetingType[];
};

export default withRouter(MeetingProvider);
