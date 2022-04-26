import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showReactAlert = (
	title: string,
	body: JSX.Element,
	icon: "error" | "info",
	confirmButtonText = "OK"
) => {
	const ReactSwal = withReactContent(Swal);

	ReactSwal.fire({
		title: title,
		icon: icon,

		html: body,
		confirmButtonColor: "#0069d9",
		confirmButtonText: confirmButtonText,
	});
};
