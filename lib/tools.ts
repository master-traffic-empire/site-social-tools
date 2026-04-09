export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  category: Category;
  icon: string; // lucide icon name
  metaTitle: string;
  metaDescription: string;
  faq: { q: string; a: string }[];
  howTo: string[];
}

export type Category = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'cross-platform';

export const categories: Record<Category, { label: string; color: string }> = {
  instagram: { label: 'Instagram', color: '#E1306C' },
  tiktok: { label: 'TikTok', color: '#00f2ea' },
  youtube: { label: 'YouTube', color: '#FF0000' },
  twitter: { label: 'Twitter / X', color: '#1DA1F2' },
  'cross-platform': { label: 'Cross-Platform', color: '#8B5CF6' },
};

export const tools: Tool[] = [
  {
    slug: 'instagram-comment-picker',
    name: 'Instagram Comment Picker',
    shortName: 'Comment Picker',
    description: 'Connect Instagram and randomly pick a giveaway winner from real post comments.',
    longDescription: 'Connect your Instagram Business account to pull real comments from any post, or paste comments manually. Filter duplicates, exclude accounts, set minimum word count, and watch the animated winner selection with confetti.',
    category: 'instagram',
    icon: 'Gift',
    metaTitle: 'Free Instagram Comment Picker — Random Winner Generator | SocialKit',
    metaDescription: 'Pick a random winner from Instagram comments for giveaways. Connect Instagram to pull real comments or paste manually. Filter duplicates, exclude accounts, animated selection.',
    faq: [
      { q: 'How does the comment picker work?', a: 'Connect your Instagram Business account via Facebook Login to automatically pull comments from any post. Or paste comments manually. Configure filters (duplicates, word count, excluded accounts), click Pick Winner, and watch the animated selection.' },
      { q: 'Do I need to connect my Instagram account?', a: 'No. You can paste comments manually in the "Paste Comments" tab. However, connecting your Instagram Business account lets you pull real comments automatically, which is faster and ensures you have all comments.' },
      { q: 'What type of Instagram account do I need?', a: 'To use the auto-fetch feature, you need an Instagram Business or Creator account connected to a Facebook Page. Personal accounts cannot access the Instagram Graph API.' },
      { q: 'Is the selection truly random?', a: 'Yes. We use the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers, ensuring a fair and unbiased selection.' },
      { q: 'Can I pick multiple winners?', a: 'Yes. Set the number of winners before picking, and the tool will select that many unique winners from the comment pool.' },
      { q: 'Is my data safe?', a: 'Your access token is stored only in your browser session and is never sent to our servers. All processing happens client-side. When you close the tab, the token is gone.' },
    ],
    howTo: [
      'Click "Connect Instagram" and log in with your Facebook account.',
      'Select the Instagram post you want to pick winners from.',
      'Comments are fetched automatically from the Instagram API.',
      'Configure filters: remove duplicates, set minimum word count, exclude specific accounts.',
      'Set the number of winners you want to pick.',
      'Click "Pick Winner" and watch the animated selection with confetti.',
      'Copy the winner result to share.',
      'Alternative: switch to "Paste Comments" tab to enter comments manually.',
    ],
  },
  {
    slug: 'instagram-hashtag-generator',
    name: 'Instagram Hashtag Generator',
    shortName: 'Hashtag Generator',
    description: 'Generate relevant hashtags grouped by popularity for any topic.',
    longDescription: 'Enter your topic or niche and get curated hashtag suggestions organized by reach level: top (high competition), medium, and niche (low competition). Copy sets optimized for maximum reach.',
    category: 'instagram',
    icon: 'Hash',
    metaTitle: 'Free Instagram Hashtag Generator — Find Best Hashtags by Topic | SocialKit',
    metaDescription: 'Generate Instagram hashtags for any topic. Get hashtags grouped by popularity — top, medium, and niche. Copy optimized sets for maximum reach. Free tool.',
    faq: [
      { q: 'How many hashtags should I use on Instagram?', a: 'Instagram allows up to 30 hashtags per post, but studies suggest 3-5 highly relevant hashtags often perform best. Mix top, medium, and niche hashtags for optimal reach.' },
      { q: 'How are hashtags categorized?', a: 'Top hashtags have very high usage (millions of posts), medium hashtags have moderate usage (100K-1M posts), and niche hashtags are more specific with lower competition, giving your content a better chance of being discovered.' },
      { q: 'Are these hashtags updated?', a: 'Our hashtag database covers common topics and niches. For trending hashtags, we recommend combining our suggestions with your own research on current trends.' },
    ],
    howTo: [
      'Enter your topic, niche, or keywords in the search field.',
      'Browse generated hashtags grouped by popularity tier.',
      'Click individual hashtags to add them to your selection.',
      'Or click "Copy All" on a tier to copy that entire group.',
      'Paste the hashtags into your Instagram post or first comment.',
    ],
  },
  {
    slug: 'instagram-caption-generator',
    name: 'Instagram Caption Generator',
    shortName: 'Caption Generator',
    description: 'Generate caption templates with tone selection and emoji suggestions.',
    longDescription: 'Enter your topic and choose a tone (funny, professional, casual, inspirational, edgy) to generate ready-to-use Instagram caption templates complete with call-to-action suggestions.',
    category: 'instagram',
    icon: 'MessageSquare',
    metaTitle: 'Free Instagram Caption Generator — Create Engaging Captions | SocialKit',
    metaDescription: 'Generate Instagram captions for any topic and tone. Choose funny, professional, casual, or inspirational styles. Free caption templates with CTAs.',
    faq: [
      { q: 'Can I customize the tone?', a: 'Yes. Choose from five tone presets: funny, professional, casual, inspirational, and edgy. Each generates captions with a different voice and style.' },
      { q: 'Should I use emojis in my captions?', a: 'Emojis can increase engagement by making your caption more visually appealing and easier to scan. Our tool suggests relevant emojis for each caption.' },
    ],
    howTo: [
      'Enter your post topic or what the photo/video is about.',
      'Select your preferred tone (funny, professional, casual, etc.).',
      'Browse the generated caption options.',
      'Click to copy any caption you like.',
      'Paste into Instagram and customize further if needed.',
    ],
  },
  {
    slug: 'post-scheduler-planner',
    name: 'Post Scheduler Planner',
    shortName: 'Scheduler Planner',
    description: 'Visual weekly calendar showing optimal posting times per platform.',
    longDescription: 'Plan your social media content with a visual weekly calendar showing the best times to post on each platform based on engagement data. Drag and drop to schedule your posts.',
    category: 'instagram',
    icon: 'Calendar',
    metaTitle: 'Free Social Media Post Scheduler Planner — Best Times to Post | SocialKit',
    metaDescription: 'Plan your social media posts with a visual weekly calendar. See the best times to post on Instagram, TikTok, YouTube, and Twitter. Free planner tool.',
    faq: [
      { q: 'How are the best posting times determined?', a: 'Best times are based on aggregated engagement data from industry studies. Actual best times vary by audience, so use these as starting points and adjust based on your analytics.' },
      { q: 'Can I save my schedule?', a: 'Your schedule is saved in your browser\'s local storage, so it persists between visits on the same device.' },
    ],
    howTo: [
      'Select the platform(s) you post on.',
      'View the heatmap showing optimal posting times.',
      'Click on time slots to add your planned posts.',
      'Add a note or content type for each scheduled slot.',
      'Export your weekly plan or take a screenshot.',
    ],
  },
  {
    slug: 'instagram-bio-generator',
    name: 'Instagram Bio Generator',
    shortName: 'Bio Generator',
    description: 'Generate Instagram bio options with formatting and line breaks.',
    longDescription: 'Enter your name, niche, and key details to generate polished Instagram bio options. Each bio is formatted with line breaks, special characters, and calls-to-action.',
    category: 'instagram',
    icon: 'User',
    metaTitle: 'Free Instagram Bio Generator — Create the Perfect Bio | SocialKit',
    metaDescription: 'Generate Instagram bio options instantly. Enter your name and niche, get formatted bios with line breaks and CTAs. Free bio generator tool.',
    faq: [
      { q: 'How long can an Instagram bio be?', a: 'Instagram bios have a 150-character limit. All our generated bios stay within this limit.' },
      { q: 'Can I include line breaks?', a: 'Yes. Our generated bios use proper line break formatting that works on Instagram. Copy and paste directly.' },
    ],
    howTo: [
      'Enter your name or brand name.',
      'Select your niche or profession.',
      'Add any keywords or details you want included.',
      'Browse generated bio options.',
      'Click to copy and paste into your Instagram profile.',
    ],
  },
  {
    slug: 'tiktok-video-idea-generator',
    name: 'TikTok Video Idea Generator',
    shortName: 'Video Ideas',
    description: 'Get trending video ideas with hooks and content formats for your niche.',
    longDescription: 'Enter your niche and get creative video ideas tailored for TikTok, including opening hooks, content format suggestions, and trending audio style recommendations.',
    category: 'tiktok',
    icon: 'Video',
    metaTitle: 'Free TikTok Video Idea Generator — Trending Content Ideas | SocialKit',
    metaDescription: 'Generate TikTok video ideas for any niche. Get hooks, formats, and trending content suggestions. Free idea generator for creators.',
    faq: [
      { q: 'How do I make my TikTok go viral?', a: 'Focus on a strong hook in the first 1-3 seconds, keep it short and engaging, use trending sounds, and post consistently. Our tool helps with the creative ideation part.' },
      { q: 'What video formats work best on TikTok?', a: 'Popular formats include storytime, day-in-my-life, tutorials, before/after, POV, duets, and trending challenges. The tool suggests formats based on your niche.' },
    ],
    howTo: [
      'Enter your niche or content area.',
      'Optionally select a content format preference.',
      'Browse generated video ideas with hooks.',
      'Click to save ideas you like.',
      'Use the hook and format suggestions as starting points for your videos.',
    ],
  },
  {
    slug: 'tiktok-trending-sounds',
    name: 'Trending Sound Finder',
    shortName: 'Trending Sounds',
    description: 'Browse trending sound categories and content ideas for TikTok.',
    longDescription: 'Explore trending sound categories on TikTok with content ideas for each. Discover what types of videos work best with different sound styles and music genres.',
    category: 'tiktok',
    icon: 'Music',
    metaTitle: 'TikTok Trending Sound Finder — Sound Categories & Ideas | SocialKit',
    metaDescription: 'Discover trending TikTok sound categories and get content ideas for each. Find the right sound style for your niche. Free tool.',
    faq: [
      { q: 'How do I find trending sounds on TikTok?', a: 'Check TikTok\'s Creative Center, browse the For You page, and use our tool to explore sound categories and content ideas. Trending sounds change weekly.' },
      { q: 'Should I always use trending sounds?', a: 'Using trending sounds can boost discovery, but original audio also works well for certain content types like tutorials and storytimes.' },
    ],
    howTo: [
      'Browse trending sound categories.',
      'Click a category to see content ideas for that sound style.',
      'Note which content formats work best with each sound type.',
      'Open TikTok and search for sounds in the suggested categories.',
      'Create your video using the content idea paired with the right sound.',
    ],
  },
  {
    slug: 'youtube-thumbnail-checker',
    name: 'YouTube Thumbnail Text Checker',
    shortName: 'Thumbnail Checker',
    description: 'Upload an image, overlay text, and preview at YouTube thumbnail size.',
    longDescription: 'Test your YouTube thumbnail readability before publishing. Upload an image, add overlay text, adjust font size and position, then preview at actual YouTube thumbnail sizes to ensure your text is legible.',
    category: 'youtube',
    icon: 'Image',
    metaTitle: 'Free YouTube Thumbnail Text Checker — Preview Readability | SocialKit',
    metaDescription: 'Check if your YouTube thumbnail text is readable. Upload image, overlay text, preview at real thumbnail sizes. Free readability checker.',
    faq: [
      { q: 'What is the ideal YouTube thumbnail size?', a: 'YouTube recommends 1280x720 pixels with a 16:9 aspect ratio. Thumbnails are displayed at various sizes from 168x94 (search results on mobile) to 336x188 (homepage).' },
      { q: 'How many words should thumbnail text have?', a: 'Keep it to 3-5 words maximum. Text should be readable even at the smallest thumbnail size. Use large, bold fonts with high contrast.' },
    ],
    howTo: [
      'Click "Upload Image" or drag and drop your thumbnail image.',
      'Add overlay text using the text input.',
      'Adjust font size, color, and position.',
      'Preview at different thumbnail sizes (small, medium, large).',
      'Ensure text is readable at the smallest preview size.',
    ],
  },
  {
    slug: 'youtube-title-generator',
    name: 'YouTube Title Generator',
    shortName: 'Title Generator',
    description: 'Generate click-worthy YouTube titles with character count.',
    longDescription: 'Enter your video topic and generate engaging YouTube title options. Each title shows character count and follows proven patterns for high click-through rates.',
    category: 'youtube',
    icon: 'Type',
    metaTitle: 'Free YouTube Title Generator — Click-Worthy Video Titles | SocialKit',
    metaDescription: 'Generate engaging YouTube video titles. See character counts, use proven title patterns. Free title generator for YouTubers.',
    faq: [
      { q: 'How long should a YouTube title be?', a: 'YouTube titles can be up to 100 characters, but titles under 60 characters tend to perform best as they don\'t get cut off in search results.' },
      { q: 'What makes a good YouTube title?', a: 'Good titles are specific, create curiosity, include relevant keywords, and set clear expectations. Numbers, power words, and questions tend to increase click-through rates.' },
    ],
    howTo: [
      'Enter your video topic or main keyword.',
      'Optionally select a title style (how-to, listicle, curiosity gap, etc.).',
      'Browse generated title options with character counts.',
      'Click to copy your preferred title.',
      'Titles under 60 characters are highlighted as optimal length.',
    ],
  },
  {
    slug: 'youtube-description-template',
    name: 'YouTube Description Template',
    shortName: 'Description Template',
    description: 'Fill-in-the-blank YouTube description with timestamps section.',
    longDescription: 'Create professional YouTube video descriptions with a fill-in-the-blank template. Includes sections for summary, timestamps, links, social media, and SEO-optimized keywords.',
    category: 'youtube',
    icon: 'FileText',
    metaTitle: 'Free YouTube Description Template Generator — With Timestamps | SocialKit',
    metaDescription: 'Create YouTube video descriptions with timestamps, links, and keywords. Fill-in-the-blank template generator. Free tool.',
    faq: [
      { q: 'Why are YouTube descriptions important?', a: 'Descriptions help YouTube understand your video content for search ranking. The first 2-3 lines appear in search results, so front-load important keywords and information.' },
      { q: 'How do timestamps work?', a: 'Add timestamps in MM:SS format in your description (e.g., 0:00 Intro). YouTube automatically creates clickable chapters from these timestamps.' },
    ],
    howTo: [
      'Fill in your video title and topic.',
      'Add timestamp entries with their labels.',
      'Fill in your social media links.',
      'Add relevant keywords and tags.',
      'Click "Generate" to create the full description.',
      'Copy and paste into your YouTube video description.',
    ],
  },
  {
    slug: 'twitter-thread-formatter',
    name: 'Twitter Thread Formatter',
    shortName: 'Thread Formatter',
    description: 'Split long text into tweet-sized chunks with numbering.',
    longDescription: 'Paste long-form text and automatically split it into tweet-sized chunks (280 characters). Smart splitting respects word boundaries, adds thread numbering, and lets you preview the entire thread.',
    category: 'twitter',
    icon: 'Split',
    metaTitle: 'Free Twitter Thread Formatter — Split Text Into Tweets | SocialKit',
    metaDescription: 'Split long text into tweet-sized threads with numbering. Smart splitting at 280 characters respecting word boundaries. Free thread formatter.',
    faq: [
      { q: 'What is the character limit for tweets?', a: 'Regular tweets have a 280-character limit. Our formatter accounts for thread numbering (e.g., "1/5") in the character count.' },
      { q: 'Does it split mid-word?', a: 'No. The formatter splits at word boundaries and tries to break at sentence endings or natural pause points for better readability.' },
    ],
    howTo: [
      'Paste or type your long-form text in the input area.',
      'Choose whether to include thread numbering (e.g., 1/5, 2/5).',
      'Click "Split Into Thread" to format.',
      'Review each tweet in the preview.',
      'Copy individual tweets or the entire thread.',
    ],
  },
  {
    slug: 'tweet-character-counter',
    name: 'Tweet Character Counter',
    shortName: 'Tweet Counter',
    description: 'Real-time character counter with tweet preview.',
    longDescription: 'Type your tweet and see real-time character count with a visual progress indicator. Preview how your tweet will look, with warnings as you approach the 280-character limit.',
    category: 'twitter',
    icon: 'LetterText',
    metaTitle: 'Free Tweet Character Counter — Real-Time Counter & Preview | SocialKit',
    metaDescription: 'Count tweet characters in real-time with visual progress. See preview of your tweet as you type. Free character counter tool.',
    faq: [
      { q: 'What is the Twitter/X character limit?', a: 'Regular tweets are limited to 280 characters. Twitter Premium users may have higher limits, but 280 is the standard.' },
      { q: 'Do URLs count toward the limit?', a: 'Twitter wraps all URLs in t.co links, which count as 23 characters regardless of the actual URL length.' },
    ],
    howTo: [
      'Start typing your tweet in the text area.',
      'Watch the real-time character count update.',
      'The progress bar changes color as you approach 280 characters.',
      'Preview how your tweet will look on Twitter.',
      'Copy the tweet when you are satisfied with the length.',
    ],
  },
  {
    slug: 'social-image-resizer',
    name: 'Social Media Image Resizer',
    shortName: 'Image Resizer',
    description: 'Resize and crop images for all social media platform dimensions.',
    longDescription: 'Upload any image and resize/crop it for specific social media platforms. Supports Instagram post, story, reel; TikTok video; YouTube thumbnail; Twitter header and more. All processing happens in your browser.',
    category: 'cross-platform',
    icon: 'Crop',
    metaTitle: 'Free Social Media Image Resizer — Resize for All Platforms | SocialKit',
    metaDescription: 'Resize images for Instagram, TikTok, YouTube, Twitter, and more. Crop to exact platform dimensions. Free client-side image resizer.',
    faq: [
      { q: 'What image sizes does it support?', a: 'We support all major platform sizes: Instagram post (1080x1080), story (1080x1920), YouTube thumbnail (1280x720), Twitter header (1500x500), TikTok (1080x1920), and more.' },
      { q: 'Is my image uploaded to a server?', a: 'No. All image processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device.' },
      { q: 'What file formats are supported?', a: 'You can upload JPG, PNG, WebP, and GIF images. Output is available in JPG or PNG format.' },
    ],
    howTo: [
      'Click "Upload Image" or drag and drop an image.',
      'Select the target platform and format (e.g., Instagram Post 1080x1080).',
      'Adjust the crop area by dragging.',
      'Preview the result.',
      'Click "Download" to save the resized image.',
    ],
  },
  {
    slug: 'social-media-calendar',
    name: 'Social Media Calendar',
    shortName: 'Posting Calendar',
    description: 'View optimal posting times for each social media platform.',
    longDescription: 'See the best times to post on Instagram, TikTok, YouTube, Twitter, and LinkedIn based on aggregated engagement data. Interactive heatmap shows optimal time slots for each day of the week.',
    category: 'cross-platform',
    icon: 'CalendarDays',
    metaTitle: 'Free Social Media Calendar — Best Times to Post in 2025 | SocialKit',
    metaDescription: 'Find the best times to post on Instagram, TikTok, YouTube, and Twitter. Interactive heatmap calendar. Free social media scheduling tool.',
    faq: [
      { q: 'Are these times in my timezone?', a: 'Yes. The calendar automatically adjusts to your local timezone based on your browser settings.' },
      { q: 'How accurate are these posting times?', a: 'These are based on aggregated industry data. Your specific audience may differ, so use these as starting points and adjust based on your own analytics.' },
    ],
    howTo: [
      'Select the platform you want to optimize for.',
      'View the weekly heatmap showing engagement levels by hour.',
      'Green/bright cells indicate the best posting times.',
      'Click on cells to see detailed engagement data.',
      'Plan your content schedule around the high-engagement time slots.',
    ],
  },
  {
    slug: 'engagement-rate-calculator',
    name: 'Engagement Rate Calculator',
    shortName: 'Engagement Calc',
    description: 'Calculate engagement rate from real Instagram data or enter metrics manually.',
    longDescription: 'Connect your Instagram account to calculate engagement rate from real post data, or enter metrics manually. Compare against industry benchmarks by platform, see per-post breakdown, and understand your performance tier.',
    category: 'cross-platform',
    icon: 'TrendingUp',
    metaTitle: 'Free Engagement Rate Calculator — Real Data + Industry Benchmarks | SocialKit',
    metaDescription: 'Calculate your social media engagement rate from real Instagram data or manually. Compare to industry benchmarks by platform and follower count. Free calculator.',
    faq: [
      { q: 'What is a good engagement rate?', a: 'On Instagram, 1-3% is average, 3-6% is good, and above 6% is excellent. TikTok averages are higher (3-9%). Rates vary significantly by niche and follower count.' },
      { q: 'How is engagement rate calculated?', a: 'Engagement rate = (total engagements / followers) x 100. Engagements typically include likes, comments, shares, and saves.' },
      { q: 'Can I use my real Instagram data?', a: 'Yes. Connect your Instagram Business account via Facebook Login and we will calculate your engagement rate from your actual recent posts -- no manual entry needed.' },
    ],
    howTo: [
      'Select your platform (Instagram supports real data integration).',
      'For Instagram: click "Connect Instagram" to auto-calculate from real data.',
      'Or enter your follower count and average likes, comments, shares manually.',
      'View your calculated engagement rate with a visual rating.',
      'Compare your rate against industry benchmarks by follower tier.',
      'For Instagram, see a per-post engagement breakdown.',
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(slug: string, limit = 3): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  const sameCat = tools.filter((t) => t.category === tool.category && t.slug !== slug);
  const others = tools.filter((t) => t.category !== tool.category && t.slug !== slug);
  return [...sameCat, ...others].slice(0, limit);
}
