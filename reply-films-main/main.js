const elList = document.querySelector(".list");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form__select");
const elButton = document.querySelector(".form__button");
const elSavedList = document.querySelector(".saved-list");
const modal = document.querySelector(".modal");
const cont = document.querySelector(".container");

// const localFilms =JSON.parse(window.localStorage.getItem("document"));

let savedArr = [];
let modalArr = [];


elSavedList.addEventListener("click", (ev) => {
    const saveIDIs = ev.target.matches(".save-delete");
    if(saveIDIs){
        const svID = Number(ev.target.dataset.saveID);
        const findSvId = savedArr.findIndex(e => e.id == svID);
        savedArr.splice(findSvId,1);
        rederSavedArr(savedArr,elSavedList)
    }
});

function rederSavedArr(arr, element) {
    element.innerHTML = "";
    arr.forEach(save => {
        const saveItem = document.createElement("li");
        const saveDelete = document.createElement("button");

        saveItem.textContent = save.title;
        saveItem.classList.add("save-item");

        saveDelete.classList.add("save-delete");
        saveDelete.textContent = "Delete";
        saveDelete.dataset.saveID = save.id;

        element.appendChild(saveItem);
        saveItem.appendChild(saveDelete);


    });
}

elList.addEventListener("click", evt => {
    const savedSpan = evt.target.matches(".span-img");
    const moreBt = evt.target.matches(".more-btn");
    if(savedSpan) {
        const saved = evt.target.dataset.filmId;
        const foundSaved = films.find(e => e.id == saved);
        // window.localStorage.setItem("document" , JSON.stringify(films));
        if(!savedArr.includes(foundSaved)){
            savedArr.push(foundSaved);
        };

    };
    if(moreBt){
        modal.classList.add("del");
        const moreBtnID = evt.target.dataset.moreID;
        const findBtnIdMore = films.find(e => e.id == moreBtnID);

        if(!modalArr.includes(findBtnIdMore)){
            modalArr.push(findBtnIdMore);

        };
        function createModal(arr, element) {
            modal.innerHTML = "";
            const deleteModal = document.createElement("span");
            const innerBox = document.createElement("div");
            const moreImg = document.createElement("img");
            const innerBox2 = document.createElement("div");
            const moreTitle = document.createElement("h1");
            const moretext = document.createElement("p");
            const morePage = document.createElement("h2");
            const moreGenes = document.createElement("p");

            deleteModal.classList.add("delete-modal");
            innerBox.classList.add("inner-box");
            moreImg.classList.add("more-img");
            moreTitle.classList.add("more-title");
            moretext.classList.add("more-text");
            innerBox2.classList.add("inner-box2");
            morePage.classList.add("more-page");
            moreGenes.classList.add("more-genes")

            moreImg.setAttribute("src" , arr.poster);
            moreTitle.textContent = arr.title;
            moretext.textContent = arr.overview;
            morePage.textContent = "Home Page: ";
            moreGenes.textContent = arr.genres;

            element.appendChild(deleteModal);
            element.appendChild(innerBox);
            innerBox.appendChild(moreImg);
            innerBox.appendChild(innerBox2)
            innerBox2.appendChild(moreTitle);
            innerBox2.appendChild(moretext);
            innerBox2.appendChild(morePage);
            innerBox2.appendChild(moreGenes);

            deleteModal.addEventListener("click" , () => {
                modal.classList.remove("del");

            }) ;
        }

        createModal(findBtnIdMore, modal);


    }



    rederSavedArr(savedArr,elSavedList);
});

function reder(basic , el){
    el.innerHTML = null;
    for (const film of basic) {
        let elItem = document.createElement("li");
        let elBox = document.createElement("div");
        let elImg = document.createElement("img");
        let elTitle = document.createElement("h1");
        let elText = document.createElement("p");
        let elBtnMore = document.createElement("button");
        let elSpan = document.createElement("span");


        el.appendChild(elItem);
        elItem.appendChild(elImg);
        elBox.appendChild(elTitle);
        elBox.appendChild(elText);
        elBox.appendChild(elBtnMore);
        elBox.appendChild(elSpan);
        elItem.appendChild(elBox);


        elBtnMore.textContent = "More";
        elBtnMore.classList.add("more-btn");
        elBtnMore.dataset.moreID = film.id;

        elSpan.classList.add("span-img");
        elSpan.dataset.filmId = film.id;


        elItem.classList.add("list__item");
        elBox.classList.add("list__box")

        elImg.setAttribute("src" , film.poster);
        elImg.setAttribute("alt", "fi");
        elImg.classList.add("list__img");

        elTitle.textContent = film.title;
        elTitle.classList.add("list__title");

        elText.textContent = film.overview.split(" ").slice(0 ,15).join(" ")
        elText.classList.add("list__text");




        function rederFils(brr, element){
            var result = [];

            brr.forEach(film => {
                film.genres.forEach(gen => {
                    if(!result.includes(gen)){
                        result.push(gen);
                    }
                })
            });

            result.forEach(findNewOption => {
                let elOption = document.createElement("option");
                element.appendChild(elOption);
                elOption.value = findNewOption;
                elOption.textContent = findNewOption;
            });

        }
    }
    rederFils(films, elSelect);

}
reder(films , elList)

elForm.addEventListener("submit", e => {
    e.preventDefault();

    let selectVal = elSelect.value.trim();
    let foundFilm = [];

    if(selectVal){
        foundFilm = films.filter((fil) => {
            return fil.genres.includes(selectVal);
        })
    }
    reder(foundFilm, elList);
});
