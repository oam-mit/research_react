import { useState } from "react";

const FeedbackForm = ({
	submit_handler,
}: {
	submit_handler: (feedback: string, completed: boolean) => void;
}) => {
	let [feedback, setFeedback] = useState<string>("");
	let [complete, setComplete] = useState<boolean>(false);

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				submit_handler(feedback, complete);
			}}
		>
			<div className="form-group">
				<label htmlFor="exampleFormControlTextarea1">Enter Feedback</label>
				<textarea
					value={feedback}
					onChange={event => setFeedback(event.target.value)}
					name="feedback"
					className="form-control"
					id="exampleFormControlTextarea1"
					rows={4}
					placeholder="Feedback"
				></textarea>
			</div>

			<div className="form-check">
				<input
					onChange={event => setComplete(event.target.checked)}
					checked={complete}
					name="project_is_complete"
					className="form-check-input"
					type="checkbox"
					id="project_is_complete"
				/>

				<label className="form-check-label" htmlFor="project_is_complete">
					Did the student complete the project ?
				</label>
			</div>
			<br />
			<br />
			<button
				className="btn"
				type="submit"
				style={{ backgroundColor: "#1d1e4e", color: "white" }}
				disabled={feedback.length === 0}
			>
				Submit
			</button>
		</form>
	);
};

export default FeedbackForm;
