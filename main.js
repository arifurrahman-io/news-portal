
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    const categories = data.data.news_category;
    displayCategories(categories);
}

const displayCategories = categories => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('li');
        categoryLi.innerHTML = `
        <a href='javascript:;' onclick = "loadNews(${category.category_id})"><li>${category.category_name}</li></a>
        `;
        categoryContainer.appendChild(categoryLi);
    });
    // href = "https://openapi.programming-hero.com/api/news/category/${category.category_id}

}

const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => newsCategory(data.data));
}


const newsCategory = news => {
    const newsContainer = document.getElementById("text");
    newsContainer.textContent = '';

    news.forEach(myNews => {
        const categoryNews = document.createElement('div');
        categoryNews.classList.add('div');
        categoryNews.innerHTML = `
        <div class="d-md-flex align-items-center border rounded bg-white">
        <div class="col col-md-3 p-3">
            <img src="${myNews.thumbnail_url}" class="rounded" alt="...">
        </div>
        <div class="col col-md-9 p-4">
            <div class="">
                <h5 class="card-title">${myNews.title}</h5>
                <p class="card-text">${myNews.details}</p>
            </div>
            <div class="row">
                <div class="author-sec mt-4 col-xs-6 col-sm-6 col-md-3">
                    <div class="d-flex align-items-center justify-content-center">
                        <div>
                            <img class="pe-2 author-image" src="${myNews.author.img}" alt="">
                        </div>
                        <div>
                            <p class="m-0 px-2">${myNews.author.name}</p>
                            <p class="m-0 px-2">${myNews.author.published_date}</p>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-3 d-flex align-items-center justify-content-center">
                    <i class="fa-regular fa-eye px-2"></i>
                    <p class="m-0 px-2">${myNews.total_view}</p>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-3 d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-star text-primary"></i>
                    <i class="fa-solid fa-star text-primary"></i>
                    <i class="fa-solid fa-star text-primary"></i>
                    <i class="fa-solid fa-star text-primary"></i>
                    <i class="fa-regular fa-star-half-stroke text-primary"></i>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-3 d-flex align-items-center justify-content-end">
                    <i class="fa-solid fa-arrow-right-long text-info fs-3"></i>
                </div>
            </div>
        </div>
    </div>
        `

        newsContainer.appendChild(categoryNews);
    })
}

loadCategories();
