export const convertMinutesToHours = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} hour${hours != 1 ? "s" : ""} ${minutes} minute${minutes != 1 ? "s" : ""}`;
};
