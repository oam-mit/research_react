import React, { Component } from "react";
import Swal from "sweetalert2";
import "../../assets/edit_prof.css";
import UserProvider from "../../providers/UserProvider";
import Spinner from "../common/Spinner";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			faculty: null,
			is_editable: false,
			submitted: false,
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.imageFormHandler = this.imageFormHandler.bind(this);
	}

	componentDidMount() {
		//code for fetching details

		this.setState({
			faculty: this.context.user,
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
							{/*{this.state.faculty.designation}.*/}{" "}
							{this.state.faculty.designation} {this.state.faculty.first_name}{" "}
							{this.state.faculty.last_name}
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

	imageUploadHandler(event) {
		this.setState(prev => {
			return {
				edit_details: {
					...prev.edit_details,
					profile_picture: event.target.files[0],
				},
			};
		});
	}

	imageFormHandler(event) {
		event.preventDefault();
		this.setState(
			{
				submitted: true,
			},
			() => {
				let form_data = new FormData();
				form_data.append(
					"profile_picture",
					this.state.edit_details.profile_picture
				);

				fetch("/faculty/api/update_profile_picture/", {
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
								},
								() => {
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

	render_edit_detials() {
		return (
			<div className="container prof_details">
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
							{/* <svg
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
							</svg> */}
						</span>
						<br />
						<div className="wrap_details">
							<form>
								<fieldset disabled={!this.state.is_editable}>
									<legend>Details</legend>
									<div className="form-row">
										{/* <div className="col-md-2 mb-3">
                                        <label className="label-style" htmlFor="designation">Designation</label>
                                        <input type="text" name="designation" className={`form-control${!this.state.is_editable ? '-plaintext': ''}`} id="designation" value={this.state.edit_details.designation} onChange={this.changeHandler}/>
                                    </div> */}
										<div className="col-md-5 mb-3">
											<label className="label-style" htmlFor="first_name">
												First Name
											</label>
											<input
												type="text"
												name="first_name"
												className={`form-control${
													!this.state.is_editable ? "-plaintext" : ""
												}`}
												id="first_name"
												value={this.state.edit_details.first_name}
												onChange={this.changeHandler}
											/>
										</div>
										<div className="col-md-5 mb-3">
											<label className="label-style" htmlFor="last_name">
												Last Name
											</label>
											<input
												type="text"
												name="last_name"
												className={`form-control${
													!this.state.is_editable ? "-plaintext" : ""
												}`}
												id="last_name"
												value={this.state.edit_details.last_name}
												onChange={this.changeHandler}
											/>
										</div>
									</div>
									{/* {this.state.is_editable ? (
										<div className="center-btn text-center">
											<button className="btn btn-mystyle">Submit</button>
										</div>
									) : (
										<></>
									)} */}
								</fieldset>
							</form>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="profile-image">
							{this.context.user.profile_picture ? (
								<img
									src={this.context.user.profile_picture}
									className="img-responsive profile_image"
									width="400"
									alt="Profile_image"
								/>
							) : (
								<img
									className="img-responsive profile_image"
									width="400"
									alt="Profile_image"
									src={"/media/default.jpg"}
								/>
							)}
							<form onSubmit={this.imageFormHandler}>
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										id="customFile"
										onChange={event => this.imageUploadHandler(event)}
										accept="image/*"
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{this.state.edit_details.profile_picture ? (
											<>
												Chosen file:{" "}
												{this.state.edit_details.profile_picture.name}
											</>
										) : (
											<>Upload Image</>
										)}
									</label>

									<div className="center-btn text-center my-5">
										<button type="submit" className="btn btn-mystyle">
											Update
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<>
				<title>Faculty | Profile</title>
				{this.render_display()}
			</>
		);
	}
}

Profile.contextType = UserProvider;

export default Profile;
