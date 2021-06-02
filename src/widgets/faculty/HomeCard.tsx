import { useHistory } from "react-router";
import { ProjectType } from "../../backend/common/ProjectType";

import DateComponent from "../../components/common/Date";

import Fade from "react-awesome-reveal";

const HomeCard = ({ project }: { project: ProjectType }) => {
	let history = useHistory();

	return (
		<div
			className="col-lg-3"
			onClick={() =>
				history.push(`/faculty/applications/${project.uuid_field}`)
			}
		>
			<div
				className="card department-card-design"
				data-aos="fade-up"
				data-aos-duration="500"
				data-aos-delay="400"
				style={{ cursor: "pointer" }}
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
				</div>
			</div>
		</div>
	);
};

export default HomeCard;
