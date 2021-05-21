import { useContext, useState } from "react";
import Footer from "./Footer";
import Spinner from "../common/Spinner";
import DepartmentCard from "../../widgets/student/DepartmentCard";
import { DepartmentContext } from "../../backend/student/DepartmentProvider";
import FilterTag from "../../widgets/student/FilterTag";

const Department = () => {
	const render_projects = () => {
		if (state.projects.length > 0) {
			let projects_temp = state.projects.map(project => (
				<DepartmentCard
					key={project.uuid_field}
					project={project}
					department_slug={state.department_slug}
				/>
			));

			return projects_temp;
		} else {
			return (
				<div className="col-12 text-center">
					<h3>No Projects to show under this department</h3>
				</div>
			);
		}
	};

	const render_tags = () => {
		if (filtered) {
			let tags = selectedTags.map((category, index) => (
				<FilterTag
					key={index}
					onSelect={() => selectCategory(category)}
					onUnSelect={() => unSelectCategory(category)}
					tag={category}
					selected={selectedTags.includes(category)}
				/>
			));
			return <>{tags}</>;
		}

		let categories = new Set<string>();

		state.projects.map(project => {
			let tags = project.tags.split(",");
			tags.map(tag => {
				categories.add(tag.trim());
				return null;
			});

			return null;
		});

		let tags: Array<JSX.Element> = [];

		let index = 1;
		categories.forEach(category => {
			tags.push(
				<FilterTag
					key={index}
					onSelect={() => selectCategory(category)}
					onUnSelect={() => unSelectCategory(category)}
					tag={category}
					selected={selectedTags.includes(category)}
				/>
			);
			index++;
		});

		return <>{tags}</>;
	};

	const selectCategory = (category: string) => {
		setselectedTags([...selectedTags, category]);
	};
	const unSelectCategory = (category: string) => {
		setselectedTags(selectedTags => {
			return selectedTags.filter(tag => tag !== category);
		});
	};

	let state = useContext(DepartmentContext);
	const [selectedTags, setselectedTags] = useState<Array<string>>([]);
	const [filtered, setfiltered] = useState<boolean>(false);

	if (state.loading) {
		return <Spinner size={100} position={"absolute"} />;
	} else {
		return (
			<>
				<title>{state.department_name}</title>
				<div
					className="jumbotron jumbotron-fluid text-white text-center my-3"
					id="jumbo-color"
				>
					<h3 className="display-1" id="jumbo-text">
						{state.department_name}
					</h3>
					<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
						Projects related to that department !
					</p>
				</div>
				<div className="container-fluid ">
					<div className="row">
						<div className="col-12 text-center">{render_tags()}</div>
					</div>
				</div>
				<div className="container-fluid ">
					<div className="row">
						<div className="col-12 text-center">
							<button
								className="btn btn-primary mt-1"
								onClick={() => {
									state.filter(selectedTags);
									setfiltered(selectedTags.length !== 0);
								}}
							>
								Apply Filter
							</button>
						</div>
					</div>
				</div>

				<div className="container-fluid ">
					<div className="row">{render_projects()}</div>
				</div>

				{state.projects.length > 0 ? <Footer /> : <></>}
			</>
		);
	}
};
export default Department;
