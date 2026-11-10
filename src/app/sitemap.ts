import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { SERVICES_DATA } from "@/data/services";
import { DIVISIONS_DATA } from "@/data/divisions";
import { INDUSTRIES_DATA } from "@/data/industries";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/about",
    "/divisions",
    "/services",
    "/pricing",
    "/portfolio",
    "/industries",
    "/blog",
    "/contact",
    "/get-quote",
    "/book-consultation",
    "/privacy",
    "/terms",
    "/refund",
    "/cancellation",
    "/cookies",
    "/design-system",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/services") || route.startsWith("/divisions") ? 0.8 : 0.6,
  }));

  const divisionRoutes = DIVISIONS_DATA.map((d) => ({
    url: `${baseUrl}/divisions/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = SERVICES_DATA.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const industryRoutes = INDUSTRIES_DATA.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const portfolioRoutes = PORTFOLIO_DATA.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...divisionRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
