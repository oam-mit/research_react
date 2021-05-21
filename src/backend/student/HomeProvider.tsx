import Fuse from "fuse.js";
import { Component, createContext } from "react";
import { showNetworkError } from "../../services/AlertService";
import instance from "./axiosInstance";

export const HomeContext = createContext<ContextType>({
	loading: true,
	departments: [],
	search: () => {},
});

class HomeProvider extends Component<{}, StateType> {
	private fuse: Fuse<DepartmentType>;

	constructor(props: any) {
		super(props);
		this.state = {
			loading: true,
			_departments: [],
			departments: [],
		};

		this.fuse = new Fuse<DepartmentType>([]);

		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	componentDidMount() {
		type DataType = {
			departments: Array<DepartmentType>;
		};
		instance
			.get("get_departments/")
			.then(({ data }: { data: DataType }) => {
				this.setState({
					_departments: data.departments,
					loading: false,
					departments: data.departments,
				});
				this.fuse = new Fuse<DepartmentType>(data.departments, {
					keys: ["name"],
					threshold: 0.5,
				});
			})
			.catch(() => {
				showNetworkError();
				this.setState({
					loading: false,
				});
			});
	}

	private search = (text: string) => {
		if (text.length === 0) {
			this.setState({
				departments: this.state._departments,
			});
		} else {
			let results = this.fuse.search(text);
			let departments = results.map(result => result.item);
			this.setState({
				departments: departments,
			});
		}
	};

	render() {
		return (
			<HomeContext.Provider
				value={{
					loading: this.state.loading,
					departments: this.state.departments,
					search: this.search,
				}}
			>
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
	search: (text: string) => void;
};

type StateType = {
	loading: boolean;
	_departments: Array<DepartmentType>;
	departments: Array<DepartmentType>;
};

export default HomeProvider;
