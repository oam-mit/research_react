import Swal from "sweetalert2";

export const yesNoAlert = async (
	title: string,
	text: string,
	confirmButtonText: string,
	cancelButtonText: string,
	icon: "error" | "warning"
) => {
	let value = await Swal.fire({
		title: title,
		text: text,
		confirmButtonText: confirmButtonText,
		cancelButtonText: cancelButtonText,
		showCancelButton: true,
		icon: icon,
	});

	return value.isConfirmed;
};

export const showLoadingAlert = () => {
	Swal.fire({
		html: `<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
            </div>`,
		showConfirmButton: false,
	});
};

export const showSuccessAlert = (text: string, onOkFunction?: () => void) => {
	Swal.fire({
		title: "Success",
		text: text,
		icon: "success",
	}).then(() => {
		if (onOkFunction) {
			onOkFunction();
		}
	});
};

export const showErrorAlert = (text: string, onOkFunction?: () => void) => {
	Swal.fire({
		title: "Error",
		text: text,
		icon: "error",
	}).then(() => {
		if (onOkFunction) {
			onOkFunction();
		}
	});
};

export const showNetworkError = () => {
	Swal.fire({
		title: "Error",
		text: "Please check your internet connection",
		icon: "error",
	});
};
