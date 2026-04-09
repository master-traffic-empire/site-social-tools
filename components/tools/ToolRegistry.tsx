'use client';

import dynamic from 'next/dynamic';

const registry: Record<string, React.ComponentType> = {
  'instagram-comment-picker': dynamic(() => import('./CommentPicker')),
  'instagram-hashtag-generator': dynamic(() => import('./HashtagGenerator')),
  'instagram-caption-generator': dynamic(() => import('./CaptionGenerator')),
  'post-scheduler-planner': dynamic(() => import('./SchedulerPlanner')),
  'instagram-bio-generator': dynamic(() => import('./BioGenerator')),
  'tiktok-video-idea-generator': dynamic(() => import('./VideoIdeaGenerator')),
  'tiktok-trending-sounds': dynamic(() => import('./TrendingSounds')),
  'youtube-thumbnail-checker': dynamic(() => import('./ThumbnailChecker')),
  'youtube-title-generator': dynamic(() => import('./TitleGenerator')),
  'youtube-description-template': dynamic(() => import('./DescriptionTemplate')),
  'twitter-thread-formatter': dynamic(() => import('./ThreadFormatter')),
  'tweet-character-counter': dynamic(() => import('./TweetCounter')),
  'social-image-resizer': dynamic(() => import('./ImageResizer')),
  'social-media-calendar': dynamic(() => import('./SocialCalendar')),
  'engagement-rate-calculator': dynamic(() => import('./EngagementCalculator')),
};

export default function ToolRenderer({ slug }: { slug: string }) {
  const Component = registry[slug];
  if (!Component) return <div>Tool not found</div>;
  return <Component />;
}
