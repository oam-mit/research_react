import { useContext } from "react";
import Spinner from "../common/Spinner";

import { ApplicationContext } from "../../backend/student/ApplicationProvider";
import ApplicationCard from "../../widgets/student/ApplicationCard";

const Applications = () => {
	let state = useContext(ApplicationContext);

	const render_projects = () => {
		if (state.loading) {
			return <Spinner size={50} position={"absolute"} />;
		} else {
			if (state.projects.length > 0) {
				let projects = state.projects.map(project => {
					return (
						<ApplicationCard
							key={project.uuid_field}
							department_slug={project.department_slug}
							status={project.status}
							title={project.title}
							faculty={project.faculty}
							start_date={project.start_date}
							uuid_field={project.uuid_field}
							end_date={project.end_date}
						/>
					);
				});

				return projects;
			} else {
				return (
					<div className="col-12 text-center">
						<h3>You have not applied for any projects yet</h3>
					</div>
				);
			}
		}
	};

	return (
		<>
			<title>Student|Applications</title>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					Your Applications
				</h3>
				<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
					You can view all your applications here
				</p>
				<br />
			</div>

			<div className="container-fluid ">
				<div className="row">{render_projects()}</div>
			</div>
		</>
	);
};

export default Applications;
