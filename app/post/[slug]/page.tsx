export default function Page({ post }: { post: object | string | any }) {
  return (
    <div>
      <h1>{post.slug}</h1>
      <article>{post.message}</article>
    </div>
  );
}
