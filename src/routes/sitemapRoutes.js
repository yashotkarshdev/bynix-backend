import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find().select("slug updatedAt");

    const baseUrl = "https://bynixtechnology.com";

    let urls = "";

    // Static pages
    const staticPages = [
      "",
      "/about",
      "/contact",
      "/blogs",
      "/services",
      "/services/seo-service",
      "/services/web-app-development-service",
      "/services/smm-service",
      "/services/saas-service",
      "/services/graphic-designing",
      "/terms",
      "/privacy",
      "/career"
    ];

    staticPages.forEach((page) => {
      urls += `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>monthly</changefreq>
          <priority>${page === "" ? "1.0" : "0.7"}</priority>
        </url>
      `;
    });

    // Dynamic blogs
    blogs.forEach((blog) => {
      urls += `
        <url>
          <loc>${baseUrl}/blogs/${blog.slug}</loc>
          <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);

  } catch (error) {
    res.status(500).send("Error generating sitemap");
  }
});

export default router;