import { Component, createContext } from "react";
import { showNetworkError } from "../../services/AlertService";
import { ProjectType } from "../common/ProjectType";
import instance from "./axiosInstance";

export const HomeContext = createContext<ContextType>({
	loading: true,
	active_projects: [],
	past_projects: [],
});

type ContextType = {
	loading: boolean;
	active_projects: Array<ProjectType>;
	past_projects: Array<ProjectType>;
};

class HomeProvider extends Component<{}, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			active_projects: [],
			past_projects: [],
		};
	}

	componentDidMount() {
		type DataType = {
			active_projects: Array<ProjectType>;
			past_projects: Array<ProjectType>;
		};

		instance
			.get("get_active_projects/")
			.then(({ data }: { data: DataType }) => {
				this.setState({
					loading: false,
					active_projects: data.active_projects,
					past_projects: data.past_projects,
				});
			})
			.catch(() => {
				showNetworkError();
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		return (
			<HomeContext.Provider value={this.state}>
				{this.props.children}
			</HomeContext.Provider>
		);
	}
}

export default HomeProvider;
