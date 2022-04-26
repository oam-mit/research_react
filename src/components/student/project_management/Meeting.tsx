import { useContext } from "react";
import { MeetingContext } from "../../../backend/student/project_management/MeetingProvider";
import Jumbotron from "../../../widgets/common/Jumbotron";
import MeetingCard from "../../../widgets/common/MeetingCard";
import Spinner from "../../common/Spinner";

const Meeting = () => {
	let state = useContext(MeetingContext);

	const render_meetings = () => {
		if (state.meetings.length === 0) {
			return <h3>You do not have any meetings scheduled yet</h3>;
		}
		return state.meetings.map((meeting, index) => (
			<MeetingCard
				key={index}
				date_time={meeting.date_time}
				description={meeting.description}
				link={meeting.link}
				students={meeting.students}
			/>
		));
	};

	return (
		<>
			<title>Meetings</title>
			<Jumbotron title="Scheduled/Past Meetings" subtitle="" />

			{state.loading ? (
				<Spinner size={100} position={"absolute"} />
			) : (
				<div className="container-fluid">
					<div className="row">{render_meetings()}</div>
				</div>
			)}
		</>
	);
};

export default Meeting;
