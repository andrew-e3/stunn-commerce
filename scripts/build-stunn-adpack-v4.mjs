import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const imageRoot = path.join(root, "public/images");
const productLockupSource = path.join(
  imageRoot,
  "stunn-ad-product-lockup.webp",
);
const outputRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "creative/ads/STUNN-Adpack-v4");
const squareDir = path.join(outputRoot, "statics-1x1");
const portraitDir = path.join(outputRoot, "statics-4x5");

const [displayFont, bodyFont, boldFont] = await Promise.all([
  fs.readFile("/System/Library/Fonts/Supplemental/Arial Black.ttf"),
  fs.readFile("/System/Library/Fonts/Supplemental/Arial.ttf"),
  fs.readFile(path.join(root, "fonts/Inter-Bold.ttf")),
]);

const fontCss = `
  @font-face { font-family: "STUNN Display"; src: url(data:font/truetype;base64,${displayFont.toString("base64")}); font-weight: 900; }
  @font-face { font-family: "STUNN Body"; src: url(data:font/truetype;base64,${bodyFont.toString("base64")}); font-weight: 400; }
  @font-face { font-family: "STUNN Bold"; src: url(data:font/truetype;base64,${boldFont.toString("base64")}); font-weight: 700; }
`;

const color = {
  purple: "#5A3493",
  lilac: "#E9E2F7",
  cream: "#F5F2EA",
  ink: "#111111",
  white: "#FFFFFF",
};

const formats = {
  square: { width: 1080, height: 1080, footer: 58 },
  portrait: { width: 1080, height: 1350, footer: 58 },
};

const ads = [
  {
    id: "S01",
    slug: "S01-culture-went-too-far",
    headline: "COFFEE CULTURE WENT TOO FAR.",
    lines: ["COFFEE CULTURE", "WENT TOO FAR."],
    subhead: ["Keep the cup.", "Lose the caffeine loop."],
    source: "stunn-sachet-pour.png",
    layout: "topEditorial",
    position: "centre",
    headlineSize: 91,
  },
  {
    id: "S02",
    slug: "S02-third-coffee",
    headline: "THE THIRD COFFEE ISN'T HELPING.",
    lines: {
      square: ["THE THIRD", "COFFEE ISN'T", "HELPING."],
      portrait: ["THE THIRD COFFEE", "ISN'T HELPING."],
    },
    subhead: ["Steady attention shouldn't", "expire after lunch."],
    source: [
      "stunn-email-pour.jpg",
      "stunn-function-pour-corrected.png",
      "stunn-cdn-pour-lilac.jpg",
    ],
    layout: "threeCups",
    position: "centre",
    headlineSize: 78,
    squareHeadlineSize: 64,
  },
  {
    id: "S03",
    slug: "S03-dependence-personality",
    headline: "WE MADE DEPENDENCE A PERSONALITY.",
    lines: ["WE MADE", "DEPENDENCE", "A PERSONALITY."],
    subhead: ["Coffee never required this."],
    source: "stunn-hero-brand-mug.webp",
    layout: "rightNarrative",
    position: "centre",
    headlineSize: 67,
    squareHeadlineSize: 58,
    productInset: true,
  },
  {
    id: "S04",
    slug: "S04-keep-the-cup",
    headline: "KEEP THE CUP. LOSE THE LOOP.",
    lines: ["KEEP THE CUP.", "LOSE THE LOOP."],
    subhead: ["Real coffee ritual.", "No stimulant tax."],
    source: "stunn-sachet-pour-lilac.png",
    layout: "centeredRitual",
    position: "centre",
    headlineSize: 84,
  },
  {
    id: "S05",
    slug: "S05-nervous-system-tax",
    headline: "COFFEE NEVER REQUIRED A NERVOUS SYSTEM TAX.",
    lines: ["COFFEE NEVER REQUIRED", "A NERVOUS SYSTEM", "TAX."],
    subhead: ["Calm focus, without", "paying for it in tension."],
    source: "stunn-function-pour-corrected.png",
    layout: "topEditorial",
    position: "centre",
    headlineSize: 66,
    squareHeadlineSize: 58,
    productInset: true,
  },
  {
    id: "S06",
    slug: "S06-overstimulated",
    headline: "YOU'RE NOT LOW ON ENERGY. YOU'RE OVERSTIMULATED.",
    lines: {
      square: [
        "YOU'RE NOT",
        "LOW ON ENERGY.",
        "YOU'RE",
        "OVERSTIMULATED.",
      ],
      portrait: [
        "YOU'RE NOT LOW",
        "ON ENERGY.",
        "YOU'RE",
        "OVERSTIMULATED.",
      ],
    },
    subhead: ["Steady attention,", "no borrowing from tomorrow."],
    source: "stunn-ritual-afternoon-man-v1.webp",
    layout: "humanNegativeSpace",
    position: { square: "west", portrait: "west" },
    headlineSize: 48,
    squareHeadlineSize: 46,
    productInset: true,
  },
  {
    id: "S07",
    slug: "S07-calm-focus",
    headline: "CALM FOCUS. NO TENSION.",
    lines: ["CALM FOCUS.", "NO TENSION."],
    subhead: ["No jitters. No crash."],
    source: "stunn-cdn-pour-lilac.jpg",
    layout: "quietSplit",
    position: "centre",
    headlineSize: 77,
  },
  {
    id: "S08",
    slug: "S08-all-the-ritual",
    headline: "ALL THE RITUAL. NONE OF THE JITTERS.",
    lines: ["ALL THE RITUAL.", "NONE OF THE", "JITTERS."],
    subhead: ["It tastes like real coffee -", "because it is."],
    source: "stunn-email-ritual.jpg",
    layout: "leftNarrative",
    position: "centre",
    headlineSize: 66,
  },
  {
    id: "S09",
    slug: "S09-same-mug-7am",
    headline: "SAME MUG. SAME 7AM. NO CRASH.",
    lines: ["SAME MUG.", "SAME 7AM.", "NO CRASH."],
    subhead: ["Everything you love about", "the morning, minus the tax."],
    source: "stunn-ritual-morning-woman-v1.webp",
    layout: "leftNarrative",
    position: "centre",
    headlineSize: 73,
    squareHeadlineSize: 63,
    productInset: true,
  },
  {
    id: "S10",
    slug: "S10-read-the-label",
    headline: "READ THE LABEL.",
    lines: ["READ THE LABEL."],
    subhead: [
      "300mg Lion's Mane.",
      "250mg Rhodiola.",
      "Every dose on the label.",
    ],
    source: "stunn-sachet-pour.png",
    layout: "doseSplit",
    position: "west",
    headlineSize: 82,
  },
  {
    id: "S11",
    slug: "S11-not-50",
    headline: "300MG LION'S MANE. 250MG RHODIOLA. NOT 50.",
    lines: ["300MG LION'S MANE.", "250MG RHODIOLA.", "NOT 50."],
    subhead: [
      "Most functional coffee hides its doses.",
      "Ours are the headline.",
    ],
    source: "stunn-cdn-pour-lilac.jpg",
    layout: "typeFirst",
    position: "centre",
    headlineSize: 66,
    productInset: true,
  },
  {
    id: "S12",
    slug: "S12-sleep-decision",
    headline: "WHEN DID 3PM COFFEE BECOME A SLEEP DECISION?",
    lines: ["WHEN DID 3PM COFFEE", "BECOME A SLEEP", "DECISION?"],
    subhead: ["Pour one at 4.", "Sleep at 10."],
    source: {
      square: "stunn-rested-morning-v1.webp",
      portrait: "stunn-evening-ritual-generated.jpg",
    },
    layout: "sleepStory",
    position: { square: "centre", portrait: "centre" },
    headlineSize: 69,
    productInset: true,
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

function textLines(lines, x, y, lineHeight, className, anchor = "start") {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" text-anchor="${anchor}" class="${className}">${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function css(headlineSize, subheadSize = 31) {
  return `
    ${fontCss}
    .headline { font-family: "STUNN Display", Arial, sans-serif; font-size: ${headlineSize}px; font-weight: 900; fill: ${color.ink}; letter-spacing: -1.6px; }
    .eyebrow { font-family: "STUNN Bold", Arial, sans-serif; font-size: 22px; font-weight: 700; fill: ${color.purple}; letter-spacing: 1.6px; }
    .subhead { font-family: "STUNN Body", Arial, sans-serif; font-size: ${subheadSize}px; fill: ${color.ink}; }
    .subheadBold { font-family: "STUNN Bold", Arial, sans-serif; font-size: ${subheadSize}px; font-weight: 700; fill: ${color.ink}; }
    .cta { font-family: "STUNN Bold", Arial, sans-serif; font-size: 27px; font-weight: 700; fill: ${color.white}; letter-spacing: .5px; }
    .offer { font-family: "STUNN Bold", Arial, sans-serif; font-size: 22px; font-weight: 700; fill: ${color.purple}; letter-spacing: .2px; }
    .sequence { font-family: "STUNN Bold", Arial, sans-serif; font-size: 22px; font-weight: 700; fill: ${color.white}; letter-spacing: 1.2px; }
  `;
}

function defs() {
  return `
    <defs>
      <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color.cream}" stop-opacity=".99"/>
        <stop offset="67%" stop-color="${color.cream}" stop-opacity=".93"/>
        <stop offset="100%" stop-color="${color.cream}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color.cream}" stop-opacity="0"/>
        <stop offset="30%" stop-color="${color.cream}" stop-opacity=".88"/>
        <stop offset="100%" stop-color="${color.cream}" stop-opacity=".99"/>
      </linearGradient>
      <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${color.cream}" stop-opacity=".99"/>
        <stop offset="60%" stop-color="${color.cream}" stop-opacity=".92"/>
        <stop offset="100%" stop-color="${color.cream}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="right" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0%" stop-color="${color.cream}" stop-opacity=".99"/>
        <stop offset="62%" stop-color="${color.cream}" stop-opacity=".92"/>
        <stop offset="100%" stop-color="${color.cream}" stop-opacity="0"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#111111" flood-opacity=".18"/></filter>
    </defs>`;
}

function eyebrow(x = 64, y = 58) {
  return `<text x="${x}" y="${y}" class="eyebrow">STUNN / BETTER DECAF</text>`;
}

function cta(x, y, width = 386) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="70" rx="35" fill="${color.purple}"/>
    <text x="${x + width / 2}" y="${y + 46}" text-anchor="middle" class="cta">TRY STUNN &#183; STUNN.CO</text>`;
}

function offerStrip(ad, width, height, footer) {
  const message =
    Number(ad.id.slice(1)) % 2 === 0
      ? "FREE SHIPPING ON EVERY US ORDER"
      : "10% OFF YOUR FIRST ORDER WITH WELCOME10";
  return `
    <rect x="0" y="${height - footer}" width="${width}" height="${footer}" fill="${color.lilac}"/>
    <text x="${width / 2}" y="${height - 19}" text-anchor="middle" class="offer">${message}</text>`;
}

function valueForFormat(value, formatName) {
  if (Array.isArray(value) || typeof value === "string") return value;
  return value[formatName];
}

function sourceImagesFor(ad) {
  const sources = Array.isArray(ad.source)
    ? ad.source
    : typeof ad.source === "string"
      ? [ad.source]
      : [ad.source.square, ad.source.portrait];
  if (ad.productInset) {
    sources.push(path.relative(root, productLockupSource));
  }
  return [...new Set(sources.filter(Boolean))];
}

function productInsetPanel(contentBottom) {
  const size = 238;
  const x = 1080 - 64 - size;
  const y = contentBottom - 42 - size;
  return `
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="28" fill="${color.cream}" fill-opacity=".96" filter="url(#shadow)"/>`;
}

function overlay(ad, formatName) {
  const { width, height, footer } = formats[formatName];
  const portrait = formatName === "portrait";
  const contentBottom = height - footer;
  const lines = valueForFormat(ad.lines, formatName);
  const headlineSize =
    formatName === "square" && ad.squareHeadlineSize
      ? ad.squareHeadlineSize
      : ad.headlineSize;
  const lineHeight = headlineSize * 0.9;
  const headCount = lines.length;
  const styles = css(headlineSize, ad.layout === "typeFirst" ? 28 : 31);
  let body = "";

  if (ad.layout === "topEditorial") {
    const y = 136;
    const subY = y + headCount * lineHeight + 18;
    body = `
      <rect width="${width}" height="${portrait ? 650 : 575}" fill="url(#top)"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      ${textLines(ad.subhead, 64, subY, 39, "subhead")}
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "lowerEditorial") {
    const y = portrait ? 760 : 585;
    const subY = y + headCount * lineHeight + 16;
    body = `
      <rect y="${portrait ? 510 : 385}" width="${width}" height="${contentBottom}" fill="url(#bottom)"/>
      ${eyebrow(64, portrait ? 710 : 535)}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      ${textLines(ad.subhead, 64, subY, 38, "subhead")}
      ${cta(630, contentBottom - 112, 386)}`;
  } else if (ad.layout === "rightNarrative") {
    const x = 536;
    const y = 142;
    const subY = y + headCount * lineHeight + 20;
    body = `
      <rect x="380" width="700" height="${contentBottom}" fill="url(#right)"/>
      ${eyebrow(x)}
      ${textLines(lines, x, y, lineHeight, "headline")}
      ${textLines(ad.subhead, x, subY, 38, "subhead")}
      ${cta(ad.productInset ? 64 : x, contentBottom - 112, 414)}`;
  } else if (ad.layout === "centeredRitual") {
    const y = 148;
    const subY = y + headCount * lineHeight + 18;
    body = `
      <rect width="${width}" height="${portrait ? 570 : 500}" fill="url(#top)"/>
      ${eyebrow()}
      ${textLines(lines, width / 2, y, lineHeight, "headline", "middle")}
      ${textLines(ad.subhead, width / 2, subY, 39, "subhead", "middle")}
      ${cta((width - 386) / 2, contentBottom - 112)}`;
  } else if (ad.layout === "quietSplit") {
    const y = 175;
    const subY = y + headCount * lineHeight + 28;
    body = `
      <rect width="660" height="${contentBottom}" fill="url(#left)"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      <line x1="64" y1="${subY - 20}" x2="164" y2="${subY - 20}" stroke="${color.purple}" stroke-width="3"/>
      ${textLines(ad.subhead, 64, subY + 18, 39, "subhead")}
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "leftNarrative") {
    const y = 142;
    const subY = y + headCount * lineHeight + 20;
    body = `
      <rect width="690" height="${contentBottom}" fill="url(#left)"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      ${textLines(ad.subhead, 64, subY, 38, "subhead")}
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "doseSplit") {
    const y = 154;
    body = `
      <rect width="590" height="${contentBottom}" fill="${color.cream}" fill-opacity=".96"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      <text x="64" y="${y + 180}" class="subheadBold">300mg Lion&apos;s Mane.</text>
      <text x="64" y="${y + 239}" class="subheadBold">250mg Rhodiola.</text>
      <line x1="64" y1="${y + 280}" x2="470" y2="${y + 280}" stroke="${color.purple}" stroke-width="2"/>
      <text x="64" y="${y + 334}" class="subhead">Every dose on the label.</text>
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "typeFirst") {
    const y = 146;
    const tight = headlineSize * 0.82;
    const subY = y + headCount * tight + 28;
    body = `
      <rect width="${width}" height="${contentBottom}" fill="${color.cream}"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, tight, "headline")}
      ${textLines(ad.subhead, 64, subY, 36, "subhead")}
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "sleepStory") {
    const y = 142;
    const subY = y + headCount * lineHeight + 18;
    body = `
      <rect width="${width}" height="${portrait ? 610 : 540}" fill="url(#top)"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      ${textLines(ad.subhead, 64, subY, 38, "subhead")}
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "threeCups") {
    const photoTop = portrait ? 520 : 450;
    const y = portrait ? 142 : 132;
    const subY = y + headCount * lineHeight + 20;
    const panelWidth = width / 3;
    body = `
      <rect width="${width}" height="${photoTop + 42}" fill="url(#top)"/>
      ${eyebrow()}
      ${textLines(lines, 64, y, lineHeight, "headline")}
      ${textLines(ad.subhead, 64, subY, 38, "subhead")}
      ${[0, 1, 2]
        .map(
          (index) => `
            <circle cx="${index * panelWidth + 54}" cy="${photoTop + 52}" r="28" fill="${color.purple}"/>
            <text x="${index * panelWidth + 54}" y="${photoTop + 60}" text-anchor="middle" class="sequence">0${index + 1}</text>`,
        )
        .join("")}
      ${cta(64, contentBottom - 112)}`;
  } else if (ad.layout === "humanNegativeSpace") {
    const y = portrait ? 138 : 126;
    const subY = y + headCount * lineHeight + 18;
    body = `
      <rect width="${portrait ? 610 : 560}" height="${contentBottom}" fill="url(#left)"/>
      ${eyebrow()}
      ${textLines(lines, 54, y, lineHeight, "headline")}
      ${textLines(ad.subhead, 54, subY, 36, "subhead")}
      ${cta(54, contentBottom - 112, 410)}`;
  }

  if (ad.productInset) body += productInsetPanel(contentBottom);

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>${styles}</style>
      ${defs()}
      ${body}
      ${offerStrip(ad, width, height, footer)}
    </svg>`);
}

async function threeCupsSource(ad, formatName) {
  const { width, height, footer } = formats[formatName];
  const contentHeight = height - footer;
  const photoTop = formatName === "portrait" ? 520 : 450;
  const panelWidth = Math.floor(width / 3);
  const photoHeight = contentHeight - photoTop;
  const panels = await Promise.all(
    ad.source.map(async (sourceName, index) => ({
      input: await sharp(path.join(imageRoot, sourceName))
        .resize(panelWidth - (index < 2 ? 3 : 0), photoHeight, {
          fit: "cover",
          position: "centre",
        })
        .modulate({ saturation: 0.9, brightness: 0.99 })
        .png()
        .toBuffer(),
      left: index * panelWidth,
      top: photoTop,
    })),
  );

  return sharp({
    create: {
      width,
      height: contentHeight,
      channels: 4,
      background: color.cream,
    },
  })
    .composite(panels)
    .png()
    .toBuffer();
}

async function sourceFor(ad, formatName) {
  if (ad.layout === "threeCups") return threeCupsSource(ad, formatName);

  const sourceName =
    typeof ad.source === "string" ? ad.source : ad.source[formatName];
  const position =
    typeof ad.position === "string" ? ad.position : ad.position[formatName];
  const { width, height, footer } = formats[formatName];

  if (ad.layout === "typeFirst") {
    return sharp({
      create: {
        width,
        height: height - footer,
        channels: 4,
        background: color.cream,
      },
    })
      .png()
      .toBuffer();
  }

  return sharp(path.join(imageRoot, sourceName))
    .resize(width, height - footer, { fit: "cover", position })
    .modulate({ saturation: 0.93, brightness: 1.01 })
    .png()
    .toBuffer();
}

async function auxiliaryLayers(ad, formatName) {
  const { height, footer } = formats[formatName];
  if (!ad.productInset) return [];

  const size = 210;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="18" fill="white"/></svg>`,
  );
  const image = await sharp(productLockupSource)
    .resize(size, size, { fit: "cover", position: "attention" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  const contentBottom = height - footer;
  return [{ input: image, left: 792, top: contentBottom - 266 }];
}

async function render(ad, formatName) {
  const { width, height } = formats[formatName];
  const outputDir = formatName === "square" ? squareDir : portraitDir;
  const outputPath = path.join(outputDir, `${ad.slug}.png`);
  const main = await sourceFor(ad, formatName);
  const aux = await auxiliaryLayers(ad, formatName);

  await sharp({
    create: { width, height, channels: 4, background: color.cream },
  })
    .composite([
      { input: main, left: 0, top: 0 },
      { input: overlay(ad, formatName), left: 0, top: 0 },
      ...aux,
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  return outputPath;
}

async function contactSheet(squareFiles, portraitFiles) {
  const thumbW = 270;
  const squareH = 270;
  const portraitH = 338;
  const labelH = 34;
  const gap = 14;
  const cols = 4;
  const width = cols * thumbW + (cols + 1) * gap;
  const rows = 3;
  const height =
    gap + rows * (labelH + squareH + gap) + rows * (labelH + portraitH + gap);
  const composites = [];

  async function addRows(files, startY, thumbH) {
    for (let i = 0; i < files.length; i += 1) {
      const x = gap + (i % cols) * (thumbW + gap);
      const y = startY + Math.floor(i / cols) * (labelH + thumbH + gap);
      const label = Buffer.from(
        `<svg width="${thumbW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color.cream}"/><text x="8" y="24" font-family="Arial" font-size="19" font-weight="700" fill="${color.ink}">${ads[i].id} / ${thumbH === squareH ? "1:1" : "4:5"}</text></svg>`,
      );
      const thumb = await sharp(files[i])
        .resize(thumbW, thumbH, { fit: "cover" })
        .png()
        .toBuffer();
      composites.push({ input: label, left: x, top: y });
      composites.push({ input: thumb, left: x, top: y + labelH });
    }
  }

  const portraitStart = gap + rows * (labelH + squareH + gap);
  await addRows(squareFiles, gap, squareH);
  await addRows(portraitFiles, portraitStart, portraitH);

  await sharp({
    create: { width, height, channels: 4, background: color.cream },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputRoot, "contact-sheet.png"));
}

await Promise.all([
  fs.mkdir(squareDir, { recursive: true }),
  fs.mkdir(portraitDir, { recursive: true }),
]);

const squareFiles = [];
const portraitFiles = [];
for (const ad of ads) {
  squareFiles.push(await render(ad, "square"));
  portraitFiles.push(await render(ad, "portrait"));
}

await contactSheet(squareFiles, portraitFiles);

await fs.writeFile(
  path.join(outputRoot, "manifest.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      campaign: "STUNN Adpack v4",
      offer: {
        code: "WELCOME10",
        discount: "10% off first order",
        shipping: "Free shipping on every US order",
      },
      packagingPolicy:
        "Only existing STUNN photography from public/images is used. No packaging was generated, redrawn, or retouched.",
      sourceAssetCaveat:
        "Several brief-approved source photographs visibly contain legacy STUNN+ pack artwork. The builder preserves those photographs exactly. Replace them with a current physical shoot if the STUNN-only wordmark rule is enforced at launch.",
      statics: ads.map((ad) => ({
        id: ad.id,
        headline: ad.headline,
        subhead: ad.subhead.join(" "),
        layoutVariant: ad.layout,
        sourceImages: sourceImagesFor(ad),
        outputs: {
          square: path.relative(
            outputRoot,
            path.join(squareDir, `${ad.slug}.png`),
          ),
          portrait: path.relative(
            outputRoot,
            path.join(portraitDir, `${ad.slug}.png`),
          ),
        },
      })),
    },
    null,
    2,
  ),
);

console.log(
  `Built ${squareFiles.length + portraitFiles.length} static ads in ${outputRoot}`,
);
