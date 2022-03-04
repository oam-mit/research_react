import MeetingType from "../../backend/common/MeetingType";
import DateComponent from "../../components/common/Date";
import { showReactAlert } from "../../services/AlertService";

const MeetingCard = (meeting: MeetingType) => {
	const get_days_after_meeting = () => {
		let meeting_date = new Date(meeting.date_time);
		let now = new Date();
		return (now.getTime() - meeting_date.getTime()) / (1000 * 60 * 60 * 24);
	};
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
						<strong style={{ cursor: "default" }}>{meeting.description}</strong>
					</span>
					<p className="department-card-design-p">
						<strong>Scheduled Date: </strong>{" "}
						<DateComponent
							date={meeting.date_time}
							locale={"en-GB"}
							year={"numeric"}
							day={"numeric"}
							month={"long"}
						/>{" "}
						@ {new Date(meeting.date_time).toLocaleTimeString("en-GB")}
					</p>
					{get_days_after_meeting() <= 90 ? (
						<button
							onClick={(event) => {
								event.preventDefault();
								showReactAlert(
									"Meeting Link",
									<>
										<button className="btn my-btn">
											<a target="__blank" href={meeting.link}>
												Click here join meeting
											</a>
										</button>
									</>,
									"info"
								);
							}}
							className="btn mt-2 btn-mystyle"
						>
							Show meeting Link
						</button>
					) : (
						<button className="btn mt-2 btn-mystyle">
							Meeting Link has expired
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default MeetingCard;
