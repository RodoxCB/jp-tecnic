export type InstagramMedia = {
  id: string;
  url: string;
  alt: string;
  permalink: string;
};

type InstagramNode = {
  id: string;
  shortcode: string;
  display_url?: string;
  thumbnail_src?: string;
  is_video?: boolean;
  accessibility_caption?: string | null;
  edge_media_to_caption?: { edges: { node: { text: string } }[] };
  edge_sidecar_to_children?: { edges: { node: InstagramNode }[] };
};

const INSTAGRAM_USERNAME = "jp_tecnic";
const DEFAULT_LIMIT = 9;

const INSTAGRAM_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "X-IG-App-ID": "936619743392459",
  "X-Requested-With": "XMLHttpRequest",
  Referer: "https://www.instagram.com/",
  Accept: "*/*",
  "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
};

/** Shortcodes conhecidos do perfil — usados se a API falhar */
const KNOWN_SHORTCODES = [
  "DaRo9Hhlhz8",
  "DaPD9FBloDe",
  "DaPDQHoFiMm",
  "DaPCprVFh1D",
  "DaO_Vy-lqEY",
  "DZww1F6FkRf",
  "DZhieTqkaQO",
] as const;

function getCaption(node: InstagramNode): string {
  const fromCaption = node.edge_media_to_caption?.edges[0]?.node.text;
  return node.accessibility_caption ?? fromCaption ?? "Trabalho feito pela JP Tecnic";
}

/** Primeira imagem de cada post (capa do feed, sem expandir carrossel inteiro) */
function coverImageFromPost(node: InstagramNode): InstagramMedia | null {
  const candidates =
    node.edge_sidecar_to_children?.edges.map(({ node: child }) => child) ?? [node];

  const image = candidates.find((item) => !item.is_video && (item.display_url || item.thumbnail_src));
  if (!image) return null;

  const url = image.display_url ?? image.thumbnail_src ?? "";
  if (!url) return null;

  return {
    id: image.id,
    url,
    alt: getCaption(node),
    permalink: `https://www.instagram.com/p/${node.shortcode}/`,
  };
}

function parseApiResponse(data: unknown, limit: number): InstagramMedia[] {
  const edges = (
    data as {
      data?: { user?: { edge_owner_to_timeline_media?: { edges: { node: InstagramNode }[] } } };
    }
  ).data?.user?.edge_owner_to_timeline_media?.edges;

  if (!edges?.length) return [];

  const images: InstagramMedia[] = [];
  for (const { node } of edges) {
    const cover = coverImageFromPost(node);
    if (cover) images.push(cover);
    if (images.length >= limit) break;
  }
  return images;
}

async function fetchFromProfileApi(limit: number): Promise<InstagramMedia[]> {
  const response = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`,
    { headers: INSTAGRAM_HEADERS, cache: "no-store" },
  );

  if (!response.ok) return [];

  const data = await response.json();
  return parseApiResponse(data, limit);
}

function extractShortcodesFromHtml(html: string, limit: number): string[] {
  const matches = html.matchAll(/"shortcode":"([A-Za-z0-9_-]+)"/g);
  const seen = new Set<string>();
  const shortcodes: string[] = [];

  for (const match of matches) {
    const code = match[1];
    if (seen.has(code)) continue;
    seen.add(code);
    shortcodes.push(code);
    if (shortcodes.length >= limit) break;
  }

  return shortcodes;
}

async function fetchOgImage(shortcode: string): Promise<string | null> {
  const response = await fetch(`https://www.instagram.com/p/${shortcode}/`, {
    headers: {
      ...INSTAGRAM_HEADERS,
      Accept: "text/html,application/xhtml+xml",
      Referer: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const html = await response.text();
  const match = html.match(/property="og:image" content="([^"]+)"/);
  return match ? match[1].replace(/&amp;/g, "&") : null;
}

async function fetchFromPostPages(shortcodes: string[]): Promise<InstagramMedia[]> {
  const images: InstagramMedia[] = [];

  for (const shortcode of shortcodes) {
    const url = await fetchOgImage(shortcode);
    if (!url) continue;

    images.push({
      id: shortcode,
      url,
      alt: "Trabalho feito pela JP Tecnic",
      permalink: `https://www.instagram.com/p/${shortcode}/`,
    });
  }

  return images;
}

async function resolveShortcodes(limit: number): Promise<string[]> {
  try {
    const response = await fetch(`https://www.instagram.com/${INSTAGRAM_USERNAME}/`, {
      headers: { ...INSTAGRAM_HEADERS, Accept: "text/html" },
      cache: "no-store",
    });

    if (response.ok) {
      const html = await response.text();
      const fromHtml = extractShortcodesFromHtml(html, limit);
      if (fromHtml.length > 0) return fromHtml;
    }
  } catch {
    // segue para shortcodes conhecidos
  }

  return [...KNOWN_SHORTCODES].slice(0, limit);
}

export async function fetchInstagramPosts(limit = DEFAULT_LIMIT): Promise<InstagramMedia[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 9);

  try {
    const fromApi = await fetchFromProfileApi(safeLimit);
    if (fromApi.length > 0) return fromApi;
  } catch {
    // tenta fallback
  }

  try {
    const shortcodes = await resolveShortcodes(safeLimit);
    const fromPosts = await fetchFromPostPages(shortcodes);
    if (fromPosts.length > 0) return fromPosts.slice(0, safeLimit);
  } catch {
    // sem imagens
  }

  return [];
}
