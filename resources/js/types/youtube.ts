/** Shape returned by PortalApiClient::fetchYoutubeVideos() - see src/api/youtube.ts in the old SPA. */
export interface YoutubeVideoDto {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}
