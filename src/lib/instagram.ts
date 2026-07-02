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
const REVALIDATE_SECONDS = 3600;

function getCaption(node: InstagramNode): string {
  const fromCaption = node.edge_media_to_caption?.edges[0]?.node.text;
  return node.accessibility_caption ?? fromCaption ?? "Serviço realizado pela JP Tecnic";
}

function collectImagesFromNode(node: InstagramNode): InstagramMedia[] {
  const children = node.edge_sidecar_to_children?.edges.map(({ node: child }) => child) ?? [node];

  return children
    .filter((item) => !item.is_video)
    .map((item) => ({
      id: item.id,
      url: item.display_url ?? item.thumbnail_src ?? "",
      alt: getCaption(item),
      permalink: `https://www.instagram.com/p/${item.shortcode}/`,
    }))
    .filter((item) => item.url.length > 0);
}

export async function fetchInstagramPosts(limit = 12): Promise<InstagramMedia[]> {
  try {
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; JPTecnicBot/1.0)",
          "X-IG-App-ID": "936619743392459",
          "X-Requested-With": "XMLHttpRequest",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) return [];

    const data = (await response.json()) as {
      data?: {
        user?: {
          edge_owner_to_timeline_media?: { edges: { node: InstagramNode }[] };
        };
      };
    };

    const edges = data.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    const images: InstagramMedia[] = [];
    const seen = new Set<string>();

    for (const { node } of edges) {
      for (const image of collectImagesFromNode(node)) {
        if (seen.has(image.url)) continue;
        seen.add(image.url);
        images.push(image);
        if (images.length >= limit) return images;
      }
    }

    return images;
  } catch {
    return [];
  }
}
