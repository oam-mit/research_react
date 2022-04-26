import TaskType from "../../backend/common/TaskType";
import clock from "../../assets/pending-clock.svg";

interface Base {
	task: TaskType;
}

interface FacultyEditingType extends Base {
	is_editable: true;
	change_task_status: (pk: number, change_to: boolean) => void;
}

interface StudentNonEditingType extends Base {
	is_editable: false;
}

const TaskCard = (props: FacultyEditingType | StudentNonEditingType) => {
	return (
		<>
			<ul className="list list-inline">
				<li className="d-flex justify-content-between">
					<div className="d-flex flex-row align-items-center">
						{props.task.status ? (
							<i
								className={`fa fa-check-circle checkicon
							}`}
							></i>
						) : (
							<img width={20} height={20} src={clock} />
						)}

						<div className="ml-2">
							<h6 className="mb-0">{props.task.description}</h6>
							<div className="d-flex flex-row mt-1 text-black-50 date-time">
								<div>
									<i className="fa fa-calendar-o"></i>
									<span className="ml-2">
										{props.task.student.first_name}{" "}
										{props.task.student.last_name} (
										{props.task.student.registration_number})
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="d-flex flex-row align-items-center">
						<div className="d-flex flex-column mr-2">
							{props.is_editable ? (
								<>
									<i
										style={{ cursor: "pointer" }}
										className="fa fa-ellipsis-h"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									></i>
									<div className="dropdown-menu">
										<span
											style={{ cursor: "pointer" }}
											className="dropdown-item"
											onClick={() => {
												props.change_task_status(
													props.task.pk,
													!props.task.status
												);
											}}
										>
											{props.task.status
												? "Mark Not completed"
												: "Mark completed"}
										</span>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
				</li>
			</ul>
		</>
	);
};

export default TaskCard;
