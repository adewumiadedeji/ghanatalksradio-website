//#region resources/js/utils/podcastContent.ts
/** Formats an ISO date string for display, e.g. "23 June 2026". */
function formatEpisodeDate(dateString) {
	const isoSafe = dateString.replace(" ", "T");
	const date = new Date(isoSafe);
	if (Number.isNaN(date.getTime())) return dateString;
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
/**
* Formats start/end times as a "7:00 AM – 10:00 AM" range for display,
* or just the start time when there's no end (the current backend has no
* broadcast-end-time concept - episodes only carry a single publish
* timestamp, so `endDate` is always empty now).
*/
function formatEpisodeTimeRange(startDate, endDate) {
	const formatTime = (s) => {
		const isoSafe = s.replace(" ", "T");
		const date = new Date(isoSafe);
		if (Number.isNaN(date.getTime())) return "";
		return date.toLocaleTimeString("en-GB", {
			hour: "numeric",
			minute: "2-digit"
		});
	};
	const start = formatTime(startDate);
	if (!start) return "";
	const end = endDate ? formatTime(endDate) : "";
	if (!end) return start;
	return `${start} – ${end}`;
}
//#endregion
export { formatEpisodeTimeRange as n, formatEpisodeDate as t };
