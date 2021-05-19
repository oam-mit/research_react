import { Component, createContext } from "react";
import { showNetworkError } from "../../services/AlertService";

export const HomeContext = createContext<ContextType>({
	loading: true,
	departments: [],
});

class HomeProvider extends Component<{}, ContextType> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			departments: [],
		};
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	componentDidMount() {
		fetch("/student/api/get_departments/")
			.then((response: any) => response.json())
			.then((data: any) => {
				this.setState({
					departments: data.departments,
					loading: false,
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

export type DepartmentType = {
	name: string;
	department_building: string;
	slug: string;
};

type ContextType = {
	loading: boolean;
	departments: Array<DepartmentType>;
};

export default HomeProvider;
