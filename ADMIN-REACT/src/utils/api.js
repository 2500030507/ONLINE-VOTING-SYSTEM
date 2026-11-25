async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The election API request failed.');
  return result;
}

export function getElection() {
  return request('/api/election');
}

export function saveSchedule(schedule) {
  return request('/api/schedule', {
    method: 'PUT',
    body: JSON.stringify({ schedule }),
  });
}

export function saveCandidates(candidates) {
  return request('/api/candidates', {
    method: 'PUT',
    body: JSON.stringify({ candidates }),
  });
}

export function getVotes() {
  return request('/api/votes');
}

export function publishResults() {
  return request('/api/results/publish', {
    method: 'POST',
  });
}
