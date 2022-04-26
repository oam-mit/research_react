import { Component, createContext, ReactNode } from "react";
import { showErrorAlert } from "../../services/AlertService";
import { ProjectType } from "../common/ProjectType";
import instance from "./axiosInstance";

export const WorkingOnContext = createContext<ContextType>({
	loading: true,
	projects: [],
});

class WorkingOnProvider extends Component<{}, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			projects: [],
		};
	}

	componentDidMount() {
		type DataType = {
			status: "successful" | "unsuccessful";
			projects: ProjectType[];
			error: string | null;
		};
		instance
			.get("get_working_on_projects/")
			.then(({ data }: { data: DataType }) => {
				if (data.status === "successful") {
					this.setState({
						loading: false,
						projects: data.projects,
					});
				} else {
					showErrorAlert(data.error!);
				}
			})
			.catch((err) => showErrorAlert(err));
	}

	render(): ReactNode {
		return (
			<WorkingOnContext.Provider value={this.state}>
				{this.props.children}
			</WorkingOnContext.Provider>
		);
	}
}

type ContextType = {
	loading: boolean;
	projects: ProjectType[];
};

export default WorkingOnProvider;
