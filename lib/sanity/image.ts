import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../../sanity/env";

const builder =
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

// Source type derived from the builder itself, so we don't depend on a
// specific internal type path that can move between package versions.
type ImageSource = Parameters<NonNullable<typeof builder>["image"]>[0];

// Returns an optimised image URL, or null if Sanity isn't configured or the
// source is empty. Callers fall back to their hardcoded image when null.
export function urlForImage(source: ImageSource | undefined | null) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max");
}
