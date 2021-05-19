import { useHistory } from "react-router";
import { DepartmentType } from "../../backend/student/HomeProvider";
import Fade from "react-reveal/Fade";

const HomeCard = ({ slug, name, department_building }: DepartmentType) => {
	let history = useHistory();

	return (
		<Fade bottom>
			<div className="col-lg-3">
				<div
					className="card department-card-design"
					data-aos="fade-up"
					data-aos-duration="500"
					data-aos-delay="400"
					onClick={() => history.push(`/student/department/${slug}`)}
					style={{ cursor: "pointer" }}
				>
					<div className="text-content">
						<span className="department-card-design-title">
							<strong>{name}</strong>
						</span>
						<p className="department-card-design-p">
							<b>Department Building: </b>
							{department_building}
						</p>
					</div>
				</div>
			</div>
		</Fade>
	);
};

export default HomeCard;
