/**
 * Formats a date string into a localized long date format.
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export default function getFormattedDate(dateString: string): string {
  let date: Date;

  // Check if the input is a valid timestamp
  if (!isNaN(Number(dateString))) {
    date = new Date(Number(dateString));
  } else {
    date = new Date(dateString);
  }

  // Check if the date is valid.
  if (isNaN(date.getTime())) {
    console.error(`Invalid date value: ${dateString}`);
    throw new Error("Invalid time value");
  }

  // Use the Intl.DateTimeFormat constructor to create a formatter.
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  // Use the formatter to format the date string.
  return formatter.format(date);
}
