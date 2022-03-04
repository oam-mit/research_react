const getTimeZone = () => {
	var timezone_offset = new Date().getTimezoneOffset();

	timezone_offset = -timezone_offset;

	let final_string = "";

	if (timezone_offset > 0) {
		final_string += "+";
	} else {
		final_string += "-";
	}

	timezone_offset = Math.abs(timezone_offset);

	let hrs = Math.floor(timezone_offset / 60.0);
	let mins = timezone_offset % 60;

	if (hrs > 10) {
		final_string += hrs;
	} else {
		final_string = `${final_string}0${hrs}`;
	}
	final_string += ":";
	final_string += mins;

	return final_string;
};

export default getTimeZone;
