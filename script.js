var baseapi1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
var serach = document.querySelector("#search");
var icon = document.querySelector("#icon")
var receipe = document.querySelector(".get");
console.log(serach)
console.log(icon)
icon.addEventListener("click", clicked);
serach.addEventListener("keyup", input);

async function input(e) {
    // console.log(e);
    if (serach.value != "" && e.key == "Enter") {
        console.log(search.value)
        await clear();
        await requestapi(search.value)
    }
}

function clicked() {
    // console.log("abhay")
    console.log(search.value)
    requestapi(search.value)
}

async function requestapi(data) {
    let response = await fetch(baseapi1 + data);
    data = await response.json();
    console.log(data.meals);
    if (data.meals == null) {
        document.querySelector(".container").innerHTML = "your search result is not found--search again"
    }
    else {
        var arr = data.meals
        arr.map((element, index) => {
            document.querySelector(".container").innerHTML += `<div class="box">
                                                            <img src="${data.meals[index].strMealThumb}" alt="" id="img">
                                                            <div class="title">
                                                                <h2>${data.meals[index].strMeal}</h2>
                                                            </div>
                                                            <div class="get">
                                                                <a href="#" class="no" id="${data.meals[index].idMeal}" onClick="getit(id)">Get Receipe</a>
                                                                <a href="#" class="id" >${data.meals[index].idMeal}</a>
                                                            </div>
                                                        </div>`

        });
    }
}

function getit(id) {
    console.log(id)
    showcontent(id);
}

async function showcontent(ids) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`)
    data = await data.json();
    console.log(data);
    let arr = data.meals;
    document.querySelector(".box2").style.display = "flex";
    arr.map(result => {
        document.querySelector(".box2").innerHTML += `<div class="close" onClick="closeit(${ids})">
                                        <i class="far fa-times-circle"></i>
                                    </div>
                                    <div class="title2">
                                        <h3 class="title-box">${result.strMeal}</h3>
                                        <h3 class="title-con">${result.strCategory}</h3>
                                        <h3 class="indegridients1">indegredient :-</h3>
                                        <p class="indegridents2">${result.strInstructions}</p>
                                        <img src=${result.strMealThumb} alt="">
                                        <div class="btn-video">
                                            <a href=${result.strYoutube}>Watch Video</a>
                                        </div>
                                    </div>`
    });
}

function closeit(id) {
    console.log(id);
    document.querySelector(".box2").style.display = "none";
}

function clear() {
    document.querySelector(".container").innerHTML = "";
}