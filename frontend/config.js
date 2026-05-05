// ===========================================
// API Configuration for Event Finance Manager
// ===========================================
// In production the backend serves the frontend, so the API lives at the same origin.
// In local dev, we probe multiple localhost ports to find the running server.

const isLocalHost = ["", "localhost", "127.0.0.1"].includes(window.location.hostname);

const LOCAL_API_FALLBACK_URLS = [
	"http://localhost:5001",
	"http://127.0.0.1:5001",
	"http://localhost:5000",
	"http://127.0.0.1:5000"
];

// In production, API is at the same origin (Express serves the frontend).
// No need to hardcode any deployment URL — it's always the current origin.
const API_FALLBACK_URLS = isLocalHost ? LOCAL_API_FALLBACK_URLS : [window.location.origin];
let API_BASE_URL = API_FALLBACK_URLS[0];

let resolvedApiBaseUrl = null;

async function resolveApiBaseUrl() {
	if (resolvedApiBaseUrl) return resolvedApiBaseUrl;

	let lastError = null;

	for (const baseUrl of API_FALLBACK_URLS) {
		try {
			const probe = await fetch(`${baseUrl}/events`);
			const contentType = probe.headers.get("content-type") || "";

			if (probe.ok && contentType.includes("application/json")) {
				resolvedApiBaseUrl = baseUrl;
				API_BASE_URL = baseUrl;
				return baseUrl;
			}

			lastError = new Error(`Probe failed at ${baseUrl}: HTTP ${probe.status}`);
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError || new Error("Unable to connect to backend API");
}

async function apiFetch(path, options = {}) {
	const baseUrl = await resolveApiBaseUrl();
	return fetch(`${baseUrl}${path}`, options);
}
