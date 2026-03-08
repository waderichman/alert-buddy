import { Headline, Topic } from "@/lib/types";

type FeedResponse = {
  items: Headline[];
  lastUpdatedLabel: string;
  dataSourceLabel: string;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function fetchJson<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("Missing API base URL");
  }

  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchTopics(): Promise<Topic[]> {
  if (!API_BASE_URL) {
    throw new Error("Missing API base URL");
  }

  const response = await fetchJson<{ items: Topic[] }>("/api/topics");
  return response.items;
}

export async function fetchFeed(): Promise<FeedResponse> {
  if (!API_BASE_URL) {
    throw new Error("Missing API base URL");
  }

  return await fetchJson<FeedResponse>("/api/feed");
}
