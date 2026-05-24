import type { StructureResolver } from "sanity/structure";

// Custom desk structure. Site Settings and Homepage are singletons, so we
// render them as single editable documents rather than document lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("STUNN Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      S.documentTypeListItem("landingPage").title("Landing Pages"),
      // Future phases (testimonials, personas, product content) append here.
    ]);
