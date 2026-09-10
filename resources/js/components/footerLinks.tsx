import type { ComponentType } from 'react';
import {
  AppleIcon,
  PlayStoreIcon,
  AmazonIcon,
  HuaweiIcon,
  TvIcon,
  InstagramIcon,
  FacebookIcon,
  XIcon,
  TikTokIcon,
  PinterestIcon,
  WhatsAppIcon,
  TelegramIcon,
} from './icons/BrandIcons';

export interface ExternalLink {
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
}

export const APP_LINKS: ExternalLink[] = [
  {
    label: 'iOS App Store',
    href: 'https://apps.apple.com/us/app/ghanatalksradio/id1511977360',
    Icon: AppleIcon,
  },
  {
    label: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.ghanatalksradio&hl=en&gl=US',
    Icon: PlayStoreIcon,
  },
  {
    label: 'Amazon App Store',
    href: 'https://www.amazon.co.uk/GhanaTalksRadio/dp/B0BRYP2LDN',
    Icon: AmazonIcon,
  },
  {
    label: 'Amazon Fire TV',
    href: 'https://www.amazon.com/gp/product/B0BT1ZLLDV',
    Icon: TvIcon,
  },
  {
    label: 'Huawei AppGallery',
    href: 'https://appgallery.huawei.com/app/C107577607',
    Icon: HuaweiIcon,
  },
  {
    label: 'Android TV',
    href: 'https://play.google.com/store/apps/details?id=com.ghanatalksradio.tv',
    Icon: TvIcon,
  },
];

export const SOCIAL_LINKS: ExternalLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/GhanaTalksRadio',
    Icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/GhanaTalksRadio',
    Icon: FacebookIcon,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/GhanaTalksRadio',
    Icon: XIcon,
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@GhanaTalksRadio',
    Icon: TikTokIcon,
  },
  {
    label: 'Pinterest',
    href: 'https://uk.pinterest.com/ghanatalksradio/',
    Icon: PinterestIcon,
  },
];

/** Community channels (join-the-channel, distinct from sharing-a-link — these are fixed destination URLs, not share intents). */
export const CHANNEL_LINKS: ExternalLink[] = [
  {
    label: 'WhatsApp Channel',
    href: 'https://www.whatsapp.com/channel/0029VaG3JNKId7nFeOZUsF3K',
    Icon: WhatsAppIcon,
  },
  {
    label: 'Telegram Channel',
    href: 'https://t.me/GhanaTalksRadio',
    Icon: TelegramIcon,
  },
];