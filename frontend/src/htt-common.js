export default async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) {
    const problem = await response.json().catch(() => ({}));
    const message = problem.errors
      ? Object.values(problem.errors).join(" ")
      : problem.detail || "Impossible de terminer la demande. Réessayez.";
    throw new Error(message);
  }
  return response.status === 204 ? null : response.json();
}
