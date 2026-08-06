import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const run = promisify(execFile);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const imageRoot = path.join(root, "public/images");
const outputRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "creative/ads/STUNN-Adpack-v4");
const video9x16Dir = path.join(outputRoot, "video-9x16");
const video4x5Dir = path.join(outputRoot, "video-4x5");
const storyboardRoot = path.join(outputRoot, "video-storyboards");
const segmentRoot = path.join(outputRoot, ".video-segments");

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
  vertical: { width: 1080, height: 1920, topSafe: 140, bottomSafe: 250 },
  portrait: { width: 1080, height: 1350, topSafe: 70, bottomSafe: 80 },
};

const end = (payoff) => ({ type: "end", duration: 2.5, lines: payoff });

const videos = [
  {
    id: "V01",
    slug: "V01-escalation-montage",
    title: "Escalation montage",
    shotStatus:
      "New tabletop footage required: four mugs, real STUNN sachet tear, pour, stir and sip.",
    scenes: [
      {
        type: "cups",
        duration: 2.5,
        lines: ["ONE CUP.", "THEN TWO.", "THEN FOUR."],
        support: ["Fourth mug lands hard."],
      },
      {
        type: "type",
        duration: 2.5,
        lines: ["THE COST", "KEEPS CLIMBING."],
        support: ["More tension. Another crash. Worse sleep."],
      },
      {
        type: "type",
        duration: 2.5,
        lines: ["COFFEE CULTURE", "WENT TOO FAR."],
        support: ["The cup was never the problem."],
      },
      {
        type: "photo",
        duration: 5,
        source: "stunn-sachet-pour.png",
        lines: ["KEEP THE CUP.", "LOSE THE LOOP."],
        support: ["Real coffee. 99.9% caffeine-free."],
        position: "centre",
      },
      end(["KEEP THE CUP.", "LOSE THE LOOP."]),
    ],
  },
  {
    id: "V02",
    slug: "V02-coffee-rules",
    title: "Coffee rules",
    shotStatus:
      "One new real pour clip required. Kinetic type sections are production-ready references.",
    scenes: [
      {
        type: "type",
        duration: 2.2,
        lines: ["COFFEE RULE #1"],
        support: ["Apparently, there are rules now."],
      },
      {
        type: "type",
        duration: 2.8,
        lines: ["DON'T TALK TO ME", "BEFORE MY COFFEE."],
        support: ["Rule one starts before the day does."],
      },
      {
        type: "type",
        duration: 2.8,
        lines: ["THE 3PM CUP", "YOU'LL PAY FOR AT 2AM."],
        support: ["Rule two borrows from tonight."],
      },
      {
        type: "photo",
        duration: 4.7,
        source: "stunn-function-pour-corrected.png",
        lines: ["COFFEE NEVER", "REQUIRED ANY OF THIS."],
        support: ["Real ritual. No stimulant tax."],
        position: "centre",
      },
      end(["REAL COFFEE.", "NO CAFFEINE LOOP."]),
    ],
  },
  {
    id: "V03",
    slug: "V03-jitters-visible",
    title: "Jitters made visible",
    shotStatus:
      "New macro footage required: vibrating coffee surface, still surface, real box and sachet entering frame.",
    scenes: [
      {
        type: "photo",
        duration: 2.5,
        source: "stunn-email-ritual.jpg",
        lines: ["THE SURFACE", "TELLS THE STORY."],
        support: ["A cup that cannot sit still."],
        position: "centre",
        treatment: "jitter",
      },
      {
        type: "type",
        duration: 2.5,
        lines: ["JITTERS", "ARE VISIBLE."],
        support: ["Tension does not have to be the price of focus."],
      },
      {
        type: "photo",
        duration: 3,
        source: "stunn-function-pour-corrected.png",
        lines: ["THEN THE CUP", "GOES STILL."],
        support: ["No caffeine. No crash."],
        position: "centre",
      },
      {
        type: "photo",
        duration: 4.5,
        source: "stunn-hero-brand-mug.webp",
        lines: ["CALM FOCUS.", "NO TENSION."],
        support: ["Keep the ritual. Lose the loop."],
        position: "centre",
      },
      end(["CALM FOCUS.", "NO TENSION."]),
    ],
  },
  {
    id: "V04",
    slug: "V04-spike-crash-graph",
    title: "Spike and crash graph",
    shotStatus:
      "Graph motion is ready for animation. One new real pour clip is required for the final proof beat.",
    scenes: [
      {
        type: "graph",
        duration: 3,
        lines: ["7AM SPIKE.", "11AM CRASH."],
        support: ["The line starts climbing."],
      },
      {
        type: "graph",
        duration: 3,
        lines: ["1PM SPIKE.", "3PM CRASH."],
        support: ["Then tonight pays the bill."],
        graphMode: "late",
      },
      {
        type: "steady",
        duration: 3,
        lines: ["RESET THE LINE."],
        support: ["Steady attention should not expire after lunch."],
      },
      {
        type: "photo",
        duration: 3.5,
        source: "stunn-sachet-pour-lilac.png",
        lines: ["STEADY ATTENTION.", "NO REBOUND."],
        support: ["99.9% caffeine-free."],
        position: "centre",
      },
      end(["STEADY ATTENTION.", "NO REBOUND."]),
    ],
  },
  {
    id: "V05",
    slug: "V05-the-pour",
    title: "The pour",
    shotStatus:
      "New ritual footage required: sachet tear, powder, hot water, stir, steam, hands and sip.",
    scenes: [
      {
        type: "photo",
        duration: 2.5,
        source: "stunn-cdn-pour-lilac.jpg",
        lines: ["TEAR."],
        support: ["One sachet. One familiar ritual."],
        position: "centre",
      },
      {
        type: "photo",
        duration: 2.5,
        source: "stunn-function-pour-corrected.png",
        lines: ["POUR."],
        support: ["Real decaf coffee meets functional support."],
        position: "centre",
      },
      {
        type: "photo",
        duration: 2.5,
        source: "stunn-email-comparison.jpg",
        lines: ["STIR."],
        support: ["Lion's Mane. Rhodiola. Cordyceps. L-Theanine."],
        position: "centre",
      },
      {
        type: "photo",
        duration: 5,
        source: "stunn-hero-brand-mug-v2.webp",
        lines: ["ALL THE RITUAL.", "NONE OF THE CAFFEINE."],
        support: ["No jitters. No crash."],
        position: "centre",
      },
      end(["THE CUP STAYS.", "THE LOOP GOES."]),
    ],
  },
  {
    id: "V06",
    slug: "V06-macro-label",
    title: "Macro label",
    shotStatus:
      "New face-on macro box footage required. Supplement Facts panel must remain out of frame or out of focus.",
    scenes: [
      {
        type: "photo",
        duration: 2.5,
        source: "stunn-cdn-pour-lilac.jpg",
        lines: ["READ THE LABEL."],
        support: ["The doses are the headline."],
        position: "north",
      },
      { type: "dose", duration: 2.5, lines: ["300MG", "LION'S MANE."] },
      { type: "dose", duration: 2.5, lines: ["250MG", "RHODIOLA."] },
      {
        type: "dose",
        duration: 5,
        lines: ["100MG CORDYCEPS.", "100MG L-THEANINE."],
        support: ["Every dose on the label."],
      },
      end(["READ THE LABEL.", "THEN READ THEIRS."]),
    ],
  },
  {
    id: "V07",
    slug: "V07-4pm-10pm",
    title: "4pm and 10pm",
    shotStatus:
      "New 4pm pour and 10pm lights-out footage required. Real STUNN product must be visible in the pour side.",
    scenes: [
      { type: "clock", duration: 2.5, lines: ["3:59PM", "4:00PM"] },
      {
        type: "split",
        duration: 4,
        sources: [
          "stunn-function-pour-corrected.png",
          "stunn-evening-ritual-generated.jpg",
        ],
        lines: ["POUR ONE AT 4.", "SLEEP AT 10."],
      },
      {
        type: "photo",
        duration: 3,
        source: "stunn-rested-morning-v1.webp",
        lines: ["THE NEXT MORNING", "STILL BELONGS TO YOU."],
        support: ["Real coffee ritual. No stimulant tax."],
        position: "centre",
      },
      {
        type: "type",
        duration: 3,
        lines: ["WHEN DID 3PM COFFEE", "BECOME A SLEEP DECISION?"],
      },
      end(["POUR ONE AT 4.", "SLEEP AT 10."]),
    ],
  },
  {
    id: "V08",
    slug: "V08-same-mug-different-day",
    title: "Same mug, different day",
    shotStatus:
      "Existing stills define the edit. Replace with matched morning, afternoon and evening lifestyle footage for final media.",
    scenes: [
      {
        type: "photo",
        duration: 3,
        source: "stunn-ritual-morning-woman-v1.webp",
        lines: ["SAME MUG.", "SAME 7AM."],
        support: ["The morning ritual stays."],
      },
      {
        type: "photo",
        duration: 3,
        source: "stunn-ritual-afternoon-man-v1.webp",
        lines: ["STEADY ATTENTION", "AFTER LUNCH."],
        support: ["No afternoon rebound."],
      },
      {
        type: "photo",
        duration: 3,
        source: "stunn-evening-ritual-generated.jpg",
        lines: ["SLEEP STILL", "FEELS LIKE SLEEP."],
        support: ["No stimulant tax."],
        position: "centre",
      },
      {
        type: "type",
        duration: 3.5,
        lines: ["ALL THE RITUAL.", "NONE OF THE CAFFEINE."],
        support: ["Real decaf coffee. Calm focus."],
      },
      end(["SAME MUG.", "A QUIETER DAY."]),
    ],
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

function lineText(lines, x, y, lineHeight, className, anchor = "start") {
  return (lines ?? [])
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" text-anchor="${anchor}" class="${className}">${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function styles(formatName) {
  const vertical = formatName === "vertical";
  return `
    ${fontCss}
    .headline { font-family: "STUNN Display", Arial, sans-serif; font-size: ${vertical ? 92 : 74}px; font-weight: 900; fill: ${color.ink}; letter-spacing: -1.5px; }
    .support { font-family: "STUNN Body", Arial, sans-serif; font-size: ${vertical ? 42 : 32}px; fill: ${color.ink}; }
    .eyebrow { font-family: "STUNN Bold", Arial, sans-serif; font-size: ${vertical ? 25 : 21}px; font-weight: 700; fill: ${color.purple}; letter-spacing: 2px; }
    .slug { font-family: "STUNN Bold", Arial, sans-serif; font-size: ${vertical ? 20 : 17}px; font-weight: 700; fill: ${color.purple}; letter-spacing: 1px; }
    .cta { font-family: "STUNN Bold", Arial, sans-serif; font-size: ${vertical ? 35 : 29}px; font-weight: 700; fill: ${color.white}; }
    .offer { font-family: "STUNN Bold", Arial, sans-serif; font-size: ${vertical ? 27 : 22}px; font-weight: 700; fill: ${color.purple}; }
  `;
}

function defs() {
  return `<defs>
    <linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color.cream}" stop-opacity=".98"/><stop offset="72%" stop-color="${color.cream}" stop-opacity=".9"/><stop offset="100%" stop-color="${color.cream}" stop-opacity="0"/></linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color.cream}" stop-opacity="0"/><stop offset="30%" stop-color="${color.cream}" stop-opacity=".88"/><stop offset="100%" stop-color="${color.cream}" stop-opacity=".99"/></linearGradient>
  </defs>`;
}

function watermark(width, topSafe, video) {
  return `
    <rect x="46" y="${topSafe + 8}" width="432" height="40" rx="20" fill="${color.cream}" fill-opacity=".9"/>
    <text x="60" y="${topSafe + 36}" class="eyebrow">STUNN / BETTER DECAF / ${video.id}</text>
    <rect x="${width - 560}" y="${topSafe + 8}" width="500" height="40" rx="20" fill="${color.lilac}"/>
    <text x="${width - 310}" y="${topSafe + 36}" text-anchor="middle" class="slug">ANIMATIC / PHYSICAL SHOOT REQUIRED</text>`;
}

function coffeeCups(width, height, topSafe) {
  const y = topSafe + 690;
  return [0, 1, 2, 3]
    .map((index) => {
      const x = 90 + index * 240;
      return `<g transform="translate(${x} ${y + (index % 2) * 22})"><rect width="150" height="126" rx="16" fill="none" stroke="${color.ink}" stroke-width="8"/><path d="M150 30 C215 24 215 104 150 94" fill="none" stroke="${color.ink}" stroke-width="8"/><line x1="20" y1="29" x2="130" y2="29" stroke="${color.purple}" stroke-width="6"/></g>`;
    })
    .join("");
}

function graphPath(width, topSafe, late = false) {
  const y = topSafe + 650;
  const pathData = late
    ? `M80 ${y + 240} L240 ${y - 80} L400 ${y + 190} L560 ${y - 110} L720 ${y + 220} L880 ${y + 55} L1000 ${y + 150}`
    : `M80 ${y + 210} L255 ${y - 130} L430 ${y + 200} L600 ${y - 80} L780 ${y + 230} L1000 ${y + 45}`;
  return `<path d="${pathData}" fill="none" stroke="${color.purple}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><line x1="80" y1="${y + 265}" x2="1000" y2="${y + 265}" stroke="${color.ink}" stroke-opacity=".25" stroke-width="2"/>`;
}

function overlaySvg(video, scene, formatName) {
  const { width, height, topSafe, bottomSafe } = formats[formatName];
  const vertical = formatName === "vertical";
  const headlineSize = vertical ? 92 : 74;
  const lineHeight = headlineSize * 0.9;
  const textX = 60;
  const topY = topSafe + (vertical ? 150 : 105);
  const photoY = height - bottomSafe - (vertical ? 520 : 390);
  let content = "";

  if (scene.type === "photo") {
    const supportY = photoY + (scene.lines?.length ?? 0) * lineHeight + 30;
    content = `
      <rect y="${photoY - 190}" width="${width}" height="${height - photoY + 190}" fill="url(#bottom)"/>
      ${lineText(scene.lines, textX, photoY, lineHeight, "headline")}
      ${lineText(scene.support, textX, supportY, vertical ? 50 : 40, "support")}
      ${scene.treatment === "jitter" ? `<path d="M100 ${topSafe + 620} q70 -55 140 0 t140 0 t140 0 t140 0 t140 0" fill="none" stroke="${color.purple}" stroke-width="8" opacity=".8"/>` : ""}`;
  } else if (scene.type === "cups") {
    content = `${lineText(scene.lines, textX, topY, lineHeight, "headline")}${lineText(scene.support, textX, topY + (scene.lines?.length ?? 0) * lineHeight + 28, vertical ? 50 : 40, "support")}${coffeeCups(width, height, topSafe)}`;
  } else if (scene.type === "graph") {
    content = `${lineText(scene.lines, textX, topY, lineHeight, "headline")}${lineText(scene.support, textX, topY + (scene.lines?.length ?? 0) * lineHeight + 28, vertical ? 50 : 40, "support")}${graphPath(width, topSafe, scene.graphMode === "late")}`;
  } else if (scene.type === "steady") {
    const y = topSafe + 720;
    content = `${lineText(scene.lines, textX, topY, lineHeight, "headline")}${lineText(scene.support, textX, topY + lineHeight + 35, vertical ? 50 : 40, "support")}<line x1="80" y1="${y}" x2="1000" y2="${y}" stroke="${color.purple}" stroke-width="14" stroke-linecap="round"/><text x="80" y="${y - 38}" class="eyebrow">STUNN</text>`;
  } else if (scene.type === "clock") {
    const clockY = topSafe + (vertical ? 520 : 350);
    content = `<text x="${width / 2}" y="${clockY}" text-anchor="middle" class="headline">3:59PM</text><line x1="190" y1="${clockY + 80}" x2="890" y2="${clockY + 80}" stroke="${color.purple}" stroke-width="6"/><text x="${width / 2}" y="${clockY + 260}" text-anchor="middle" class="headline">4:00PM</text><text x="${width / 2}" y="${clockY + 360}" text-anchor="middle" class="support">The cup stays. The stimulant goes.</text>`;
  } else if (scene.type === "split") {
    const y = height - bottomSafe - (vertical ? 410 : 300);
    content = `<rect y="${y - 150}" width="${width}" height="${height - y + 150}" fill="url(#bottom)"/>${lineText(scene.lines, textX, y, lineHeight, "headline")}`;
  } else if (scene.type === "dose") {
    content = `<rect x="60" y="${topSafe + 250}" width="12" height="${vertical ? 720 : 500}" fill="${color.purple}"/>${lineText(scene.lines, 120, topSafe + 430, headlineSize * 1.02, "headline")}${lineText(scene.support, 120, topSafe + 430 + (scene.lines?.length ?? 0) * headlineSize * 1.02 + 55, vertical ? 50 : 40, "support")}`;
  } else if (scene.type === "type") {
    content = `${lineText(scene.lines, textX, topY, lineHeight, "headline")}${lineText(scene.support, textX, topY + (scene.lines?.length ?? 0) * lineHeight + 36, vertical ? 50 : 40, "support")}<line x1="60" y1="${height - bottomSafe - 120}" x2="1020" y2="${height - bottomSafe - 120}" stroke="${color.purple}" stroke-width="4"/>`;
  } else if (scene.type === "end") {
    const y = topSafe + (vertical ? 280 : 180);
    const ctaY = height - bottomSafe - (vertical ? 350 : 260);
    content = `
      ${lineText(scene.lines, width / 2, y, lineHeight, "headline", "middle")}
      <rect x="120" y="${ctaY}" width="840" height="98" rx="49" fill="${color.purple}"/>
      <text x="540" y="${ctaY + 64}" text-anchor="middle" class="cta">TRY STUNN &#183; STUNN.CO</text>
      <rect x="0" y="${height - bottomSafe - 180}" width="${width}" height="76" fill="${color.lilac}"/>
      <text x="540" y="${height - bottomSafe - 131}" text-anchor="middle" class="offer">10% OFF YOUR FIRST ORDER WITH WELCOME10</text>
      <text x="540" y="${height - bottomSafe - 50}" text-anchor="middle" class="support">Free shipping on every US order</text>`;
  }

  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><style>${styles(formatName)}</style>${defs()}${scene.type !== "end" ? watermark(width, topSafe, video) : `<text x="60" y="${topSafe + 36}" class="eyebrow">STUNN / BETTER DECAF</text>`}${content}</svg>`,
  );
}

async function photoBackground(source, formatName, position = "centre") {
  const { width, height } = formats[formatName];
  return sharp(path.join(imageRoot, source))
    .resize(width, height, { fit: "cover", position })
    .modulate({ saturation: 0.9, brightness: 0.98 })
    .png()
    .toBuffer();
}

async function splitBackground(scene, formatName) {
  const { width, height } = formats[formatName];
  const half = Math.floor(width / 2);
  const [left, right] = await Promise.all(
    scene.sources.map((source) =>
      sharp(path.join(imageRoot, source))
        .resize(half, height, { fit: "cover", position: "centre" })
        .png()
        .toBuffer(),
    ),
  );
  return sharp({
    create: { width, height, channels: 4, background: color.cream },
  })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: half, top: 0 },
    ])
    .png()
    .toBuffer();
}

async function renderFrame(video, scene, formatName, framePath) {
  const { width, height } = formats[formatName];
  let background;
  if (scene.type === "photo") {
    background = await photoBackground(
      scene.source,
      formatName,
      scene.position ?? "centre",
    );
  } else if (scene.type === "split") {
    background = await splitBackground(scene, formatName);
  } else {
    background = await sharp({
      create: { width, height, channels: 4, background: color.cream },
    })
      .png()
      .toBuffer();
  }

  await sharp({
    create: { width, height, channels: 4, background: color.cream },
  })
    .composite([
      { input: background, left: 0, top: 0 },
      { input: overlaySvg(video, scene, formatName), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(framePath);
}

async function encodeSegment(framePath, outputPath, duration, formatName) {
  const { width, height } = formats[formatName];
  const fadeOutStart = Math.max(0, duration - 0.12).toFixed(2);
  const frames = Math.round(duration * 30);
  await run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-loop",
    "1",
    "-i",
    framePath,
    "-t",
    String(duration),
    "-vf",
    `zoompan=z='min(zoom+0.00015,1.015)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=${width}x${height}:fps=30,fade=t=in:st=0:d=0.12,fade=t=out:st=${fadeOutStart}:d=0.12,format=yuv420p`,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "18",
    "-movflags",
    "+faststart",
    outputPath,
  ]);
}

async function buildVideo(video, formatName) {
  const videoDir = formatName === "vertical" ? video9x16Dir : video4x5Dir;
  const formatLabel = formatName === "vertical" ? "9x16" : "4x5";
  const framesDir = path.join(storyboardRoot, video.id, formatLabel);
  const segmentsDir = path.join(segmentRoot, video.id, formatLabel);
  await Promise.all([
    fs.mkdir(framesDir, { recursive: true }),
    fs.mkdir(segmentsDir, { recursive: true }),
  ]);

  const segmentPaths = [];
  for (let index = 0; index < video.scenes.length; index += 1) {
    const scene = video.scenes[index];
    const framePath = path.join(
      framesDir,
      `${String(index + 1).padStart(2, "0")}.png`,
    );
    const segmentPath = path.join(
      segmentsDir,
      `${String(index + 1).padStart(2, "0")}.mp4`,
    );
    await renderFrame(video, scene, formatName, framePath);
    await encodeSegment(framePath, segmentPath, scene.duration, formatName);
    segmentPaths.push(segmentPath);
  }

  const concatPath = path.join(segmentsDir, "concat.txt");
  await fs.writeFile(
    concatPath,
    `${segmentPaths.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n")}\n`,
  );
  const outputPath = path.join(videoDir, `${video.slug}.mp4`);
  await run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    concatPath,
    "-c",
    "copy",
    "-movflags",
    "+faststart",
    outputPath,
  ]);
  return outputPath;
}

async function storyboardSheet() {
  const thumbW = 216;
  const thumbH = 384;
  const labelH = 32;
  const gap = 12;
  const cols = 4;
  const width = cols * thumbW + (cols + 1) * gap;
  const height = 2 * (thumbH + labelH + gap) + gap;
  const composites = [];
  for (let i = 0; i < videos.length; i += 1) {
    const firstFrame = path.join(
      storyboardRoot,
      videos[i].id,
      "9x16",
      "01.png",
    );
    const thumb = await sharp(firstFrame)
      .resize(thumbW, thumbH, { fit: "cover" })
      .png()
      .toBuffer();
    const x = gap + (i % cols) * (thumbW + gap);
    const y = gap + Math.floor(i / cols) * (thumbH + labelH + gap);
    const label = Buffer.from(
      `<svg width="${thumbW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color.cream}"/><text x="6" y="22" font-family="Arial" font-size="17" font-weight="700" fill="${color.ink}">${videos[i].id} / ANIMATIC</text></svg>`,
    );
    composites.push({ input: label, left: x, top: y });
    composites.push({ input: thumb, left: x, top: y + labelH });
  }
  await sharp({
    create: { width, height, channels: 4, background: color.cream },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputRoot, "video-storyboard-contact-sheet.png"));
}

await Promise.all([
  fs.mkdir(video9x16Dir, { recursive: true }),
  fs.mkdir(video4x5Dir, { recursive: true }),
  fs.mkdir(storyboardRoot, { recursive: true }),
  fs.mkdir(segmentRoot, { recursive: true }),
]);

const videoOutputs = [];
for (const video of videos) {
  console.log(`Building ${video.id} ${video.title}`);
  const vertical = await buildVideo(video, "vertical");
  const portrait = await buildVideo(video, "portrait");
  videoOutputs.push({ video, vertical, portrait });
}

await storyboardSheet();

const manifestPath = path.join(outputRoot, "manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
manifest.videos = videoOutputs.map(({ video, vertical, portrait }) => ({
  id: video.id,
  title: video.title,
  status: "ANIMATIC - NOT APPROVED FOR MEDIA",
  physicalFootageRequirement: video.shotStatus,
  script: video.scenes.map((scene) => ({
    duration: scene.duration,
    visualType: scene.type,
    sourceImages: [scene.source, ...(scene.sources ?? [])].filter(Boolean),
    captions: [...(scene.lines ?? []), ...(scene.support ?? [])],
  })),
  outputs: {
    vertical: path.relative(outputRoot, vertical),
    portrait: path.relative(outputRoot, portrait),
  },
}));
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

const notes = `# STUNN Adpack v4 video production status

## Important

The MP4 files in this delivery are animatics, not final media. They are visibly marked and must not be launched. The repository and supplied folders do not contain the physical STUNN product footage required by the brief. Existing STUNN photography is used for composition, timing, captions and edit direction only. Packaging has not been generated, redrawn or animated.

## Shared shoot rules

- Use the real current STUNN box and sachet.
- Keep the Supplement Facts panel out of frame or out of focus.
- Record clean 4K vertical masters with room for 4:5 cropping.
- Hold each action for at least four seconds before and after movement.
- Capture natural room tone separately.
- Match the cream, lilac, purple and ink palette in wardrobe and surfaces.
- No auto-captioning. Use the proofread captions in manifest.json.

## Required footage by ad

${videos.map((video) => `### ${video.id} - ${video.title}\n\n${video.shotStatus}\n`).join("\n")}
`;
await fs.writeFile(path.join(outputRoot, "ANIMATIC-NOT-FOR-MEDIA.md"), notes);

await fs.rm(segmentRoot, { recursive: true, force: true });

console.log(
  `Built ${videoOutputs.length * 2} video animatics in ${outputRoot}`,
);
