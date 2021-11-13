import React from "react";

const Tags = ({
	tag_string,
	bootstrap_color,
	className,
}: {
	tag_string: string;
	bootstrap_color: string;
	className?: string;
}) => {
	let output = tag_string
		.split(",")
		.filter(tag => tag !== "")
		.map((tag, index) => {
			return (
				<span
					key={index}
					className={`badge badge-${bootstrap_color} mr-1 ${className}`}
				>
					{tag.trim()}
				</span>
			);
		});

	if (output.length > 0) {
		return <>{output}</>;
	} else {
		return <></>;
	}
};

export default Tags;
