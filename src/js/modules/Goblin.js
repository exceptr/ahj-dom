export default class Goblin {
  constructor() {
    this.size = 16;
    this.lastGoblin = 0;
  }

  createHtml() {
    const goblin = document.getElementById("goblin");

    const card = document.createElement("div");
    card.classList.add("card");
    goblin.appendChild(card);

    const points = `
    <div id="status" class="status">
    Попаданий: <span id="dead">0</span><br>
    Промахов: <span id="lost">0</span><br>
    </div>`;
    card.insertAdjacentHTML("afterBegin", points);

    const holeGame = document.createElement("div");
    holeGame.classList.add("hole-game");
    card.appendChild(holeGame);

    const buttonClearStat = `<button class="button-clear-stat">Очистить статистику</button>`;
    card.insertAdjacentHTML("beforeend", buttonClearStat);

    for (let i = 0; i < this.size; i++) {
      const hole = document.createElement("div");
      hole.classList.add("hole");
      hole.id = `hole${i}`;
      holeGame.appendChild(hole);
    }
  }

  goblinRandom() {
    const random = () => {
      const rand = Math.floor(Math.random() * this.size);

      if (rand === this.lastGoblin) return random();

      this.lastGoblin = rand;
      return rand;
    };
    setInterval(() => {
      this.hole[this.lastGoblin].classList.remove("hole_has-goblin");
      const index = random();
      this.hole[index].classList.add("hole_has-goblin");
    }, 800);

    this.hole = Array.from(document.querySelectorAll(".hole"));
  }

  getHoleIndex(index) {
    let holeClick = document.getElementById(`hole${index}`);
    return holeClick;
  }

  goblinClick() {
    const clearStat = document.querySelector(".button-clear-stat");
    clearStat.onclick = () => {
      this.dead.textContent = 0;
      this.lost.textContent = 0;
    };

    this.dead = document.getElementById("dead");
    this.lost = document.getElementById("lost");

    for (let index = 1; index <= 16; index++) {
      this.getHoleIndex(index);
      let hole = this.getHoleIndex(index);

      hole.onclick = () => {
        if (hole.className.includes("hole_has-goblin") === true) {
          this.dead.textContent = Number(this.dead.textContent) + 1;
        } else {
          this.lost.textContent = Number(this.lost.textContent) + 1;
        }
      };
    }
  }

  onclickButtonClearStat() {
    const clearStat = document.querySelector(".button-clear-stat");
    console.log(clearStat);
    clearStat.onclick = () => {
      this.dead.textContent = 0;
      this.lost.textContent = 0;
    };
  }
}
