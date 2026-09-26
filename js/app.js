const PLAYERS = [
  {
    ign: "NXvesGrey",
    name: "Nahid Hasan Joy",
    role: "ROLE TBA",
    photo: "assets/grey.png",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesMONARCH",
    name: "Asif Ahmed",
    role: "ROLE TBA",
    photo: "assets/monarch.png",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesNooZY",
    name: "Shamiulla Shitul",
    role: "ROLE TBA",
    photo: "assets/noozy.png",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "BOTxTEKZEEz",
    name: "Wasir",
    role: "ROLE TBA",
    photo: "assets/TEKZEEz.png",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesRYUK",
    name: "Robiul Islam",
    role: "ROLE TBA",
    photo: "assets/ryuk.png",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesAkaTsukI",
    name: "Samin Muktadir",
    role: "ROLE TBA",
    photo: "assets/akatsuki.png",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  }
];


/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (loader) {

    setTimeout(() => {

      loader.classList.add("hide");

    }, 500);

  }

});


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");


if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

  });


  navMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

      });

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================
   PLAYER CARD
========================= */

function createPlayerCard(player, index) {

  return `
    <article class="player-card reveal">

      <span class="player-number">
        0${index + 1}
      </span>


      <div class="player-avatar">

        <img
          src="${player.photo}"
          alt="${player.ign}"
          class="player-photo"
        >

      </div>


      <div class="player-info">

        <div class="player-role">
          ${player.role}
        </div>

        <h3>
          ${player.ign}
        </h3>

        <div class="player-name">
          ${player.name}
        </div>

      </div>


      <div class="player-arrow">
        ↗
      </div>

    </article>
  `;

}


/* =========================
   HOME ROSTER
========================= */

const homeRoster =
  document.getElementById("homeRoster");


if (homeRoster) {

  homeRoster.innerHTML =
    PLAYERS
      .slice(0, 3)
      .map((player, index) => {

        return createPlayerCard(
          player,
          index
        );

      })
      .join("");


  setTimeout(() => {

    homeRoster
      .querySelectorAll(".reveal")
      .forEach(element => {

        revealObserver.observe(
          element
        );

      });

  }, 100);

}


/* =========================
   FULL ROSTER
========================= */

const rosterGrid =
  document.getElementById("rosterGrid");


if (rosterGrid) {

  rosterGrid.innerHTML =
    PLAYERS
      .map((player, index) => {

        return createPlayerCard(
          player,
          index
        );

      })
      .join("");


  setTimeout(() => {

    rosterGrid
      .querySelectorAll(".reveal")
      .forEach(element => {

        revealObserver.observe(
          element
        );

      });

  }, 100);

}


/* =========================
   PLAYER STATS TABLE
========================= */

const statsTable =
  document.getElementById("statsTable");


if (statsTable) {

  statsTable.innerHTML =
    PLAYERS
      .map(player => {

        return `
          <tr>

            <td>
              <span class="stats-player">
                ${player.ign}
              </span>
            </td>


            <td>
              <span class="stats-role">
                ${player.role}
              </span>
            </td>


            <td>
              ${player.matches}
            </td>


            <td>
              ${player.tournamentKills}
            </td>


            <td>
              ${player.scrimKills}
            </td>


            <td>
              <strong>
                ${player.totalKills}
              </strong>
            </td>

          </tr>
        `;

      })
      .join("");

}


/* =========================
   SMOOTH INTERNAL LINKS
========================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const target =
          document.querySelector(
            anchor.getAttribute("href")
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth"
        });

      }
    );

  });


/* =========================
   PARALLAX HERO
========================= */

const heroLogo =
  document.querySelector(".hero-logo");


window.addEventListener(
  "mousemove",
  event => {

    if (!heroLogo) return;


    const x =
      (window.innerWidth / 2 - event.clientX) / 80;


    const y =
      (window.innerHeight / 2 - event.clientY) / 80;


    heroLogo.style.transform =
      `translate(${x}px, ${y}px)`;

  }
);


/* =========================
   CURRENT YEAR
========================= */

document
  .querySelectorAll(
    ".footer-bottom span:first-child"
  )
  .forEach(element => {

    element.innerHTML =
      `© ${new Date().getFullYear()} NEXVORA E-SPORTS`;

  });
