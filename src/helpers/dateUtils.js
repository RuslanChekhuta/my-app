const DEFAULT_DATE_OPTIONS = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const formatDateTime = (
  dateString,
  locale = "ru-RU",
  options = DEFAULT_DATE_OPTIONS
) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString(locale, options);
};

export default formatDateTime;
