import { useState } from "react";
import { ApplicantType } from "../../backend/faculty/types/ApplicantType";

type PropsType = {
	create_task: (description: string, student: ApplicantType) => void;
	accepted_applications: ApplicantType[];
};

const TaskCreateForm = (props: PropsType) => {
	let [description, setDescription] = useState("");
	let [student, setStudent] = useState<ApplicantType>();

	const selectStudent = (email: string) => {
		if (email.indexOf("@") === -1) {
			setStudent(undefined);
			return;
		}

		for (let i = 0; i < props.accepted_applications.length; i++) {
			if (props.accepted_applications[i].email === email) {
				setStudent(props.accepted_applications[i]);
				break;
			}
		}
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				props.create_task(description, student!);
			}}
		>
			<div className="form-group">
				<label htmlFor="exampleFormControlTextarea1">Enter Description</label>
				<input
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					name="description"
					className="form-control"
					id="exampleFormControlTextarea1"
					type="text"
					placeholder="Description"
				/>
			</div>

			<div className="form-group">
				<label className="form-check-label" htmlFor="project_is_complete">
					Select Student to assign the task
				</label>
				<select
					onChange={(event) => selectStudent(event.target.value)}
					className="form-control"
					aria-label="Default select example"
				>
					<option selected>Open this select menu</option>
					{props.accepted_applications.map((applicant, index) => (
						<option value={applicant.email} key={index}>
							{applicant.first_name} {applicant.last_name} -{" "}
							{applicant.registration_number}
						</option>
					))}
				</select>
			</div>
			<br />
			<br />
			<button
				className="btn"
				type="submit"
				style={{ backgroundColor: "#1d1e4e", color: "white" }}
				disabled={description.length === 0 || student === undefined}
			>
				Submit
			</button>
		</form>
	);
};

export default TaskCreateForm;
