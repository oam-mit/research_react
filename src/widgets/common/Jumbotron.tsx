import React from "react";

type PropsType = {
	title: string;
	subtitle: string;
};
const Jumbotron: React.FunctionComponent<PropsType> = (props) => {
	return (
		<>
			<div
				className="jumbotron jumbotron-fluid text-white text-center my-3"
				id="jumbo-color"
			>
				<h3 className="display-1" id="jumbo-text">
					{props.title}
				</h3>
				<p className="lead my-4" style={{ fontFamily: "Quicksand" }}>
					{props.subtitle}
				</p>
				<br />
				{props.children}
			</div>
		</>
	);
};

export default Jumbotron;
