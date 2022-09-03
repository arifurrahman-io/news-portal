
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
}

const loadNews = async (categoryId) => {

    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`

    const res = await fetch(url);
    const data = await res.json();
    const category = data.data;
    newsCategory(category);

    const counter = data.data.length
    loadCounter(counter);

}


const newsCategory = news => {
    const newsContainer = document.getElementById("text");

    newsContainer.textContent = '';

    news.forEach(myNews => {
        const categoryNews = document.createElement('div');
        categoryNews.classList.add('div');




        categoryNews.innerHTML = `
        <div class="row d-md-flex align-items-center border rounded bg-white">
            <div class="col-12 col-md-3 p-3 m-auto">
                <img src="${myNews.thumbnail_url}" class="rounded img-fluid" alt="...">
            </div>
            <div class="col-12 col-md-9 p-4">
                <div class="">
                    <h5 class="card-title">${myNews.title}</h5>
                    <p class="card-text">${myNews.details.slice(0, 300) + "..."}</p>
                </div>
                <div class="row">
                    <div class="author-sec mt-4 col-6 col-md-3">
                        <div class="d-flex align-items-center">
                            <div>
                                <img class="pe-2 author-image" src="${myNews.author.img}" alt="">
                            </div>
                            <div>
                                <p class="m-0 px-2">${myNews.author.name}</p>
                                <p class="m-0 px-2">${myNews.author.published_date}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 d-flex align-items-center ">
                        <i class="fa-regular fa-eye px-2"></i>
                        <p class="m-0 px-2">${myNews.total_view}</p>
                    </div>

                    <div class="col-6 col-md-3 d-flex align-items-center ">
                        <i class="fa-solid fa-star text-primary"></i>
                        <i class="fa-solid fa-star text-primary"></i>
                        <i class="fa-solid fa-star text-primary"></i>
                        <i class="fa-solid fa-star text-primary"></i>
                        <i class="fa-regular fa-star-half-stroke text-primary"></i>
                    </div>
                    <div class="col-6 col-md-3 d-flex align-items-center ">
                    <!-- Button trigger modal -->
                    <button id= "btn-modal" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Read More
                    </button>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${myNews.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                          ${myNews.details}
                          </div>
                          <div class="modal-footer">
                          
                            <div class = "d-flex justify-content-center align-items-center">
                                <i class="fa-regular fa-eye px-2"></i>
                                <p class="m-0 px-2">${myNews.total_view}</p>
                                <img class="pe-2 author-image" src="${myNews.author.img}" alt="">
                                <p class="m-0 px-2">${myNews.author.name}</p>
                                <p class="m-0 px-2">${myNews.author.published_date}</p>
                            </div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(categoryNews);

    })

    toggleSpinner(false)
}

const loadCounter = (counter, categoryId) => {
    const newsCounter = document.getElementById('counter')
    newsCounter.innerText = `${counter} Items Found for this Category`;
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}



loadCategories();


