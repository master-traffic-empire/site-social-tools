export interface IGMedia {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  comments_count: number;
  like_count: number;
}

export interface IGComment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}

export interface IGProfile {
  id: string;
  name: string;
  username: string;
  profile_picture_url: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
}

const GRAPH_BASE = 'https://graph.facebook.com/v21.0';

async function graphGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${GRAPH_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Graph API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchRecentMedia(igUserId: string, token: string, limit = 25): Promise<IGMedia[]> {
  const data = await graphGet<{ data: IGMedia[] }>(`/${igUserId}/media`, {
    fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp,comments_count,like_count',
    limit: String(limit),
    access_token: token,
  });
  return data.data || [];
}

export async function fetchComments(mediaId: string, token: string): Promise<IGComment[]> {
  const allComments: IGComment[] = [];
  let url: string | null = `${GRAPH_BASE}/${mediaId}/comments?fields=id,text,username,timestamp&limit=100&access_token=${token}`;

  while (url) {
    const res: Response = await fetch(url);
    if (!res.ok) break;
    const data: { data?: IGComment[]; paging?: { next?: string } } = await res.json();
    if (data.data) {
      allComments.push(...data.data);
    }
    url = data.paging?.next || null;
  }

  return allComments;
}

export async function fetchProfile(igUserId: string, token: string): Promise<IGProfile> {
  return graphGet<IGProfile>(`/${igUserId}`, {
    fields: 'id,name,username,profile_picture_url,followers_count,follows_count,media_count',
    access_token: token,
  });
}
