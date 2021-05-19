const NoProjects = ({ message }: { message: string }) => {
	return (
		<div className="col-12">
			<div className="w3-container text-center" style={{ marginBottom: "6%" }}>
				<div className="text-center w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-hover-border-indigo">
					<h4>{message}</h4>
				</div>
			</div>
		</div>
	);
};

export default NoProjects;
