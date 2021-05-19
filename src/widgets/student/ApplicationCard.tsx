import { useHistory } from "react-router";
import { ApplicationProjectType } from "../../backend/student/ApplicationProvider";
import DateComponent from "../../components/common/Date";
import {
	ACCEPTED,
	APPLIED,
	REJECTED,
} from "../../components/common/ProjectStatus";
import Tags from "../../components/common/Tags";
import Fade from "react-reveal/Fade";

const ApplicationCard = ({
	department_slug,
	status,
	title,
	faculty,
	start_date,
	uuid_field,
}: ApplicationProjectType) => {
	let history = useHistory();

	const render_status = (status: string) => {
		if (status === ACCEPTED) {
			return <Tags tag_string="Accepted" bootstrap_color={"success"} />;
		} else if (status === REJECTED) {
			return <Tags tag_string="Rejected" bootstrap_color={"danger"} />;
		} else if (status === APPLIED) {
			return <Tags tag_string="Applied" bootstrap_color={"info"} />;
		}
	};

	return (
		<Fade bottom>
			<div
				className="col-lg-3"
				style={{ cursor: "pointer" }}
				onClick={() => {
					history.push(`/student/${department_slug}/project/${uuid_field}`);
				}}
			>
				<div
					className="card department-card-design"
					data-aos="fade-up"
					data-aos-duration="500"
					data-aos-delay="400"
				>
					{render_status(status)}
					<div className="text-content">
						<span className="department-card-design-title">
							<strong>{title}</strong>
						</span>
						<p className="department-card-design-p">
							<strong>Faculty:</strong> {faculty.first_name} {faculty.last_name}
						</p>
						<p className="department-card-design-p">
							<strong>Start Date: </strong>
							<DateComponent
								date={start_date}
								locale={"en-GB"}
								year={"numeric"}
								day={"numeric"}
								month={"long"}
							/>
						</p>
						<button className="btn btn-mystyle">Know More</button>
					</div>
				</div>
			</div>
		</Fade>
	);
};

export default ApplicationCard;
