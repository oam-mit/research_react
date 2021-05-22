import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
			<span className="badge badge-light">
				{!selected ? (
					<FontAwesomeIcon icon={faTimes} />
				) : (
					<FontAwesomeIcon icon={faCheck} />
				)}
			</span>{" "}
			{tag}
		</span>
	);
};

export default FilterTag;
