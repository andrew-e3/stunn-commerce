import OpengraphImage from "components/opengraph-image";

export default async function Image() {
  return await OpengraphImage({
    title: "Drink the Stack",
    description: "Full doses in one decaf coffee ritual.",
  });
}
