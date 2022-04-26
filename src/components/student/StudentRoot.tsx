import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import Department from "./Department";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectRoot from "./Project/ProjectRoot";
import Applications from "./Applications";
import NotFound from "../common/404";
import DepartmentProvider from "../../backend/student/DepartmentProvider";
import HomeProvider from "../../backend/student/HomeProvider";
import ApplicationProvider from "../../backend/student/ApplicationProvider";
import ProjectProvider from "../../backend/student/ProjectProvider";
import WorkingOn from "./WorkingOn";
import WorkingOnProvider from "../../backend/student/WorkingOnProvider";

class StudentRoot extends Component<{}, StateType> {
	constructor(props: any) {
		super(props);
		this.state = {
			showNavbar: true,
		};
	}

	toggleNavbar = (value: boolean) => {
		this.setState(() => {
			return {
				showNavbar: value,
			};
		});
	};

	render() {
		return (
			<>
				{this.state.showNavbar && <Navbar />}
				<Switch>
					<Route
						path="/student/home"
						render={() => (
							<HomeProvider>
								<Home />
							</HomeProvider>
						)}
					/>

					<Route path="/student/profile" render={() => <Profile />} />

					<Route
						path="/student/department/:department_slug"
						render={() => (
							<DepartmentProvider>
								<Department />
							</DepartmentProvider>
						)}
					/>

					<Route
						path="/student/:department_slug/project/:uuid_field"
						render={() => (
							<ProjectProvider
								toggleNavbar={(value: boolean) => {
									this.toggleNavbar(value);
								}}
							>
								<ProjectRoot />
							</ProjectProvider>
						)}
					/>

					<Route
						path="/student/applications"
						render={() => (
							<ApplicationProvider>
								<Applications />
							</ApplicationProvider>
						)}
					/>

					<Route
						path="/student/working_on"
						render={() => (
							<WorkingOnProvider>
								<WorkingOn />
							</WorkingOnProvider>
						)}
					/>

					<Route path="/student/not-found" render={() => <NotFound />} />
				</Switch>
			</>
		);
	}
}

type StateType = {
	showNavbar: boolean;
};

export default StudentRoot;
