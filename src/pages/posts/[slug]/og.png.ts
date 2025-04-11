import { getCollection } from "astro:content";

interface Props {
  params: { slug: string };
  props: { redirect: string };
}

export async function GET({ props }: Props) {
  return new Response(props.redirect, {
    status: 302,
    headers: { Location: props.redirect },
  });
}

export async function getStaticPaths() {
  const blogPosts = await getCollection("blog");
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { redirect: post.data.image },
  }));
}
