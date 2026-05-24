import OpengraphImage from "components/opengraph-image";

export default async function Image() {
  return await OpengraphImage({
    title: "Coffee Without the Side Effects",
    description: "Real coffee ritual. 0mg caffeine.",
  });
}
