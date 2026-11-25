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

export function castVote(voterId, candidate) {
  return request('/api/votes', {
    method: 'POST',
    body: JSON.stringify({ voterId, candidate }),
  });
}
