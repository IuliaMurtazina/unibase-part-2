export let postsData = [];

export const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    postsData = await data;
    return data;
  } catch (error) {
    throw new Error("Error loading data:", error.message);
  }
};