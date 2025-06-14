import { NextSeo } from "next-seo";

const SeoWrapper = ({
  title,
  description,
  imageAlt = "Screenplay Blogs | Editor",
  pathname,
  image = "https://screenplay-assets.s3.ap-south-1.amazonaws.com/screenplay-logo-white.png",
  ...props
}) => {
  const pageSeo = {
    title: "Screenplay",
  };
  const metaTitle = title ?? pageSeo.title;
  const metaDescription = description ?? pageSeo.description;
  const canonical = `https://screenplay.ink`;

  const metaImage = image;
  return (
    <header>
      <meta charset="UTF-8" />
      <NextSeo
        {...props}
        title={metaTitle}
        description={metaDescription}
        canonical={pathname ? canonical : undefined}
        openGraph={{
          ...pageSeo.openGraph,
          title: metaTitle,
          description: metaDescription,
          url: pathname ? canonical : undefined,
          images: [
            {
              url: metaImage,
              width: 1200,
              height: 630,
              alt: imageAlt,
              type: "image/png",
            },
          ],
        }}
        additionalMetaTags={[
          ...pageSeo.additionalMetaTags,
          {
            name: "twitter:title",
            content: metaTitle,
          },
          {
            name: "twitter:description",
            content: metaDescription,
          },
          {
            name: "twitter:image",
            content: metaImage,
          },
        ]}
      />
    </header>
  );
};

export default SeoWrapper;
