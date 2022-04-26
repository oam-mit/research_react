import { useContext } from "react";
import { ApplicationContext } from "../../backend/student/ApplicationProvider";
import ApplicationCard from "../../widgets/student/ApplicationCard";
import LoadingCard from "../../widgets/common/LoadingCard";
import Jumbotron from "../../widgets/common/Jumbotron";

const Applications = () => {
	let state = useContext(ApplicationContext);

	const render_projects = () => {
		if (state.loading) {
			return <LoadingCard count={4} />;
		} else {
			if (state.projects.length > 0) {
				let projects = state.projects.map((project) => {
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
			<Jumbotron
				title="Your Applications"
				subtitle="You can view all your applications here"
			/>

			<div className="container-fluid ">
				<div className="row">{render_projects()}</div>
			</div>
		</>
	);
};

export default Applications;
