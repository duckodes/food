import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, push, get, remove, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import fetcher from "./fetcher.js";

const main = (async () => {
    const firebaseConfig = await fetcher.load('../res/config/firebaseConfig.json');
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const menuGrid = document.getElementById("menuGrid");
    onValue(ref(database, "food"), (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot);
        menuGrid.innerHTML = "";

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
    });
})();