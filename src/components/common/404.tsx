const NotFound = () => {
	return (
		<div
			className="jumbotron jumbotron-fluid text-white text-center my-3"
			id="jumbo-color"
		>
			<h3 className="display-1" id="jumbo-text">
				Sorry !
			</h3>
			<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
				The page you are looking for does not exist !
			</p>
			<br />
		</div>
	);
};

export default NotFound;
