import { useContext, useState } from "react";
import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from "react-google-login";
import {
	MeetingContext,
	OptionsType,
} from "../../../backend/faculty/project_management/MeetingProvider";
import { MultiSelect } from "react-multi-select-component";
import MeetingCard from "../../../widgets/common/MeetingCard";
import Spinner from "../../common/Spinner";
import LoadingCard from "../../../widgets/common/LoadingCard";
import getTimeZone from "../../../services/TimezoneService";
import { showErrorAlert } from "../../../services/AlertService";
import Jumbotron from "../../../widgets/common/Jumbotron";

const Meeting = () => {
	const state = useContext(MeetingContext);

	const [description, setDescription] = useState<string>("");
	const [start_date, setStartDate] = useState<string>("");
	const [numberOfHours, setNumberOfHours] = useState<number>(0);
	const [students, setStudent] = useState<Array<OptionsType>>([]);

	let options: OptionsType[] = [];
	state.accepted_applications.forEach((applicant) => {
		options.push({
			label: `${applicant.first_name} ${applicant.last_name} - ${applicant.registration_number}`,
			value: applicant.email,
		});
	});

	const get_end_date = (): string => {
		let end_date = new Date(`${start_date}${getTimeZone()}`);
		var tzoffset = new Date().getTimezoneOffset() * 60000;
		end_date.setHours(end_date.getHours() + numberOfHours);
		var localISOTime = new Date(end_date.getTime() - tzoffset)
			.toISOString()
			.slice(0, -1);
		return localISOTime;
	};

	let render_page = () => {
		if (state.loading) {
			return (
				<div className="container-fluid">
					<div className="row">
						<LoadingCard count={4} />
					</div>
				</div>
			);
		} else {
			return (
				<>
					<div className="container">
						{state.logged_in ? (
							<div className="row">
								<form
									className="my-4"
									onSubmit={(event) => {
										event.preventDefault();
										let end_date = get_end_date();

										state.create_meeting(
											description,
											start_date,
											end_date,
											students
										);
									}}
								>
									<legend>
										Enter details of the meeting. To change Date and time click
										on calendar icon
									</legend>
									<div className="form-group row">
										<label
											htmlFor="description"
											className="col-sm-2 col-form-label"
										>
											Description
										</label>
										<div className="col-sm-10">
											<textarea
												onChange={(event) => setDescription(event.target.value)}
												rows={3}
												className="form-control"
												id="descripion"
												value={description}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label
											htmlFor="start_date"
											className="col-sm-2 col-form-label"
										>
											Start Date
										</label>
										<div className="col-sm-4">
											<input
												type="datetime-local"
												onChange={(event) => setStartDate(event.target.value)}
												className="form-control"
												id="start_date"
												value={start_date}
											/>
										</div>
										<label
											htmlFor="end_date"
											className="col-sm-2 col-form-label"
										>
											Number of Hours
										</label>
										<div className="col-sm-4">
											<input
												type="number"
												min={0}
												onChange={(event) =>
													setNumberOfHours(parseInt(event.target.value))
												}
												className="form-control"
												id="number_of_hours"
												value={numberOfHours}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label
											htmlFor="description"
											className="col-sm-2 col-form-label"
										>
											Select students to invite for meeting
										</label>
										<div className="col-sm-6">
											<MultiSelect
												className="col-"
												options={options}
												value={students}
												onChange={setStudent}
												labelledBy="Select"
											/>
										</div>
									</div>
									<button
										className="btn btn-mystyle"
										disabled={
											description.length === 0 ||
											start_date.length === 0 ||
											numberOfHours === 0 ||
											students.length === 0
										}
										type="submit"
									>
										Submit
									</button>
								</form>
							</div>
						) : (
							<></>
						)}
					</div>
					<div className="container-fluid">
						<div className="row text-center">
							<div className="col-12">
								<h2 className="sub-heading-faculty">
									Past / Scheduled Meetings
								</h2>
							</div>
						</div>
						<div className="row">
							{state.meetings.map((meeting, index) => (
								<MeetingCard
									description={meeting.description}
									link={meeting.link}
									date_time={meeting.date_time}
									students={meeting.students}
									key={index}
								/>
							))}
						</div>
					</div>
				</>
			);
		}
	};

	return (
		<>
			<title>Meeting Management </title>
			<Jumbotron title="Meeting Management" subtitle="">
				{!state.logged_in ? (
					<GoogleLogin
						clientId="241052852049-q2i2tmdhpj2mrtfk1io78i833jkf0lh8.apps.googleusercontent.com"
						buttonText="Login to Google to create a meeting"
						onSuccess={(response) => {
							state.log_in((response as GoogleLoginResponse).accessToken);
						}}
						onFailure={(error) => {
							console.error(error);
						}}
						cookiePolicy={"single_host_origin"}
						scope={
							"openid email profile https://www.googleapis.com/auth/calendar"
						}
						accessType={"offline"}
					/>
				) : (
					<></>
				)}
			</Jumbotron>
			{render_page()}
		</>
	);
};

export default Meeting;
