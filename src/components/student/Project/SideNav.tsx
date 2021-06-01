import { ProjectType } from "../../../backend/common/ProjectType";
import LoadingProject from "../../../widgets/student/LoadingProject";

const SideNav = (props: PropsType) => {
	const render_projects = () => {
		if (props.loading) {
			return (
				<>
					<LoadingProject count={4} />
				</>
			);
		}
		let project_names = props.projects.map(project => {
			if (props.selected_project === project.uuid_field) {
				return (
					<li className="active" key={project.uuid_field}>
						<a href="/" onClick={event => event.preventDefault()}>
							{project.title}
						</a>
					</li>
				);
			} else {
				return (
					<li key={project.uuid_field}>
						<a
							href="/"
							onClick={event => {
								event.preventDefault();
								props.select_project(project.uuid_field);
							}}
						>
							{project.title}
						</a>
					</li>
				);
			}
		});

		return project_names;
	};

	return (
		<main className="main ">
			<aside className="sidebar d-lg-block d-none">
				<header>
					<h2 className="header">Other projects from the dept</h2>
					<hr></hr>
				</header>

				<nav className="nav">
					<ul>{render_projects()}</ul>
				</nav>
			</aside>
		</main>
	);
};

export default SideNav;

type PropsType = {
	projects: Array<ProjectType>;
	selected_project: string;
	department_slug: string;
	select_project: (project_uuid: string) => void;
	loading: boolean;
};
