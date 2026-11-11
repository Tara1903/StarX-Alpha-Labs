import { createClient } from '@/lib/supabase/server';
import { SERVICES_DATA, type ServiceItem } from '@/data/services';
import { DIVISIONS_DATA, type DivisionItem } from '@/data/divisions';
import { INDUSTRIES_DATA, type IndustryItem } from '@/data/industries';
import { PORTFOLIO_DATA, type PortfolioItem } from '@/data/portfolio';
import { BLOG_POSTS, type BlogPost } from '@/data/blog';

// ==============================================================================
// 1. SERVICES
// ==============================================================================

export async function getPublishedServices(): Promise<ServiceItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return SERVICES_DATA;
    }

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      shortDescription: row.short_description || '',
      category: row.category as ServiceItem['category'],
      categoryLabel: row.category_label || 'STARX DIGITAL',
      divisionSlug: row.division_slug,
      overview: row.description,
      benefits: (row.content as Record<string, unknown>)?.benefits as string[] || [],
      features: (row.content as Record<string, unknown>)?.features as string[] || [],
      techStack: (row.content as Record<string, unknown>)?.techStack as string[] || [],
      scope: (row.content as Record<string, unknown>)?.scope as string[] || [],
      estimatedTimeline: (row.content as Record<string, unknown>)?.estimatedTimeline as string || '2 – 4 Weeks',
      startingPrice: (row.content as Record<string, unknown>)?.startingPrice as string || '$2,400',
      faqs: (row.content as Record<string, unknown>)?.faqs as { question: string; answer: string }[] || [],
    }));
  } catch {
    return SERVICES_DATA;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) {
      return SERVICES_DATA.find((s) => s.slug === slug) || null;
    }

    return {
      slug: data.slug,
      title: data.title,
      shortDescription: data.short_description || '',
      category: data.category as ServiceItem['category'],
      categoryLabel: data.category_label || 'STARX DIGITAL',
      divisionSlug: data.division_slug,
      overview: data.description,
      benefits: (data.content as Record<string, unknown>)?.benefits as string[] || [],
      features: (data.content as Record<string, unknown>)?.features as string[] || [],
      techStack: (data.content as Record<string, unknown>)?.techStack as string[] || [],
      scope: (data.content as Record<string, unknown>)?.scope as string[] || [],
      estimatedTimeline: (data.content as Record<string, unknown>)?.estimatedTimeline as string || '2 – 4 Weeks',
      startingPrice: (data.content as Record<string, unknown>)?.startingPrice as string || '$2,400',
      faqs: (data.content as Record<string, unknown>)?.faqs as { question: string; answer: string }[] || [],
    };
  } catch {
    return SERVICES_DATA.find((s) => s.slug === slug) || null;
  }
}

// ==============================================================================
// 2. DIVISIONS
// ==============================================================================

export async function getPublishedDivisions(): Promise<DivisionItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('divisions')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DIVISIONS_DATA;
    }

    return data.map((row) => ({
      slug: row.slug,
      name: row.title,
      tagline: row.tagline || '',
      shortDescription: row.short_description || '',
      badge: row.badge || '',
      mission: row.mission || '',
      overview: row.overview || '',
      capabilities: (row.capabilities as unknown as { title: string; description: string }[]) || [],
      deliverables: (row.deliverables as unknown as string[]) || [],
      techStack: (row.tech_stack as unknown as string[]) || [],
    }));
  } catch {
    return DIVISIONS_DATA;
  }
}

export async function getDivisionBySlug(slug: string): Promise<DivisionItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('divisions')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) {
      return DIVISIONS_DATA.find((d) => d.slug === slug) || null;
    }

    return {
      slug: data.slug,
      name: data.title,
      tagline: data.tagline || '',
      shortDescription: data.short_description || '',
      badge: data.badge || '',
      mission: data.mission || '',
      overview: data.overview || '',
      capabilities: (data.capabilities as unknown as { title: string; description: string }[]) || [],
      deliverables: (data.deliverables as unknown as string[]) || [],
      techStack: (data.tech_stack as unknown as string[]) || [],
    };
  } catch {
    return DIVISIONS_DATA.find((d) => d.slug === slug) || null;
  }
}

// ==============================================================================
// 3. INDUSTRIES
// ==============================================================================

export async function getPublishedIndustries(): Promise<IndustryItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return INDUSTRIES_DATA;
    }

    return data.map((row) => ({
      slug: row.slug,
      name: row.name,
      badge: row.badge || '',
      tagline: row.tagline || '',
      overview: row.overview,
      challenges: (row.challenges as unknown as string[]) || [],
      solutions: (row.solutions as unknown as string[]) || [],
      featuredCapabilities: (row.featured_capabilities as unknown as string[]) || [],
      recommendedServices: (row.recommended_services as unknown as string[]) || [],
    }));
  } catch {
    return INDUSTRIES_DATA;
  }
}

export async function getIndustryBySlug(slug: string): Promise<IndustryItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) {
      return INDUSTRIES_DATA.find((i) => i.slug === slug) || null;
    }

    return {
      slug: data.slug,
      name: data.name,
      badge: data.badge || '',
      tagline: data.tagline || '',
      overview: data.overview,
      challenges: (data.challenges as unknown as string[]) || [],
      solutions: (data.solutions as unknown as string[]) || [],
      featuredCapabilities: (data.featured_capabilities as unknown as string[]) || [],
      recommendedServices: (data.recommended_services as unknown as string[]) || [],
    };
  } catch {
    return INDUSTRIES_DATA.find((i) => i.slug === slug) || null;
  }
}

// ==============================================================================
// 4. PORTFOLIO
// ==============================================================================

export async function getPublishedPortfolio(): Promise<PortfolioItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return PORTFOLIO_DATA;
    }

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      projectType: row.project_type as PortfolioItem['projectType'],
      category: row.category as PortfolioItem['category'],
      categoryLabel: row.category_label || 'Web & Corporate Portal',
      tagline: row.tagline || '',
      description: row.description,
      features: (row.features as unknown as string[]) || [],
      techStack: (row.tech_stack as unknown as string[]) || [],
      architectureHighlights: (row.architecture_highlights as unknown as string[]) || [],
      demoUrl: row.demo_url || undefined,
      githubUrl: row.github_url || undefined,
      verificationBadge: row.verification_badge || 'StarX Alpha Architecture Demo',
    }));
  } catch {
    return PORTFOLIO_DATA;
  }
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) {
      return PORTFOLIO_DATA.find((p) => p.slug === slug) || null;
    }

    return {
      slug: data.slug,
      title: data.title,
      projectType: data.project_type as PortfolioItem['projectType'],
      category: data.category as PortfolioItem['category'],
      categoryLabel: data.category_label || 'Web & Corporate Portal',
      tagline: data.tagline || '',
      description: data.description,
      features: (data.features as unknown as string[]) || [],
      techStack: (data.tech_stack as unknown as string[]) || [],
      architectureHighlights: (data.architecture_highlights as unknown as string[]) || [],
      demoUrl: data.demo_url || undefined,
      githubUrl: data.github_url || undefined,
      verificationBadge: data.verification_badge || 'StarX Alpha Architecture Demo',
    };
  } catch {
    return PORTFOLIO_DATA.find((p) => p.slug === slug) || null;
  }
}

// ==============================================================================
// 5. BLOG
// ==============================================================================

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return BLOG_POSTS;
    }

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      publishDate: row.published_at ? new Date(row.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'November 2026',
      author: row.author_name,
      authorRole: row.author_role || 'Platform Architecture',
      readTime: row.read_time || '5 min read',
      category: row.category as BlogPost['category'],
      summary: row.excerpt,
      content: row.content,
    }));
  } catch {
    return BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !data) {
      return BLOG_POSTS.find((b) => b.slug === slug) || null;
    }

    return {
      slug: data.slug,
      title: data.title,
      publishDate: data.published_at ? new Date(data.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'November 2026',
      author: data.author_name,
      authorRole: data.author_role || 'Platform Architecture',
      readTime: data.read_time || '5 min read',
      category: data.category as BlogPost['category'],
      summary: data.excerpt,
      content: data.content,
    };
  } catch {
    return BLOG_POSTS.find((b) => b.slug === slug) || null;
  }
}
