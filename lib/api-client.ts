import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  headers: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
};

class APIClient {
  private async fetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const { method = "GET", headers, body } = options as FetchOptions;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>("/videos");
  }

  async getVideo(id: string) {
    return this.fetch<IVideo>(`/video/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    return this.fetch("/videos", {
      headers: defaultHeaders,
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new APIClient();
