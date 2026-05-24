import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    announcements[]{ text, href },
    navLinks[]{ label, href, highlighted },
    footerLinks[]{ label, href },
    defaultSeo{
      title,
      description,
      ogImage
    }
  }
`;

export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage"][0]{
    hero{
      ratingText,
      headline,
      subhead,
      ctaLabel,
      ctaHref,
      ctaNote,
      image
    }
  }
`;

export const LANDING_PAGE_QUERY = groq`
  *[_type == "landingPage" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    noindex,
    seo,
    pageBuilder[]{ ... }
  }
`;

export const LANDING_PAGE_SLUGS_QUERY = groq`
  *[_type == "landingPage" && defined(slug.current)]{ "slug": slug.current }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(featured desc, _createdAt desc){
    author, role, quote, rating, avatar, featured
  }
`;

export const CUSTOMER_PROFILES_QUERY = groq`
  *[_type == "customerProfile"] | order(order asc){ label, headline, body }
`;

export const FAQ_QUERY = groq`
  *[_type == "faqItem" && section == $section] | order(order asc){
    question, answer
  }
`;

export const PRODUCT_CONTENT_QUERY = groq`
  *[_type == "productContent" && handle == $handle][0]{
    subtitle,
    sections[]{ ... },
    showTestimonials,
    showPersonas
  }
`;
