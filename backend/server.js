const fs = require("fs");
const path = require("path");
const http = require("http");
const { topics } = require("./topics");

loadEnvFile();

const { refreshFeed } = require("./feed-service");

const PORT = Number(process.env.PORT || 4000);

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const contents = fs.readFileSync(envPath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    response.end();
    return;
  }

  try {
    if (url.pathname === "/api/health") {
      sendJson(response, 200, { ok: true, service: "alertbuddy-backend" });
      return;
    }

    if (url.pathname === "/api/topics") {
      sendJson(response, 200, { items: topics });
      return;
    }

    if (url.pathname === "/api/feed") {
      const payload = await refreshFeed(url.searchParams.get("refresh") === "1");
      sendJson(response, 200, payload);
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    sendJson(response, 500, {
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`AlertBuddy backend listening on http://0.0.0.0:${PORT}`);
});
