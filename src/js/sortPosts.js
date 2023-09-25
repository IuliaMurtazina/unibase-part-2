import { postsData } from "./fetchPosts";
import { renderPosts } from "./renderPosts";
import { currentSearchText } from "./searchPosts";
import { filterDataHandler } from "./searchPosts";

let sortedHeader = "";
export let sortedData = [];

const tableHeaders = document.querySelectorAll(".table__header");

const sortDataHandler = (columnName, sortOrder) => {
  sortedData = [...postsData];

  sortedData.sort((a, b) => {
    const aValue = a[columnName];
    const bValue = b[columnName];

    if (typeof aValue === "number" && typeof bValue === "number") {
      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    } else {
      if (sortOrder === "asc") {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    }
  });

  if (currentSearchText) {
    filterDataHandler(currentSearchText, sortedData);
  } else {
    renderPosts(false, sortedData);
  }
};

tableHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const isSortedHeader = sortedHeader === header.id;
    let sortOrder;

    tableHeaders.forEach((th) => {
      th.classList.remove("sorted-asc")
      th.classList.remove("sorted-desc")
    });

    if (isSortedHeader) {
      sortedHeader = "";
      sortOrder = "desc";
      header.classList.remove("sorted-asc");
      header.classList.add("sorted-desc");
    } else {
      sortedHeader = header.id;
      sortOrder = "asc";
      header.classList.add("sorted-asc");
      header.classList.remove("sorted-desc");
    }
    sortDataHandler(header.id, sortOrder);
  });
});
