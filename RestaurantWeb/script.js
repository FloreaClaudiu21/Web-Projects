//APIs
const ALL_MEALS = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const CATEGORY_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_DETAILS = 'https://themealdb.com/api/json/v1/1/lookup.php?i=';
const FIND_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

//variables
const menuList = document.getElementById('menu-list');
const categoryMeal = document.getElementById('category-meal');
const mealDetails = document.getElementById('meal-details');
const searchIngredient = document.getElementById('search-ingredient');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const clearBtn = document.getElementById('clear-btn');

function showMenu() {
    fetch(ALL_MEALS)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            let id = [0, 1, 3, 6];
            id.forEach((element) => {
                menuList.innerHTML += `
                <tr>
                    <td>${data.categories[element].strCategory}</td>
                    <td>
                        <img
                            src="${data.categories[element].strCategoryThumb}"
                            alt="no image"
                        >
                    </td>
                    <td><span>Description:</span>${data.categories[element].strCategoryDescription}</td>
                    <td><button id="${data.categories[element].strCategory}" onclick="showMealByCategory(this.id);">Choose this category</button></td>
                </tr>
            `;
                // console.log(menuList);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

function showMealByCategory(e = '') {
    // clear the div before create a new one
    categoryMeal.innerHTML = '';
    searchResult.innerHTML = '';
    //menuList display none
    menuList.classList.add('display-none');
    //after using button back to categories
    categoryMeal.style.display = 'grid';

    fetch(CATEGORY_MEAL + e)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            for (let i = 0; i < data.meals.length; i++) {
                categoryMeal.innerHTML += `
                    <div class="category-meal-div">
                        <p>${data.meals[i].strMeal}</p>
                        <img
                            src="${data.meals[i].strMealThumb}"
                            alt="no image"
                        >
                        <button id="${data.meals[i].idMeal}" onclick="showDetails(this.id);">Details</button>
                        <button onclick="backToCategories();">Back to Categories</button>
                    </div>
                `;
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function showDetails(e) {
    categoryMeal.style.display = 'none';
    mealDetails.classList.remove('display-none');

    searchResult.style.display = 'none';
    menuList.classList.add('display-none');

    fetch(MEAL_DETAILS + e)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            const meal = data.meals[0];
            addMealsToDOM(meal);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function addMealsToDOM(meal) {
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 15; i++) {
        // console.log(meal[`strIngredient${i}`]);
        if (meal[`strIngredient${i}` && `strMeasure${i}`]) {
            ingredients.push(meal[`strIngredient${i}`]);
            measures.push(meal[`strMeasure${i}`]);
        }
        else {
            break;
        }
    }
    // console.log(ingredients, measures);

    mealDetails.innerHTML = `
        <div class="meal-details-div">
            <button onclick="backToMeals();">Back to Meals</button>
            <p id="title">${meal.strMeal}</p>
            <img
                src="${meal.strMealThumb}"
                alt="no image"
            >
            <div>
                <h5>Ingredients</h5>
                <ul class="ingredients">
                   <div>${(ingredients).map(ing => `<li>${ing}</li>`).join("")}</div>
                    <div>${measures.map(measure => `<li>${measure}</li>`).join("")}</div>
                </ul>
                <p>Instructions: ${meal.strInstructions}</p>
            </div>
        </div>
    `;
}

function findMeal() {
    //clear searchResult div before create new one
    searchResult.innerHTML = '';
    //show clear Btn
    clearBtn.style.visibility = 'visible';
    //hide categories
    menuList.classList.add('display-none');

    fetch(FIND_MEAL + searchIngredient.value)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            for (let i = 0; i < data.meals.length; i++) {
                searchResult.innerHTML += `
                    <div>
                        <p>${data.meals[i].strMeal}</p>
                        <img
                            src="${data.meals[i].strMealThumb}"
                            alt="${data.meals[i].strMeal}"
                        />
                        <button id="${data.meals[i].idMeal}" onclick="showDetails(this.id);">Details</button>
                    </div>
                `;
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    //clear input
    searchIngredient.value = '';
}

function backToCategories() {
    categoryMeal.style.display = 'none';
    menuList.classList.remove('display-none');
}

function backToMeals() {
    categoryMeal.style.display = 'grid';
    mealDetails.classList.add('display-none');
    searchResult.style.display = 'grid';
}

function clearResults() {
    //clear searchResult div
    searchResult.innerHTML = '';
    //make clear button hidden after click it
    clearBtn.style.visibility = 'hidden';
    menuList.classList.remove('display-none');
    mealDetails.classList.add('display-none');
}