import { ApplicantType } from "../../backend/faculty/types/ApplicantType";
import Tags from "../../components/common/Tags";

type PropsType = {
	applicant: ApplicantType;
	feebackHandler: (applicant: ApplicantType) => void;
};

const AcceptedApplicationCard = ({ applicant, feebackHandler }: PropsType) => {
	const submitFeedback = () => {
		feebackHandler(applicant);
	};

	return (
		<tr key={applicant.registration_number}>
			<th scope="row">{applicant.registration_number}</th>
			<th>
				{applicant.first_name} {applicant.last_name}
			</th>
			<th>{applicant.department}</th>
			<th>
				{" "}
				<Tags
					tag_string={
						applicant.domains_of_interest
							? applicant.domains_of_interest
							: "Not Provided"
					}
					bootstrap_color="secondary"
				/>{" "}
			</th>
			<th>
				<a
					href={applicant.cv}
					target="_blank"
					rel="noreferrer"
					style={{ color: "red" }}
				>
					Click Here
				</a>
			</th>
			<th>
				<a href={`mailto:${applicant.email}`}>{applicant.email}</a>
			</th>
			<th>
				<a
					href={applicant.feedback}
					target="_blank"
					rel="noreferrer"
					style={{ color: "red" }}
				>
					<button
						onClick={() => submitFeedback()}
						style={{
							color: "red",
							border: "none",
							backgroundColor: "white",
							outline: "none",
						}}
					>
						Click Here
					</button>
				</a>
			</th>
		</tr>
	);
};

export default AcceptedApplicationCard;
