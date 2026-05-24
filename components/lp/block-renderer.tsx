import type { PageBlock } from "lib/sanity";
import { Cta, type CtaBlockData } from "./blocks/Cta";
import {
  EmailCapture,
  type EmailCaptureBlockData,
} from "./blocks/EmailCapture";
import {
  FeatureGrid,
  type FeatureGridBlockData,
} from "./blocks/FeatureGrid";
import { Hero, type HeroBlockData } from "./blocks/Hero";
import { ImageBlock, type ImageBlockData } from "./blocks/ImageBlock";
import { Manifesto, type ManifestoBlockData } from "./blocks/Manifesto";
import { Persona, type PersonaBlockData } from "./blocks/Persona";
import { Prose, type ProseBlockData } from "./blocks/Prose";

// Maps each Sanity block `_type` to its React component. Unknown types render
// nothing (forward-compatible: a new block in the CMS won't crash the page).
export function BlockRenderer({ blocks }: { blocks?: PageBlock[] }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <>
      {blocks.map((block) => {
        const key = block._key;
        switch (block._type) {
          case "heroBlock":
            return <Hero key={key} block={block as unknown as HeroBlockData} />;
          case "manifestoBlock":
            return (
              <Manifesto
                key={key}
                block={block as unknown as ManifestoBlockData}
              />
            );
          case "featureGridBlock":
            return (
              <FeatureGrid
                key={key}
                block={block as unknown as FeatureGridBlockData}
              />
            );
          case "personaBlock":
            return (
              <Persona
                key={key}
                block={block as unknown as PersonaBlockData}
              />
            );
          case "ctaBlock":
            return <Cta key={key} block={block as unknown as CtaBlockData} />;
          case "emailCaptureBlock":
            return (
              <EmailCapture
                key={key}
                block={block as unknown as EmailCaptureBlockData}
              />
            );
          case "proseBlock":
            return (
              <Prose key={key} block={block as unknown as ProseBlockData} />
            );
          case "imageBlock":
            return (
              <ImageBlock
                key={key}
                block={block as unknown as ImageBlockData}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
