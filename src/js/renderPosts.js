import { fetchPosts } from "./fetchPosts";

let isLoading;

const tableBody = document.querySelector(".table__body");

const markupHandler = (userId, postId, title, body) => {
  return `      
  <tr>
    <td class="table__cell ">${userId}</td>
    <td class="table__cell ">${postId}</td>
    <td class="table__cell">${title}</td>
    <td class="table__cell">${body}</td>
  </tr>
  `;
};

const errorMarkupHandler = (errorText) => {
  return `      
  <tr>
    <td colspan="4" class="table__cell table__cell--error">${errorText}</td>
  </tr>`;
};

export const renderPosts = async (isFirstRender, sortedData, isSearching = false) => {
  let markup;
  isLoading = !isSearching;

  if (isLoading) {
    markup = `      
    <tr>
      <td colspan="4" class="table__cell table__cell--loading">Loading....</td>
    </tr>
    `;

    tableBody.insertAdjacentHTML("afterbegin", markup);
  }

  // Имитация задержки для отображения состояния загрузки
  setTimeout(
    async () => {
      try {
        let data = isFirstRender ? await fetchPosts() : sortedData;
        markup = data
          .map((item) =>
            markupHandler(item.userId, item.id, item.title, item.body),
          )
          .join("");

        return data;
      } catch (error) {
        markup = errorMarkupHandler("Something went wrong");
      } finally {
        tableBody.innerHTML = "";
        tableBody.insertAdjacentHTML("afterbegin", markup);
        isLoading = false;
      }
    },
    isFirstRender ? 1000 : isSearching ? 0 : 500,
  );
};

renderPosts(true);
