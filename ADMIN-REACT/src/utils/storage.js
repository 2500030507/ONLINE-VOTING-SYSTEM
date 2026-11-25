export function readStorage(key, fallback) {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
}

export function getElectionStatus(schedule) {
  if (!schedule) return null;
  const now = new Date();
  const opening = new Date(`${schedule.date}T${schedule.start}`);
  const closing = new Date(`${schedule.date}T${schedule.end}`);
  if (now < opening) return 'upcoming';
  return now < closing ? 'open' : 'closed';
}
