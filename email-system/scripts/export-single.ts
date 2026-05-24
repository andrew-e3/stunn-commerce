/**
 * Export a single email to /out as HTML.
 * Usage: pnpm export:single welcome-1
 */
import { render } from "@react-email/components";
import fs from "fs";
import path from "path";
import React from "react";

const emailName = process.argv[2];
if (!emailName) {
  console.error("Usage: pnpm export:single <email-name>");
  console.error("Example: pnpm export:single welcome-1");
  process.exit(1);
}

async function main() {
  const emailPath = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    `../emails/${emailName}.tsx`,
  );

  if (!fs.existsSync(emailPath)) {
    console.error(`Email not found: emails/${emailName}.tsx`);
    process.exit(1);
  }

  const mod = await import(emailPath);
  const Component = mod.default;

  const html = await render(React.createElement(Component));

  const outDir = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../out",
  );
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${emailName}.html`);
  fs.writeFileSync(outPath, html, "utf8");
  console.log(`Exported: out/${emailName}.html`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
