const getCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();
  const categories = data.data.news_category;
  displayCategories(categories);
};

const displayCategories = (categories) => {
  const tabContainer = document.getElementById("tab-container");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a data-index="${category.category_id}" onclick="handleClickCategory('${
      category.category_id
    }')" class="tab tab-lifted ${
      category.category_name === "All News" && "tab-active"
    }">${category.category_name}</a>
      `;
    tabContainer.appendChild(div);
  });
};

const handleClickCategory = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  const news = data.data;
  displayNews(news);
  const tab = document.querySelectorAll(".tab");
  tab.forEach((item) => {
    if (item.getAttribute("data-index") === categoryId) {
      item.classList.add("tab-active");
    } else {
      item.classList.remove("tab-active");
    }
  });
};

handleClickCategory("08");

const displayNews = (news) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  news.forEach((newsItem) => {
    console.log(newsItem);
    const div = document.createElement("div");
    div.className = "card bg-base-100 shadow-xl";
    div.innerHTML = `
      <figure><img src="${newsItem?.thumbnail_url}" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        ${newsItem.title}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>${newsItem.details.slice(0, 200)+ " ......"}</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div> 
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
    `;
    newsContainer.appendChild(div);
  });
};

getCategory();
