const PLAYERS = [
  {
    ign: "NXvesGrey",
    name: "Nahid Hasan Joy",
    role: "ROLE TBA",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesMONARCH",
    name: "Asif Ahmed",
    role: "ROLE TBA",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesNooZY",
    name: "Shamiulla Shitul",
    role: "ROLE TBA",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "BOTxTEKZEEz",
    name: "Wasir",
    role: "ROLE TBA",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesRYUK",
    name: "Robiul Islam",
    role: "ROLE TBA",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  },
  {
    ign: "NXvesAkaTsukI",
    name: "Samin Muktadir",
    role: "ROLE TBA",
    matches: "—",
    tournamentKills: "—",
    scrimKills: "—",
    totalKills: "—"
  }
];

const MATCHES = [
  {
    date: "TBA",
    month: "2026",
    event: "UPCOMING COMPETITION",
    title: "NEXT NEXVORA BATTLE",
    opponent: "OPPONENT",
    result: "VS",
    status: "upcoming"
  },
  {
    date: "TBA",
    month: "2026",
    event: "TOURNAMENT",
    title: "TOURNAMENT MATCH",
    opponent: "OPPONENT",
    result: "VS",
    status: "upcoming"
  },
  {
    date: "TBA",
    month: "2026",
    event: "SCRIM",
    title: "SCRIM SESSION",
    opponent: "OPPONENT",
    result: "VS",
    status: "upcoming"
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

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

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


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
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
  const initials = player.ign
    .replace("NXves", "")
    .replace("BOTx", "")
    .substring(0, 2)
    .toUpperCase();

  return `
    <article class="player-card reveal">
      <span class="player-number">0${index + 1}</span>

      <div class="player-avatar">
        <div class="player-initial">${initials || "NX"}</div>
      </div>

      <div class="player-info">
        <div class="player-role">${player.role}</div>
        <h3>${player.ign}</h3>
        <div class="player-name">${player.name}</div>
      </div>

      <div class="player-arrow">↗</div>
    </article>
  `;
}


/* =========================
   HOME ROSTER
========================= */

const homeRoster = document.getElementById("homeRoster");

if (homeRoster) {
  homeRoster.innerHTML = PLAYERS
    .slice(0, 3)
    .map((player, index) => createPlayerCard(player, index))
    .join("");

  setTimeout(() => {
    homeRoster.querySelectorAll(".reveal").forEach(element => {
      revealObserver.observe(element);
    });
  }, 100);
}


/* =========================
   FULL ROSTER
========================= */

const rosterGrid = document.getElementById("rosterGrid");

if (rosterGrid) {
  rosterGrid.innerHTML = PLAYERS
    .map((player, index) => createPlayerCard(player, index))
    .join("");

  setTimeout(() => {
    rosterGrid.querySelectorAll(".reveal").forEach(element => {
      revealObserver.observe(element);
    });
  }, 100);
}


/* =========================
   PLAYER STATS TABLE
========================= */

const statsTable = document.getElementById("statsTable");

if (statsTable) {
  statsTable.innerHTML = PLAYERS.map(player => `
    <tr>
      <td>
        <span class="stats-player">${player.ign}</span>
      </td>

      <td>
        <span class="stats-role">${player.role}</span>
      </td>

      <td>${player.matches}</td>

      <td>${player.tournamentKills}</td>

      <td>${player.scrimKills}</td>

      <td><strong>${player.totalKills}</strong></td>
    </tr>
  `).join("");
}


/* =========================
   MATCH CENTER
========================= */

const matchesList = document.getElementById("matchesList");

function renderMatches(filter = "all") {
  if (!matchesList) return;

  const filtered =
    filter === "all"
      ? MATCHES
      : MATCHES.filter(match => match.status === filter);

  matchesList.innerHTML = filtered.map(match => `
    <article class="match-item reveal">

      <div class="match-date">
        <strong>${match.date}</strong>
        <span>${match.month}</span>
      </div>

      <div class="match-event">
        <span>${match.event}</span>
        <strong>${match.title}</strong>
      </div>

      <div class="match-side">
        <img src="assets/nexvora-logo.png" alt="NEXVORA">
        NEXVORA
      </div>

      <div class="match-result">
        <strong>${match.result}</strong>
        <span>${match.status.toUpperCase()}</span>
      </div>

      <div class="match-side">
        <div class="opponent-logo">?</div>
        ${match.opponent}
      </div>

    </article>
  `).join("");

  matchesList.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });
}

renderMatches();


/* =========================
   MATCH FILTER
========================= */

const filters = document.querySelectorAll(".filter");

filters.forEach(filter => {
  filter.addEventListener("click", () => {

    filters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");

    renderMatches(filter.dataset.filter);
  });
});


/* =========================
   SMOOTH INTERNAL LINKS
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {

    const target = document.querySelector(
      anchor.getAttribute("href")
    );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});


/* =========================
   PARALLAX HERO
========================= */

const heroLogo = document.querySelector(".hero-logo");

window.addEventListener("mousemove", event => {
  if (!heroLogo) return;

  const x = (window.innerWidth / 2 - event.clientX) / 80;
  const y = (window.innerHeight / 2 - event.clientY) / 80;

  heroLogo.style.transform =
    `translate(${x}px, ${y}px)`;
});


/* =========================
   CURRENT YEAR
========================= */

document.querySelectorAll(".footer-bottom span:first-child")
  .forEach(element => {
    element.innerHTML =
      `© ${new Date().getFullYear()} NEXVORA E-SPORTS`;
  });
