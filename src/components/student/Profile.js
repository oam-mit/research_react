import React, { Component } from "react";
import Swal from "sweetalert2";
import "../../assets/edit_prof.css";
import instance from "../../backend/student/axiosInstance";

import UserProvider from "../../providers/UserProvider";
import {
	showNetworkError,
	showSuccessAlert,
} from "../../services/AlertService";
import Spinner from "../common/Spinner";
import Tags from "../common/Tags";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			submitted: false,
			student: null,
			is_editable: false,
			cv: null,
			edit_details: null,
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.cvUploadSubmitHandler = this.cvUploadSubmitHandler.bind(this);
	}

	componentDidMount() {
		//code for fetching details

		this.setState({
			student: this.context.user,
			loading: false,
			edit_details: this.context.user,
		});
	}

	render_display() {
		if (!this.state.loading && !this.state.submitted) {
			return (
				<>
					<div
						className="jumbotron jumbotron-fluid text-white text-center my-3"
						id="jumbo-color"
					>
						<h3 className="display-1" id="jumbo-text">
							{this.state.student.first_name} {this.state.student.last_name}
						</h3>
						<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
							Welcome to the research portal!
						</p>
						<br />
					</div>
					{this.render_edit_detials()}
				</>
			);
		} else {
			return <Spinner position={"absolute"} size={50} />;
		}
	}

	changeHandler(event) {
		this.setState(prev => {
			return {
				edit_details: {
					...prev.edit_details,
					[event.target.name]: event.target.value,
				},
			};
		});
	}

	cvUploadChangeHandler(event) {
		this.setState(prev => {
			return {
				edit_details: {
					...prev.edit_details,
					cv: event.target.files[0],
				},
				cv: event.target.files[0],
			};
		});
	}
	cvUploadSubmitHandler(event) {
		event.preventDefault();
		this.setState(
			{
				submitted: true,
			},
			() => {
				let form_data = new FormData();
				form_data.append("cv", event.target.cv.files[0]);

				fetch("/student/api/submit_cv/", {
					method: "POST",
					body: form_data,
					headers: {
						"X-CSRFToken": this.context.getCookie("csrftoken"),
					},
				})
					.then(resp => resp.json())
					.then(data => {
						if (data.status === "successful") {
							this.setState(
								{
									submitted: false,
									cv: null,
								},
								() => {
									showSuccessAlert("Successfully uploaded your CV");
									this.context.updateUser(data.user);
								}
							);
						} else {
							this.setState(
								{
									submitted: false,
								},
								() => {
									Swal.fire({
										title: "Error",
										icon: "error",
										text: data.error,
									});
								}
							);
						}
					})
					.catch(err => console.log(err));
			}
		);
	}

	submitProfileUpdate = event => {
		event.preventDefault();
		this.setState(
			{
				submitted: true,
			},
			() => {
				let form_data = this.state.edit_details;

				instance
					.post("change_domains_of_interest/", form_data)
					.then(({ data }) => {
						if (data.status === "successful") {
							this.setState(
								{
									submitted: false,
								},
								() => {
									showSuccessAlert("Successfully Updated your profile");
									this.context.updateUser(this.state.edit_details);
								}
							);
						} else {
							this.setState(
								{
									submitted: false,
								},
								() => {
									Swal.fire({
										title: "Error",
										icon: "error",
										text: data.error,
									});
								}
							);
						}
					})
					.catch(_ => showNetworkError());
			}
		);
	};

	render_edit_detials() {
		return (
			<div className="container prof_details" style={{ height: "95vh" }}>
				<div className="row">
					<div className="col-lg-7 details_prof">
						<span className="sub_text">About me</span>
						<span
							className="icon-edit"
							onClick={() =>
								this.setState(prev => {
									return { is_editable: !prev.is_editable };
								})
							}
						>
							<svg
								width="2em"
								height="2em"
								viewBox="0 0 16 16"
								className="bi bi-pencil-fill"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
								/>
							</svg>
						</span>
						<br />
						<div className="wrap_details">
							<form onSubmit={this.submitProfileUpdate}>
								<fieldset disabled={!this.state.is_editable}>
									<legend>Details</legend>
									<div className="form-row">
										<div className="col-md-6 mb-3">
											<label htmlFor="first_name" className="label-style">
												First Name
											</label>
											<input
												type="text"
												readOnly
												name="first_name"
												className={`form-control-plaintext
												`}
												id="first_name"
												value={this.state.edit_details.first_name}
												// onChange={this.changeHandler}
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label htmlFor="last_name" className="label-style">
												Last Name
											</label>
											<input
												type="text"
												readOnly
												name="last_name"
												className={`form-control-plaintext
												`}
												id="last_name"
												value={this.state.edit_details.last_name}
												// onChange={this.changeHandler}
											/>
										</div>
										<div className="col-md-12 mb-3">
											<label htmlFor="last_name" className="label-style">
												Domains of interest (Separate by commas ',' )
											</label>
											<input
												type="text"
												name="domains_of_interest"
												className={`form-control
												`}
												id="last_name"
												value={this.state.edit_details.domains_of_interest}
												onChange={this.changeHandler}
											/>
											<span
												id="passwordHelpBlock"
												className="form-text text-muted"
											>
												<Tags
													tag_string={
														this.state.edit_details.domains_of_interest
															? this.state.edit_details.domains_of_interest
															: ""
													}
													bootstrap_color={"secondary"}
												/>
											</span>
										</div>
									</div>
									{this.state.is_editable ? (
										<div className="center-btn text-center">
											<button
												disabled={
													this.state.edit_details.domains_of_interest ===
														null ||
													this.state.edit_details.domains_of_interest.length ===
														0
												}
												type="submit"
												className="btn btn-mystyle"
											>
												Submit
											</button>
										</div>
									) : (
										<></>
									)}
								</fieldset>
							</form>
						</div>
					</div>
					<div className="col-lg-5">
						<form onSubmit={this.cvUploadSubmitHandler}>
							<legend>Upload CV</legend>
							<div className="custom-file">
								<input
									type="file"
									name="cv"
									className="custom-file-input"
									id="customFile"
									onChange={event => this.cvUploadChangeHandler(event)}
									accept="application/pdf"
								/>
								<label className="custom-file-label" htmlFor="customFile">
									{this.state.cv ? (
										<>Chosen file: {this.state.cv.name}</>
									) : (
										<>Upload File</>
									)}
								</label>
								{this.context.user.cv ? (
									<small id="fileHelp" className="form-text text-muted">
										Uploaded File:{" "}
										<a
											href={this.context.user.cv}
											rel="noreferrer"
											target="_blank"
										>
											Click here
										</a>
									</small>
								) : (
									<></>
								)}

								<button
									disabled={this.state.cv === null}
									type="submit"
									className="btn btn-mystyle my-5"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<>
				<title>Profile</title>
				{this.render_display()}
			</>
		);
	}
}

Profile.contextType = UserProvider;
export default Profile;
