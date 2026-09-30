const PLAYERS = [
  {
    ign: "NXvesGrey",
    name: "Nahid Hasan Joy",
    role: "FRAGGER",
    photo: "assets/grey.png",
    matches: 26,
    tournamentKills: 3,
    scrimKills: 14
  },

  {
    ign: "NXvesMONARCH",
    name: "Asif Ahmed",
    role: "IGL",
    photo: "assets/monarch.png",
    matches: 28,
    tournamentKills: 2,
    scrimKills: 14
  },

  {
    ign: "NXvesNooZY",
    name: "Shamiulla Shitul",
    role: "ASSAULTER",
    photo: "assets/noozy.png",
    matches: 34,
    tournamentKills: 3,
    scrimKills: 21
  },

  {
    ign: "BOTxTEKZEEz",
    name: "Wasir",
    role: "FRAGGER",
    photo: "assets/TEKZEEz.png",
    matches: 12,
    tournamentKills: 0,
    scrimKills: 25
  },

  {
    ign: "NXvesRYUK",
    name: "Robiul Islam",
    role: "SUPPORTER",
    photo: "assets/ryuk.png",
    matches: 11,
    tournamentKills: 0,
    scrimKills: 6
  },

  {
    ign: "NXvesAkaTsukI",
    name: "Samin Muktadir",
    role: "SUPPORTER",
    photo: "assets/akatsuki.png",
    matches: 17,
    tournamentKills: 1,
    scrimKills: 1
  }
];


/* =========================================================
   AUTOMATIC TOTAL KILLS
========================================================= */

PLAYERS.forEach(player => {

  player.matches =
    Number(player.matches) || 0;

  player.tournamentKills =
    Number(player.tournamentKills) || 0;

  player.scrimKills =
    Number(player.scrimKills) || 0;

  player.totalKills =
    player.tournamentKills +
    player.scrimKills;

});


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

  const loader =
    document.getElementById("loader");

  if (loader) {

    setTimeout(() => {

      loader.classList.add("hide");

    }, 500);

  }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");


if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

  });


  navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

    });

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

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


/* =========================================================
   PLAYER CARD
========================================================= */

function createPlayerCard(player, index) {

  return `
    <article class="player-card reveal">

      <span class="player-number">
        ${String(index + 1).padStart(2, "0")}
      </span>

      <div class="player-avatar">

        <img
          src="${player.photo}"
          alt="${player.ign}"
          class="player-photo"
          loading="lazy"
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


/* =========================================================
   HOME ROSTER
========================================================= */

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

        revealObserver.observe(element);

      });

  }, 100);

}


/* =========================================================
   FULL ROSTER
========================================================= */

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

        revealObserver.observe(element);

      });

  }, 100);

}


/* =========================================================
   PLAYER STATISTICS
   PROFESSIONAL RANKED LEADERBOARD
========================================================= */

const statsTable =
  document.getElementById("statsTable");


if (statsTable) {

  /*
    Ranking rules:

    1. Highest TOTAL KILLS first
    2. If total kills are equal,
       highest MATCHES first
    3. If both are equal,
       original player order
  */

  const rankedPlayers =
    PLAYERS
      .map((player, originalIndex) => {

        return {
          ...player,
          originalIndex
        };

      })
      .sort((a, b) => {

        /* TOTAL KILLS */

        if (b.totalKills !== a.totalKills) {

          return b.totalKills -
                 a.totalKills;

        }


        /* MATCHES */

        if (b.matches !== a.matches) {

          return b.matches -
                 a.matches;

        }


        /* ORIGINAL ORDER */

        return a.originalIndex -
               b.originalIndex;

      });


  /*
    Create professional leaderboard rows.
  */

  statsTable.innerHTML =
    rankedPlayers
      .map((player, index) => {

        const rank =
          String(index + 1).padStart(2, "0");


        return `
          <tr class="stats-row">

            <!-- RANK -->

            <td class="stats-rank-cell">

              <span class="stats-rank">
                ${rank}
              </span>

            </td>


            <!-- PLAYER -->

            <td class="stats-player-cell">

              <div class="stats-player-wrap">

                <span class="stats-player">
                  ${player.ign}
                </span>

                <small class="stats-real-name">
                  ${player.name}
                </small>

              </div>

            </td>


            <!-- ROLE -->

            <td class="stats-role-cell">

              <span class="stats-role">
                ${player.role}
              </span>

            </td>


            <!-- MATCHES -->

            <td class="stats-number-cell">

              <span class="stats-number">
                ${player.matches}
              </span>

            </td>


            <!-- TOURNAMENT KILLS -->

            <td class="stats-number-cell">

              <span class="stats-number">
                ${player.tournamentKills}
              </span>

            </td>


            <!-- SCRIM KILLS -->

            <td class="stats-number-cell">

              <span class="stats-number">
                ${player.scrimKills}
              </span>

            </td>


            <!-- TOTAL KILLS -->

            <td class="stats-total-cell">

              <strong class="stats-total">
                ${player.totalKills}
              </strong>

            </td>

          </tr>
        `;

      })
      .join("");

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

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
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   CROSS-PAGE PLAYER STATS LINK
========================================================= */

document
  .querySelectorAll(
    'a[href="roster.html#player-stats"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        /*
          Allow browser to open roster.html
          and jump directly to player stats.
        */

        sessionStorage.setItem(
          "openPlayerStats",
          "true"
        );

      }
    );

  });


/* =========================================================
   OPEN PLAYER STATS AFTER PAGE LOAD
========================================================= */

if (
  window.location.pathname
    .toLowerCase()
    .endsWith("roster.html")
) {

  const hash =
    window.location.hash;


  if (hash === "#player-stats") {

    setTimeout(() => {

      const statsSection =
        document.getElementById(
          "player-stats"
        );


      if (statsSection) {

        statsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }, 250);

  }

}


/* =========================================================
   PARALLAX HERO
========================================================= */

const heroLogo =
  document.querySelector(".hero-logo");


window.addEventListener(
  "mousemove",
  event => {

    if (!heroLogo) return;

    const x =
      (window.innerWidth / 2 -
        event.clientX) / 80;

    const y =
      (window.innerHeight / 2 -
        event.clientY) / 80;

    heroLogo.style.transform =
      `translate(${x}px, ${y}px)`;

  }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

document
  .querySelectorAll(
    ".footer-bottom span:first-child"
  )
  .forEach(element => {

    element.innerHTML =
      `© ${new Date().getFullYear()} NEXVORA E-SPORTS`;

  });


/* =========================================================
   NEXVORA PREMIUM INTERACTIONS
========================================================= */


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
  document.createElement("div");

cursorGlow.className =
  "nx-cursor-glow";

document.body.appendChild(
  cursorGlow
);


window.addEventListener(
  "pointermove",
  event => {

    cursorGlow.style.transform =
      `translate3d(
        ${event.clientX}px,
        ${event.clientY}px,
        0
      )`;

  }
);


/* =========================================================
   PREMIUM CARD TILT
========================================================= */

const tiltCards =
  document.querySelectorAll(
    ".player-card, .management-card, .about-card, .nx-system-item"
  );


if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  tiltCards.forEach(card => {

    card.addEventListener(
      "pointermove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) *
          -4;

        const rotateY =
          ((x / rect.width) - 0.5) *
          4;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-6px)`;

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  document
    .querySelectorAll(".btn")
    .forEach(button => {

      button.addEventListener(
        "pointermove",
        event => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          button.style.transform =
            `translate(
              ${x * 0.08}px,
              ${y * 0.08}px
            )`;

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform = "";

        }
      );

    });

}


/* =========================================================
   ACTIVE PAGE NAVIGATION
========================================================= */

const currentPage =
  window.location.pathname
    .split("/")
    .pop()
    .toLowerCase() || "index.html";


const currentHash =
  window.location.hash.toLowerCase();


document
  .querySelectorAll("#navMenu a")
  .forEach(link => {

    const href =
      link
        .getAttribute("href")
        .toLowerCase();


    /*
      Remove previously assigned active state.
    */

    link.classList.remove("active");


    /*
      PLAYER STATS
      roster.html#player-stats
    */

    if (
      currentPage === "roster.html" &&
      currentHash === "#player-stats" &&
      href === "roster.html#player-stats"
    ) {

      link.classList.add("active");

      return;

    }


    /*
      Normal page navigation
    */

    if (
      !currentHash &&
      href === currentPage
    ) {

      link.classList.add("active");

    }

  });
