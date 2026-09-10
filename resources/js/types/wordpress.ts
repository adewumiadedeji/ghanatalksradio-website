/**
 * Types for the WordPress REST API responses from wordpress.ghanatalksradio.com
 *
 * Confirmed live shape as of recon (no custom post types, no ACF, no Yoast
 * exposed yet). Only `post`, `page`, `attachment`, `wp_block` exist as types.
 * Everything (news, podcasts write-ups, etc.) is a `post` differentiated by
 * category, not by post type.
 */

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPImageSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WPMediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<string, WPImageSize>;
}

export interface WPFeaturedMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: WPRendered;
  author: number;
  caption: WPRendered;
  alt_text: string;
  media_type: 'image' | 'video' | 'text' | 'application' | 'audio';
  mime_type: string;
  media_details: WPMediaDetails;
  source_url: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls?: Record<string, string>;
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'category';
  parent: number;
  meta?: unknown[];
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'post_tag';
  meta?: unknown[];
}

/** A category with its children attached, built client-side from the flat list. */
export interface WPCategoryNode extends WPCategory {
  children: WPCategoryNode[];
}

export interface WPEmbedded {
  author?: WPAuthor[];
  'wp:featuredmedia'?: WPFeaturedMedia[];
  /** wp:term is an array of arrays: [categories[], tags[]] aligned to taxonomies on the post type */
  'wp:term'?: Array<Array<WPCategory | WPTag>>;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type: 'post';
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  categories: number[];
  tags: number[];
  _embedded?: WPEmbedded;
}

export interface WPPage {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: 'page';
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  parent: number;
  menu_order: number;
  featured_media: number;
  _embedded?: WPEmbedded;
}

/**
 * WP exposes total counts via response headers, not the body.
 * We capture them alongside the parsed array so list pages can paginate.
 */
export interface WPCollectionMeta {
  totalItems: number;
  totalPages: number;
}

export interface WPCollectionResult<T> {
  items: T[];
  meta: WPCollectionMeta;
}

/** Params accepted by GET /wp/v2/posts — only the ones we actually use. */
export interface GetPostsParams {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number[];
  tags?: number[];
  slug?: string[];
  orderby?: 'date' | 'title' | 'relevance' | 'modified';
  order?: 'asc' | 'desc';
  _embed?: boolean;
}

export interface GetCategoriesParams {
  page?: number;
  per_page?: number;
  parent?: number;
  hide_empty?: boolean;
  orderby?: 'name' | 'count' | 'id' | 'slug';
  order?: 'asc' | 'desc';
}
