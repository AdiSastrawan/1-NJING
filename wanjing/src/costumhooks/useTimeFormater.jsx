import {} from "react";

const formatDate = (dateString) => {
    const options = { dateStyle: "medium", timeStyle: "short" };

    return new Intl.DateTimeFormat(undefined, options).format(
        Date.parse(dateString)
    );
};
export default function useTimeFormater(dateString) {
    return { date: formatDate(dateString) };
}
