// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import BlogDetailPage from './index';

// Define the blog posts data (same as in your components)
const BLOG_POSTS = [
  { slug: "future-of-luxury-real-estate-dubai" },
  { slug: "wellness-amenities-transforming-property-value" },
  { slug: "dubai-real-estate-investment-2025" },
  { slug: "sustainable-living-dubai-developments" },
  { slug: "ai-smart-homes-real-estate" },
  { slug: "coastal-living-dubai-beachfront-properties" },
];

// Generate static params for all blog posts
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  // Find the blog post title (you can fetch from your data source)
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  return {
    title: `${post?.slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Blog'} | Fakhruddin Properties`,
    description: '',
    robots: 'noindex, nofollow',
  };
}

export default function Page({ params }: Props) {
  return <BlogDetailPage />;
}