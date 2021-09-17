import React, { Component } from "react";
import UserProvider from "../../providers/UserProvider";
import Tags from "../common/Tags";
import {
	ProjectAddContext,
	SubmitDataType,
	ContextType,
} from "../../backend/faculty/ProjectAddProvider";

type StateType = {
	submit_data: SubmitDataType;
	page: number;
};

class ProjectAdd extends Component<{}, StateType> {
	constructor(props: any) {
		super(props);
		this.state = {
			submit_data: {
				title: "",
				description: "",
				tags: "",
				is_department_specific: false,
				max_students: 1,
				start_date: "",
				end_date: "",
				is_extendable: false,
				outcome: "",
				hours_per_week: 0,
			},
			page: 1,
		};
	}

	changeHandler(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		this.setState(prev => {
			return {
				submit_data: {
					...prev.submit_data,
					[event.target.name]: event.target.value,
				},
			};
		});
	}

	render_difference_between_dates() {
		let start_date = new Date(this.state.submit_data.start_date);
		let end_date = new Date(this.state.submit_data.end_date);
		let diff = (end_date.getTime() - start_date.getTime()) / 1000;
		diff /= 60 * 60 * 24 * 7;
		return Math.abs(Math.round(diff));
	}

	togglePage(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		page: number
	) {
		event.preventDefault();
		this.setState({ page: page });
	}

	render_form(props: ContextType) {
		if (this.state.page === 1) {
			return (
				<>
					<legend>Basic Information</legend>
					<div className="form-group">
						<label htmlFor="exampleFormControlInput1">Title</label>
						<input
							value={this.state.submit_data.title}
							onChange={event => this.changeHandler(event)}
							name="title"
							type="text"
							className="form-control"
							id="exampleFormControlInput1"
							placeholder="What is the project called?"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleFormControlTextarea1">Description</label>
						<textarea
							value={this.state.submit_data.description}
							onChange={event => this.changeHandler(event)}
							name="description"
							className="form-control"
							id="exampleFormControlTextarea1"
							rows={4}
							placeholder="Describe the project"
						></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="exampleFormControlTextarea2">Outcome</label>
						<textarea
							value={this.state.submit_data.outcome}
							onChange={event => this.changeHandler(event)}
							name="outcome"
							className="form-control"
							id="exampleFormControlTextarea2"
							rows={4}
							placeholder="Outcome (example Publication)"
						></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="tags">
							Tags (Separate each one with '<b>,</b>')
						</label>
						<input
							type="text"
							className="form-control"
							id="tags"
							name="tags"
							value={this.state.submit_data.tags}
							onChange={event => this.changeHandler(event)}
						/>
						<span id="passwordHelpBlock" className="form-text text-muted">
							<Tags
								tag_string={this.state.submit_data.tags}
								bootstrap_color={"secondary"}
							/>
						</span>
					</div>
					<div className="center-btn text-center">
						<button
							disabled={
								this.state.submit_data.title.length === 0 ||
								this.state.submit_data.description.length === 0 ||
								this.state.submit_data.tags.length === 0 ||
								this.state.submit_data.outcome.length === 0
							}
							onClick={event => {
								this.togglePage(event, 2);
							}}
							className="btn btn-mystyle"
						>
							Next
						</button>
					</div>
				</>
			);
		} else if (this.state.page === 2) {
			return (
				<>
					<legend>Management Information</legend>
					<div className="form-group">
						<div className="form-check">
							<input
								checked={this.state.submit_data.is_department_specific}
								name="is_department_specific"
								onChange={event =>
									this.setState(prev => {
										return {
											submit_data: {
												...prev.submit_data,
												is_department_specific: event.target.checked,
											},
										};
									})
								}
								className="form-check-input"
								type="checkbox"
								id="department_specific"
							/>

							<label className="form-check-label" htmlFor="department_specific">
								Is your project restricted to your department?
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check">
							<input
								checked={this.state.submit_data.is_extendable}
								name="is_extendable"
								onChange={event =>
									this.setState(prev => {
										return {
											submit_data: {
												...prev.submit_data,
												is_extendable: event.target.checked,
											},
										};
									})
								}
								className="form-check-input"
								type="checkbox"
								id="department_specific"
							/>

							<label className="form-check-label" htmlFor="department_specific">
								Is there a possibility of extending this project to a longer
								duration (more than a year) ?
							</label>
						</div>
					</div>
					<div className="form-group ">
						<label htmlFor="max">Maximum number of students</label>
						<input
							onChange={event => this.changeHandler(event)}
							type="number"
							className="form-control col-2"
							id="max"
							name="max_students"
							min={1}
							value={this.state.submit_data.max_students}
						/>
					</div>
					<div className="form-group ">
						<label htmlFor="hrs">Hours per week</label>
						<input
							onChange={event => this.changeHandler(event)}
							type="number"
							className="form-control col-2"
							id="hrs"
							name="hours_per_week"
							min={1}
							value={this.state.submit_data.hours_per_week}
						/>
					</div>
					<div className="form-row">
						<div className="col-6">
							<label htmlFor="start_date">Start Date</label>
							<input
								value={this.state.submit_data.start_date}
								type="date"
								onChange={event => this.changeHandler(event)}
								name="start_date"
								className="form-control"
							/>
						</div>
						{this.state.submit_data.start_date.length > 0 ? (
							<div className="col">
								<label htmlFor="end_date">End Date</label>
								<input
									value={this.state.submit_data.end_date}
									type="date"
									onChange={event => this.changeHandler(event)}
									min={this.state.submit_data.start_date}
									name="end_date"
									className="form-control"
								/>
							</div>
						) : (
							<></>
						)}
					</div>

					<div className="center-btn text-center align-items-center mt-3">
						<div className="btn-group" role="group" aria-label="Basic example">
							<button
								className="btn mr-1"
								onClick={event => this.togglePage(event, 1)}
								style={{ backgroundColor: "#1d1e4e", color: "white" }}
							>
								Previous
							</button>
							<button
								className="btn"
								disabled={
									this.state.submit_data.max_students === 0 ||
									this.state.submit_data.start_date.length === 0 ||
									this.state.submit_data.end_date.length === 0 ||
									this.state.submit_data.hours_per_week === 0
								}
								onClick={event => this.togglePage(event, 3)}
								style={{ backgroundColor: "#1d1e4e", color: "white" }}
							>
								Next
							</button>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<legend>Review details</legend>
					<div className="form-group row">
						<label htmlFor="title" className="col-sm-2 col-form-label">
							Title
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								readOnly
								className="form-control-plaintext"
								id="title"
								value={this.state.submit_data.title}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="description" className="col-sm-2 col-form-label">
							Description
						</label>
						<div className="col-sm-10">
							<textarea
								readOnly
								rows={10}
								className="form-control-plaintext"
								id="descripion"
								value={this.state.submit_data.description}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="description" className="col-sm-2 col-form-label">
							Outcome
						</label>
						<div className="col-sm-10">
							<textarea
								readOnly
								rows={3}
								className="form-control-plaintext"
								id="descripion"
								value={this.state.submit_data.outcome}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="tags" className="col-sm-2 col-form-label">
							Tags
						</label>
						<div className="col-sm-10">
							<Tags
								tag_string={this.state.submit_data.tags}
								bootstrap_color={"secondary"}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label
							htmlFor="is_department_specific"
							className="col-sm-2 col-form-label"
						>
							Is your project restricted to your department?
						</label>
						<div className="col-sm-10">
							{this.state.submit_data.is_department_specific ? (
								<Tags tag_string={"Yes"} bootstrap_color={"success"} />
							) : (
								<Tags tag_string={"No"} bootstrap_color={"success"} />
							)}
						</div>
					</div>
					<div className="form-group row">
						<label
							htmlFor="is_department_specific"
							className="col-sm-2 col-form-label"
						>
							Is there a possibility of extending this project to a longer
							duration (more than a year) ?
						</label>
						<div className="col-sm-10">
							{this.state.submit_data.is_extendable ? (
								<Tags tag_string={"Yes"} bootstrap_color={"success"} />
							) : (
								<Tags tag_string={"No"} bootstrap_color={"success"} />
							)}
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="max_students" className="col-sm-2 col-form-label">
							Maximum number of students
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								readOnly
								className="form-control-plaintext"
								id="max_students"
								value={this.state.submit_data.max_students}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="max_students" className="col-sm-2 col-form-label">
							Hours per week
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								readOnly
								className="form-control-plaintext"
								id="max_students"
								value={this.state.submit_data.hours_per_week}
							/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-4">
							<label htmlFor="start_date">Start Date</label>
							<input
								readOnly
								type="date"
								className="form-control-plaintext"
								id="start_date"
								value={this.state.submit_data.start_date}
							/>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="inputPassword4">End Date</label>
							<input
								readOnly
								type="date"
								className="form-control-plaintext"
								id="end_date"
								value={this.state.submit_data.end_date}
							/>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="">Duration</label>
							<input
								readOnly
								type="text"
								className="form-control-plaintext"
								id="duration"
								value={`${this.render_difference_between_dates()} weeks`}
							/>
						</div>
					</div>

					<div className="center-btn text-center align-items-center mt-3">
						<div className="btn-group" role="group" aria-label="Basic example">
							<button
								className="btn mr-1"
								onClick={event => this.togglePage(event, 2)}
								style={{ backgroundColor: "#1d1e4e", color: "white" }}
							>
								Previous
							</button>
							<button
								className="btn"
								disabled={
									this.state.submit_data.max_students === 0 ||
									this.state.submit_data.start_date.length === 0 ||
									this.state.submit_data.end_date.length === 0 ||
									this.state.submit_data.title.length === 0 ||
									this.state.submit_data.description.length === 0 ||
									this.state.submit_data.tags.length === 0 ||
									props.submitted
								}
								type="submit"
								style={{ backgroundColor: "#1d1e4e", color: "white" }}
							>
								Submit
							</button>
						</div>
					</div>
				</>
			);
		}
	}

	submit_handler(event: React.FormEvent<HTMLFormElement>, props: ContextType) {
		event.preventDefault();
		props.submit_data(this.state.submit_data);
	}

	render() {
		return (
			<>
				<title>Faculty | New Project</title>
				<div
					className="jumbotron jumbotron-fluid text-white text-center my-3"
					id="jumbo-color"
				>
					<h3 className="display-1" id="jumbo-text">
						Add a new Project
					</h3>
				</div>
				<div className="container padding-custom">
					<div className="progress" style={{ height: "5px" }}>
						<div
							className="progress-bar progress-bar-striped progress-bar-animated"
							style={{
								width: `${JSON.stringify((100 * this.state.page) / 3)}%`,
							}}
							role="progressbar"
							aria-valuenow={Math.floor((100 * this.state.page) / 3)}
							aria-valuemin={0}
							aria-valuemax={100}
						></div>
					</div>
					<ProjectAddContext.Consumer>
						{props => (
							<form
								onSubmit={event => this.submit_handler(event, props)}
								className="my-4"
							>
								{this.render_form(props)}
							</form>
						)}
					</ProjectAddContext.Consumer>
				</div>
			</>
		);
	}
}

ProjectAdd.contextType = UserProvider;

export default ProjectAdd;
