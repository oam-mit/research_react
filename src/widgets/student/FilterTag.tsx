const FilterTag = ({
	tag,
	onSelect,
	onUnSelect,
	selected,
}: {
	tag: string;
	onSelect: () => void;
	onUnSelect: () => void;
	selected: boolean;
}) => {
	const toggle = () => {
		if (!selected) {
			onSelect();
		} else {
			onUnSelect();
		}
	};

	return (
		<span
			style={{ cursor: "pointer" }}
			onClick={() => toggle()}
			className={`badge badge-${selected ? "success" : "danger"} mr-1`}
		>
			{tag}
		</span>
	);
};

export default FilterTag;
