import { createServerFn } from "@tanstack/react-start";

const UPSTREAM = "https://api.fitcoapp.com/api/v1";

export interface CommunityPostAuthor {
  fullName: string;
  handle: string;
  avatarUrl: string | null;
  isVerified: boolean;
}

export interface CommunityPostCounts {
  comments: number;
  reactions: number;
  reposts: number;
}

export interface CommunityPost {
  id: string;
  caption: string | null;
  imageUrl: string | null;
  locationName: string | null;
  locationSubtitle: string | null;
  createdAt: string;
  author: CommunityPostAuthor;
  counts: CommunityPostCounts;
}

export type CommunityPostResult =
  | { status: "ok"; post: CommunityPost }
  | { status: "not-found" }
  | { status: "error" };

function sanitizeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 128);
}

export const fetchCommunityPost = createServerFn({ method: "GET" })
  .inputValidator((data: { postId: string }) => ({ postId: sanitizeId(data.postId) }))
  .handler(async ({ data }): Promise<CommunityPostResult> => {
    if (!data.postId) return { status: "not-found" };
    try {
      const res = await fetch(`${UPSTREAM}/social/public/posts/${encodeURIComponent(data.postId)}`, {
        headers: { Accept: "application/json" },
      });
      if (res.status === 404) return { status: "not-found" };
      if (!res.ok) return { status: "error" };
      const post = (await res.json()) as CommunityPost;
      return { status: "ok", post };
    } catch {
      return { status: "error" };
    }
  });