import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    announcements[]{ text, href },
    navLinks[]{ label, href },
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
