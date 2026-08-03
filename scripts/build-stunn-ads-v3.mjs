import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const imageRoot = path.join(projectRoot, "public/images");
const defaultOutputRoot = path.join(
  projectRoot,
  "creative/ads/STUNN-Better-Decaf-Ads-v3",
);
const outputRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : defaultOutputRoot;
const squareDir = path.join(outputRoot, "square-1x1");
const portraitDir = path.join(outputRoot, "portrait-4x5");

const [displayFont, bodyFont, boldFont] = await Promise.all([
  fs.readFile("/System/Library/Fonts/Supplemental/Arial Black.ttf"),
  fs.readFile("/System/Library/Fonts/Supplemental/Arial.ttf"),
  fs.readFile(path.join(projectRoot, "fonts/Inter-Bold.ttf")),
]);

const fontCss = `
  @font-face {
    font-family: "STUNN Display";
    src: url(data:font/truetype;base64,${displayFont.toString("base64")});
    font-weight: 900;
  }
  @font-face {
    font-family: "STUNN Body";
    src: url(data:font/truetype;base64,${bodyFont.toString("base64")});
    font-weight: 400;
  }
  @font-face {
    font-family: "STUNN Bold";
    src: url(data:font/truetype;base64,${boldFont.toString("base64")});
    font-weight: 700;
  }
`;

const colors = {
  purple: "#5A3493",
  cream: "#F5F2EA",
  lilac: "#E9E2F7",
  ink: "#111111",
  white: "#FFFFFF",
};

const formats = {
  square: { width: 1080, height: 1080, footer: 56 },
  portrait: { width: 1080, height: 1350, footer: 56 },
};

const ads = [
  {
    number: "01",
    slug: "01-coffee-culture-went-too-far",
    headline: "COFFEE CULTURE WENT TOO FAR.",
    headlineLines: ["COFFEE CULTURE", "WENT TOO FAR."],
    subhead: "Keep the cup. / Lose the caffeine loop.",
    subheadLines: ["Keep the cup.", "Lose the caffeine loop."],
    source: "stunn-sachet-pour.png",
    sourcePosition: { square: "centre", portrait: "centre" },
    layout: "top-left-scrim",
    headlineSize: 91,
  },
  {
    number: "02",
    slug: "02-nervous-system-tax",
    headline: "COFFEE NEVER REQUIRED A NERVOUS SYSTEM TAX.",
    headlineLines: ["COFFEE NEVER REQUIRED", "A NERVOUS SYSTEM", "TAX."],
    subhead: "Calm focus, without / paying for it in tension.",
    subheadLines: ["Calm focus, without", "paying for it in tension."],
    source: "stunn-function-pour-corrected.png",
    sourcePosition: { square: "centre", portrait: "centre" },
    layout: "top-left-scrim",
    headlineSize: 66,
  },
  {
    number: "03",
    slug: "03-3pm-sleep-decision",
    headline: "WHEN DID 3PM COFFEE BECOME A SLEEP DECISION?",
    headlineLines: ["WHEN DID 3PM COFFEE", "BECOME A SLEEP", "DECISION?"],
    subhead: "Real coffee ritual. / No stimulant tax.",
    subheadLines: ["Real coffee ritual.", "No stimulant tax."],
    source: "stunn-rested-morning-v1.webp",
    sourcePosition: { square: "centre", portrait: "centre" },
    lockupSource: "stunn-home-hero-mobile-product.png",
    layout: "upper-right-payoff",
    headlineSize: 68,
  },
  {
    number: "04",
    slug: "04-why-pay-more-for-less",
    headline: "WHY PAY MORE FOR LESS?",
    headlineLines: ["WHY PAY MORE", "FOR LESS?"],
    subhead: "Real coffee ritual. / No stimulant tax.",
    subheadLines: ["Real coffee ritual.", "No stimulant tax."],
    // ON HOLD - do not export. Biasing the crop low to clear the headline made
    // the pack's Supplement Facts panel fully legible, and the artwork on
    // stunn-home-hero-mobile-product.png is an OLD formula: L-Theanine 400mg,
    // Rhodiola 100mg, Magnesium 50mg, CoQ10 50mg, "Servings Per Container 10",
    // 3.5g sticks, NET WT 35g. The product we actually ship is lion's mane
    // 300mg / rhodiola 250mg / cordyceps 100mg / L-theanine 100mg / decaf
    // coffee 1500mg, 2.25g per sachet, 30 sachets, 67.5g. Running this would
    // advertise a formula, a count and a net weight we do not sell.
    // Re-enable only with corrected pack photography.
    cropGravity: "bottom",
    hold: true,
    source: "stunn-home-hero-mobile-product.png",
    sourcePosition: { square: "centre", portrait: "west" },
    layout: "centred-product",
    headlineSize: 102,
  },
  {
    number: "05",
    slug: "05-stop-rationing-focus",
    headline: "STOP RATIONING FOCUS.",
    headlineLines: ["STOP RATIONING", "FOCUS."],
    subhead: "Steady attention shouldn't / expire after lunch.",
    subheadLines: ["Steady attention shouldn’t", "expire after lunch."],
    source: "stunn-ritual-morning-woman-v1.webp",
    sourcePosition: { square: "east", portrait: "east" },
    lockupSource: "stunn-home-hero-mobile-product.png",
    layout: "left-rail-human",
    headlineSize: 79,
  },
  {
    number: "06",
    slug: "06-no-jitters-no-apology",
    headline: "NO JITTERS. NO APOLOGY.",
    headlineLines: ["NO JITTERS.", "NO APOLOGY."],
    subhead: "Keep the cup. / Lose the caffeine loop.",
    subheadLines: ["Keep the cup.", "Lose the caffeine loop."],
    source: "stunn-ritual-afternoon-man-v1.webp",
    sourcePosition: { square: "east", portrait: "east" },
    lockupSource: "stunn-home-hero-mobile-product.png",
    layout: "bottom-anchor-human",
    headlineSize: 91,
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function textLines(values, x, y, lineHeight, className, anchor = "start") {
  return values
    .map(
      (value, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" text-anchor="${anchor}" class="${className}">${escapeXml(value)}</text>`,
    )
    .join("\n");
}

function styles(headlineSize, subheadSize = 34) {
  return `
    ${fontCss}
    .display {
      font-family: "STUNN Display", Arial, sans-serif;
      font-size: ${headlineSize}px;
      font-weight: 900;
      fill: ${colors.ink};
      letter-spacing: -1.8px;
    }
    .eyebrow {
      font-family: "STUNN Bold", Arial, sans-serif;
      font-size: 24px;
      font-weight: 700;
      fill: ${colors.purple};
      letter-spacing: 1.2px;
    }
    .subhead {
      font-family: "STUNN Body", Arial, sans-serif;
      font-size: ${subheadSize}px;
      font-weight: 400;
      fill: ${colors.ink};
    }
    .cta {
      font-family: "STUNN Bold", Arial, sans-serif;
      font-size: 29px;
      font-weight: 700;
      fill: ${colors.white};
      letter-spacing: .6px;
    }
    .offer {
      font-family: "STUNN Bold", Arial, sans-serif;
      font-size: 24px;
      font-weight: 700;
      fill: ${colors.purple};
      letter-spacing: .2px;
    }
  `;
}

// Measure a rendered headline line with the actual renderer and font, then trim
// to the ink bounding box. Hand-authored headlineLines + headlineSize have no
// safety net otherwise: ad 03 shipped with "WHEN DID 3PM COFFEE" running off the
// right edge because nothing ever checked the indent against the canvas.
const measureCache = new Map();
async function measureLine(text, fontSize) {
  const key = `${fontSize}|${text}`;
  if (measureCache.has(key)) return measureCache.get(key);
  const svg = Buffer.from(`
    <svg width="3000" height="${Math.ceil(fontSize * 2.2)}" xmlns="http://www.w3.org/2000/svg">
      <style>${styles(fontSize)}</style>
      <text x="10" y="${Math.round(fontSize * 1.25)}" class="display">${escapeXml(text)}</text>
    </svg>`);
  const { info } = await sharp(svg).png().trim().toBuffer({ resolveWithObject: true });
  measureCache.set(key, info.width);
  return info.width;
}

const RIGHT_MARGIN = 62;

/** Left inset of the headline for a layout, matching overlaySvg(). */
function headlineX(layout) {
  return layout === "upper-right-payoff" ? 334 : 62;
}

/**
 * Shrink headlineSize until every pre-authored line fits inside the canvas.
 * Mutates the ad in place and reports what it changed.
 */
async function fitHeadline(ad) {
  const x = headlineX(ad.layout);
  const available = 1080 - x - RIGHT_MARGIN;
  const original = ad.headlineSize;
  while (ad.headlineSize > 34) {
    const widths = await Promise.all(
      ad.headlineLines.map((l) => measureLine(l, ad.headlineSize)),
    );
    if (Math.max(...widths) <= available) break;
    ad.headlineSize -= 2;
  }
  if (ad.headlineSize !== original) {
    console.log(
      `  ${ad.number}: headline ${original}px -> ${ad.headlineSize}px to fit ${available}px measure`,
    );
  }
  const widths = await Promise.all(
    ad.headlineLines.map((l) => measureLine(l, ad.headlineSize)),
  );
  const over = Math.max(...widths) - available;
  if (over > 0) {
    throw new Error(
      `Ad ${ad.number}: headline still overflows by ${over}px at minimum size. Re-break headlineLines.`,
    );
  }
}

function definitions() {
  return `
    <defs>
      <linearGradient id="topScrim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${colors.cream}" stop-opacity="1"/>
        <stop offset="52%" stop-color="${colors.cream}" stop-opacity=".94"/>
        <stop offset="100%" stop-color="${colors.cream}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="leftScrim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${colors.cream}" stop-opacity=".98"/>
        <stop offset="42%" stop-color="${colors.cream}" stop-opacity=".86"/>
        <stop offset="100%" stop-color="${colors.cream}" stop-opacity="0"/>
      </linearGradient>
      <filter id="lockupShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
      <linearGradient id="bottomScrim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${colors.cream}" stop-opacity="0"/>
        <stop offset="35%" stop-color="${colors.cream}" stop-opacity=".82"/>
        <stop offset="100%" stop-color="${colors.cream}" stop-opacity=".98"/>
      </linearGradient>
    </defs>
  `;
}

// The eyebrow is purple (luma ~67) so it disappears over a dark crop - ad 06's
// portrait put it on the subject's hair at 128 luma. When the backdrop is too
// dark to carry it, sit it on a cream pill instead of hoping for the best.
function eyebrow(number, x = 62, needsPill = false) {
  const label = `STUNN / BETTER DECAF / ${number}`;
  const pill = needsPill
    ? `<rect x="${x - 14}" y="26" width="${label.length * 13.4 + 28}" height="36" rx="18" fill="${colors.cream}" fill-opacity=".9"/>`
    : "";
  return `${pill}<text x="${x}" y="52" class="eyebrow">${label}</text>`;
}

function cta(x, y, width = 380) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="72" rx="36" fill="${colors.purple}"/>
    <text x="${x + width / 2}" y="${y + 47}" text-anchor="middle" class="cta">TRY STUNN · STUNN.CO</text>
  `;
}

function offerStrip(width, height, footer) {
  return `
    <rect x="0" y="${height - footer}" width="${width}" height="${footer}" fill="${colors.lilac}"/>
    <text x="${width / 2}" y="${height - 18}" text-anchor="middle" class="offer">10% OFF YOUR FIRST ORDER WITH WELCOME10</text>
  `;
}

// The lockup used to be a plain cover-crop of the packshot - white studio
// background and all - with a purple stroke around it, which read as a
// screenshot pasted onto the scene. It is now a deliberate cream card with a
// soft shadow, so the light background belongs to the card instead of looking
// like a crop that was never removed.
function lockupFrame(x, y, width, height) {
  const pad = 14;
  return `
    <rect x="${x - pad}" y="${y - pad + 4}" width="${width + pad * 2}" height="${height + pad * 2}" rx="14" fill="#000000" opacity=".13" filter="url(#lockupShadow)"/>
    <rect x="${x - pad}" y="${y - pad}" width="${width + pad * 2}" height="${height + pad * 2}" rx="14" fill="${colors.cream}"/>
    <rect x="${x - pad}" y="${y - pad}" width="${width + pad * 2}" height="${height + pad * 2}" rx="14" fill="none" stroke="${colors.purple}" stroke-opacity=".18" stroke-width="1.5"/>
  `;
}

function overlaySvg(ad, formatName, lockupBox) {
  const { width, height, footer } = formats[formatName];
  const contentBottom = height - footer;
  const portrait = formatName === "portrait";
  const lineHeight = ad.headlineSize * 0.91;

  if (ad.layout === "top-left-scrim") {
    const headlineY = 132;
    const subheadY = headlineY + ad.headlineLines.length * lineHeight + 19;
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>${styles(ad.headlineSize)}</style>
        ${definitions()}
        <rect width="${width}" height="${portrait ? 610 : 540}" fill="url(#topScrim)"/>
        ${eyebrow(ad.number, 62, ad.eyebrowPill)}
        ${textLines(ad.headlineLines, 62, headlineY, lineHeight, "display")}
        ${textLines(ad.subheadLines, 62, subheadY, 40, "subhead")}
        ${cta(62, contentBottom - 150)}
        ${offerStrip(width, height, footer)}
      </svg>
    `);
  }

  if (ad.layout === "upper-right-payoff") {
    const textX = 334;
    const headlineY = 124;
    const subheadY = headlineY + ad.headlineLines.length * lineHeight + 16;
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>${styles(ad.headlineSize)}</style>
        ${definitions()}
        <rect width="${width}" height="${portrait ? 620 : 555}" fill="url(#topScrim)"/>
        ${eyebrow(ad.number, 62, ad.eyebrowPill)}
        ${textLines(ad.headlineLines, textX, headlineY, lineHeight, "display")}
        ${textLines(ad.subheadLines, textX, subheadY, 40, "subhead")}
        ${cta(width - 62 - 380, contentBottom - 150)}
        ${offerStrip(width, height, footer)}
      </svg>
    `);
  }

  if (ad.layout === "centred-product") {
    const headlineY = 130;
    const subheadY = headlineY + ad.headlineLines.length * lineHeight + 18;
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>${styles(ad.headlineSize)}</style>
        ${definitions()}
        <rect width="${width}" height="${portrait ? 565 : 500}" fill="url(#topScrim)"/>
        ${eyebrow(ad.number, 62, ad.eyebrowPill)}
        ${textLines(ad.headlineLines, 62, headlineY, lineHeight, "display")}
        ${textLines(ad.subheadLines, 62, subheadY, 40, "subhead")}
        ${cta(62, contentBottom - 150)}
        ${offerStrip(width, height, footer)}
      </svg>
    `);
  }

  if (ad.layout === "left-rail-human") {
    const headlineY = 142;
    const subheadY = headlineY + ad.headlineLines.length * lineHeight + 22;
    return Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>${styles(ad.headlineSize)}</style>
        ${definitions()}
        <rect width="${portrait ? 710 : 680}" height="${contentBottom}" fill="url(#leftScrim)"/>
        ${eyebrow(ad.number, 62, ad.eyebrowPill)}
        ${textLines(ad.headlineLines, 62, headlineY, lineHeight, "display")}
        ${textLines(ad.subheadLines, 62, subheadY, 40, "subhead")}
        ${cta(62, contentBottom - 150)}
        ${offerStrip(width, height, footer)}
      </svg>
    `);
  }

  const headlineY = portrait ? 785 : 555;
  const subheadY = headlineY + ad.headlineLines.length * lineHeight + 18;
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>${styles(ad.headlineSize)}</style>
      ${definitions()}
      <rect y="${portrait ? 590 : 380}" width="${width}" height="${contentBottom}" fill="url(#bottomScrim)"/>
      ${eyebrow(ad.number, 62, ad.eyebrowPill)}
      ${textLines(ad.headlineLines, 62, headlineY, lineHeight, "display")}
      ${textLines(ad.subheadLines, 62, subheadY, 40, "subhead")}
      ${cta(62, contentBottom - 150)}
      ${offerStrip(width, height, footer)}
    </svg>
  `);
}

async function renderMainImage(ad, formatName) {
  const { width, height, footer } = formats[formatName];
  return sharp(path.join(imageRoot, ad.source))
    .resize(width, height - footer, {
      fit: "cover",
      position: ad.cropGravity ?? ad.sourcePosition[formatName],
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();
}

function lockupBoxFor(ad, formatName) {
  if (!ad.lockupSource) return null;
  const { height, footer } = formats[formatName];
  const portrait = formatName === "portrait";
  if (ad.layout === "upper-right-payoff") {
    return {
      x: 62,
      y: height - footer - (portrait ? 370 : 320),
      width: portrait ? 260 : 235,
      height: portrait ? 196 : 176,
    };
  }
  if (ad.layout === "left-rail-human") {
    return {
      x: 760,
      y: height - footer - (portrait ? 375 : 320),
      width: 250,
      height: 188,
    };
  }
  return {
    x: 760,
    y: 74,
    width: 250,
    height: 188,
  };
}

async function renderLockup(ad, box) {
  if (!ad.lockupSource || !box) return null;
  return sharp(path.join(imageRoot, ad.lockupSource))
    .resize(box.width, box.height, {
      fit: "contain",
      position: "centre",
      background: colors.cream,
    })
    .png()
    .toBuffer();
}

function lockupCard(width, height, box) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${definitions()}
      ${lockupFrame(box.x, box.y, box.width, box.height)}
    </svg>`);
}

const EYEBROW_MIN_LUMA = 150;

/** Is the crop behind the eyebrow light enough for purple type to read? */
async function eyebrowNeedsPill(mainImage) {
  const { data, info } = await sharp(mainImage)
    .extract({ left: 60, top: 26, width: 410, height: 36 })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) sum += data[i];
  return sum / (info.width * info.height) < EYEBROW_MIN_LUMA;
}

async function renderAd(ad, formatName) {
  const { width, height } = formats[formatName];
  const outputDir = formatName === "portrait" ? portraitDir : squareDir;
  const outputPath = path.join(outputDir, `${ad.slug}.png`);
  const lockupBox = lockupBoxFor(ad, formatName);
  const [mainImage, lockupImage] = await Promise.all([
    renderMainImage(ad, formatName),
    renderLockup(ad, lockupBox),
  ]);
  ad.eyebrowPill = await eyebrowNeedsPill(mainImage);
  const layers = [{ input: mainImage, left: 0, top: 0 }];
  if (lockupImage && lockupBox) {
    layers.push({ input: lockupCard(width, height, lockupBox), left: 0, top: 0 });
    layers.push({ input: lockupImage, left: lockupBox.x, top: lockupBox.y });
  }
  layers.push({ input: overlaySvg(ad, formatName, lockupBox), left: 0, top: 0 });

  await sharp({
    create: { width, height, channels: 4, background: colors.cream },
  })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return outputPath;
}

async function contactSheet(files, formatName) {
  const portrait = formatName === "portrait";
  const thumbWidth = 300;
  const thumbHeight = portrait ? 375 : 300;
  const gap = 18;
  const width = thumbWidth * 3 + gap * 4;
  const height = thumbHeight * 2 + gap * 3;
  const composites = [];

  for (let index = 0; index < files.length; index += 1) {
    const thumb = await sharp(files[index])
      .resize(thumbWidth, thumbHeight, { fit: "cover" })
      .png()
      .toBuffer();
    composites.push({
      input: thumb,
      left: gap + (index % 3) * (thumbWidth + gap),
      top: gap + Math.floor(index / 3) * (thumbHeight + gap),
    });
  }

  await sharp({
    create: { width, height, channels: 4, background: colors.cream },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputRoot, `contact-sheet-${formatName}.png`));
}

await Promise.all([
  fs.mkdir(squareDir, { recursive: true }),
  fs.mkdir(portraitDir, { recursive: true }),
]);

const squareFiles = [];
const portraitFiles = [];
const liveAds = ads.filter((a) => !a.hold);
for (const ad of liveAds) {
  await fitHeadline(ad);
  squareFiles.push(await renderAd(ad, "square"));
  portraitFiles.push(await renderAd(ad, "portrait"));
}

await Promise.all([
  contactSheet(squareFiles, "square"),
  contactSheet(portraitFiles, "portrait"),
  fs.writeFile(
    path.join(outputRoot, "manifest.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        ads: liveAds.map((ad, index) => ({
          number: ad.number,
          headline: ad.headline,
          subhead: ad.subhead.replaceAll(" / ", " "),
          layoutVariant: ad.layout,
          sourceImages: [ad.source, ad.lockupSource].filter(Boolean),
          outputs: {
            square: path.relative(outputRoot, squareFiles[index]),
            portrait: path.relative(outputRoot, portraitFiles[index]),
          },
        })),
      },
      null,
      2,
    ),
  ),
]);

const held = ads.filter((a) => a.hold);
if (held.length) {
  console.log(
    `On hold, not exported: ${held.map((a) => a.number).join(", ")} - see the comment on each.`,
  );
}

console.log(`Built ${squareFiles.length + portraitFiles.length} ads in ${outputRoot}`);
