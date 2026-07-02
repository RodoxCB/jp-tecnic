import galleryData from "@/data/gallery.json";

export type GalleryItem = {
  id: string;
  url: string;
  title: string;
  permalink: string;
};

export function getGallery(limit?: number): GalleryItem[] {
  const items = galleryData.gallery as GalleryItem[];
  return limit ? items.slice(0, limit) : items;
}
