import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import fetcher from "./fetcher.js";
import { $, $$, filters } from "../js/script.js";

const main = (async () => {
    const firebaseConfig = await fetcher.load('../res/config/firebaseConfig.json');
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const menuGrid = document.getElementById("menuGrid");
    onValue(ref(database, "food/special"), (snapshot) => {
        const data = snapshot.val();
        menuGrid.innerHTML = "";

        const filtersElement = $('.filters');
        const types = Object.values(data).map(item => item.type);
        const uniqueTypes = [...new Set(types)];
        filtersElement.innerHTML = "";
        filtersElement.insertAdjacentHTML("beforeend", `<button class="chip active" data-filter="all">全部</button>`);
        uniqueTypes.forEach(type => {
            const btn = `<button class="chip" data-filter="${type}">${type}</button>`;
            filtersElement.insertAdjacentHTML("beforeend", btn);
        });

        Object.values(data).forEach(item => {
            const card = `
                <article class="card" data-type="${item.type}">
                    <div class="card-media">
                    <img src="${item.img}" alt="${item.title}" />
                    </div>
                    <div class="card-body">
                    <h3>${item.title}</h3>
                    <p class="muted">${item.desc}</p>
                    <div class="card-foot">
                        <span class="price">NT$${item.price}</span>
                        <button class="btn btn-sm open-dish"
                        data-title="${item.title}"
                        data-img="${item.img}"
                        data-desc="${item.desc}">詳情</button>
                    </div>
                    </div>
                </article>
                `;

            menuGrid.insertAdjacentHTML("beforeend", card);
        });
        menuGrid.addEventListener("click", function (e) {
            if (e.target.classList.contains("open-dish")) {
                const title = e.target.dataset.title;
                const img = e.target.dataset.img;
                const desc = e.target.dataset.desc;

                const modal = $('#dishModal');
                const modalImg = $('#modalImg');
                const modalTitle = $('#modalTitle');
                const modalDesc = $('#modalDesc');
                modalImg.src = img;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                modal.setAttribute('aria-hidden', 'false');
            }
        });
        filters();
    });
})();