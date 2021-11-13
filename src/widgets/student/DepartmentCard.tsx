import React from "react";
import { useHistory } from "react-router";
import { ProjectType } from "../../backend/common/ProjectType";
import DateComponent from "../../components/common/Date";
import Tags from "../../components/common/Tags";
import { showProjectAlert } from "../../services/AlertService";

const DepartmentCard = ({
	project,
	department_slug,
}: {
	project: ProjectType;
	department_slug: string | null;
}) => {
	let history = useHistory();

	const navigateToProject = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		history.push(`/student/${department_slug}/project/${project.uuid_field}`);
	};

	return (
		<div className="col-lg-3">
			<div
				className="card department-card-design"
				data-aos="fade-up"
				data-aos-duration="500"
				data-aos-delay="400"
			>
				{project.applied ? (
					<Tags tag_string={"Applied"} bootstrap_color={"success"} />
				) : (
					<></>
				)}
				{project.is_active ? (
					<Tags
						className="mt-1"
						tag_string={"Active"}
						bootstrap_color={"success"}
					/>
				) : (
					<></>
				)}
				<div className="text-content">
					<span
						onClick={() => showProjectAlert(project)}
						className="department-card-design-title"
					>
						<strong>{project.title}</strong>
					</span>
					<p className="department-card-design-p">
						<strong>Faculty:</strong> {project.faculty.designation}.{" "}
						{project.faculty.first_name} {project.faculty.last_name}
					</p>
					<p className="department-card-design-p">
						<strong>Start Date: </strong>
						<DateComponent
							date={project.start_date}
							locale={"en-GB"}
							year={"numeric"}
							day={"numeric"}
							month={"long"}
						/>
					</p>
					<button
						onClick={event => {
							navigateToProject(event);
						}}
						className="btn btn-mystyle"
					>
						Know More
					</button>
				</div>
			</div>
		</div>
	);
};

export default DepartmentCard;
