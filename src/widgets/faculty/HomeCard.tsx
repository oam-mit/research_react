import { useHistory } from "react-router";
import { ProjectType } from "../../backend/common/ProjectType";
import DateComponent from "../../components/common/Date";
import {
	OptionsType,
	showProjectAlert,
	showProjectOptions,
} from "../../services/AlertService";

const HomeCard = ({ project }: { project: ProjectType }) => {
	let history = useHistory();

	let options: OptionsType[] = [
		{
			name: "Accepted Applications",
			url: `/faculty/applications/accepted/${project.uuid_field}`,
		},
		{
			name: "Received Applications",
			url: `/faculty/applications/${project.uuid_field}`,
		},
		{
			name: "Meeting Manager",
			url: `/faculty/project_management/meetings/${project.uuid_field}`,
		},
		{
			name: "Task Manager",
			url: `/faculty/project_management/tasks/${project.uuid_field}`,
		},
	];

	return (
		<div className="col-lg-3">
			<div
				className="card department-card-design"
				data-aos="fade-up"
				data-aos-duration="500"
				data-aos-delay="400"
			>
				<div className="text-content">
					<span className="department-card-design-title">
						<strong>{project.title}</strong>
					</span>
					<p className="department-card-design-p">
						<strong>Start Date:</strong>{" "}
						<DateComponent
							date={project.start_date}
							locale={"en-GB"}
							year={"numeric"}
							day={"numeric"}
							month={"long"}
						/>
					</p>
					<button
						onClick={() => showProjectOptions(options, history.push)}
						className="btn btn-mystyle"
					>
						Manage Project
					</button>
					<button
						onClick={(event) => {
							event.preventDefault();
							showProjectAlert(project, true);
						}}
						className="btn mt-2 btn-mystyle"
					>
						Know More
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomeCard;
