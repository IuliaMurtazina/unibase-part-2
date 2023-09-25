import { postsData } from "./fetchPosts";
import { renderPosts } from "./renderPosts";
import { sortedData } from "./sortPosts";

export let filteredData = [];
export let currentSearchText = "";

export function filterDataHandler(searchText, data) {
  currentSearchText = searchText;
  filteredData = data.filter((item) => {
    const itemAsString = JSON.stringify(item).toLowerCase();
    return itemAsString.includes(searchText.toLowerCase());
  });

  renderPosts(false, filteredData, true);
}

const searchInput = document.querySelector(".search__input");
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value;
  let data = sortedData.length > 0 ? sortedData : postsData;

  if (searchText.length >= 3) {
    filterDataHandler(searchText, data);
  } else {
    renderPosts(false, data, true);
  }
});
