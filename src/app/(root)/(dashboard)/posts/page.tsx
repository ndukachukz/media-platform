export default async function PostsPage() {
  const response = await fetch(`/api/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const posts = await response.json();

  return <pre>{posts}</pre>;
}
