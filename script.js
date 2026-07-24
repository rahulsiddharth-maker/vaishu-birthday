let caught = 0;

const total = 5;

const music =
  document.getElementById("music");

const musicBtn =
  document.getElementById("musicBtn");


// CHANGE BETWEEN SCREENS

function show(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {

      screen.classList.remove("active");

    });

  document
    .getElementById(id)
    .classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// START THE SURPRISE

function startGame() {

  music
    .play()
    .then(() => {

      musicBtn.textContent =
        "♫ Music on";

    })
    .catch(() => {});

  show("game");

  createHeart();

}


// MUSIC BUTTON

function toggleMusic() {

  if (music.paused) {

    music.play();

    musicBtn.textContent =
      "♫ Music on";

  }

  else {

    music.pause();

    musicBtn.textContent =
      "♫ Play music";

  }

}


// CREATE HEARTS FOR THE GAME

function createHeart() {

  if (caught >= total) {

    return;

  }

  const area =
    document.getElementById("heartArea");

  const heart =
    document.createElement("button");

  heart.className =
    "floating-heart";

  heart.innerHTML =
    [
      "💗",
      "💖",
      "💕",
      "💞",
      "💓"
    ][
      Math.floor(
        Math.random() * 5
      )
    ];

  heart.style.left =
    (8 + Math.random() * 82)
    + "%";

  heart.style.top =
    (18 + Math.random() * 68)
    + "%";


  heart.onclick = () => {

    caught++;

    heart.remove();

    document
      .getElementById("score")
      .textContent =
      `Hearts caught: ${caught} / ${total}`;


    if (caught === total) {

      document
        .getElementById("gameMessage")
        .textContent =
        "You found every little heart! 🥹💕";

      setTimeout(() => {

        show("memories");

      }, 1200);

    }

    else {

      createHeart();

    }

  };


  area.appendChild(heart);


  setTimeout(() => {

    if (heart.isConnected) {

      heart.remove();

      createHeart();

    }

  }, 3500);

}


// SHOW PHOTO GALLERY

function showLetter() {

  show("letter");

}


// OPEN THE FINAL LETTER

function openLetter() {

  show("final");

  launchConfetti();

}


// CONFETTI ANIMATION

function launchConfetti() {

  const box =
    document.getElementById("confetti");


  for (
    let i = 0;
    i < 60;
    i++
  ) {

    const piece =
      document.createElement("span");

    piece.textContent =
      [
        "♡",
        "✦",
        "♥",
        "✧",
        "🦋"
      ][
        Math.floor(
          Math.random() * 5
        )
      ];

    piece.style.position =
      "fixed";

    piece.style.left =
      Math.random() * 100
      + "vw";

    piece.style.top =
      "-20px";

    piece.style.fontSize =
      (12 + Math.random() * 22)
      + "px";

    piece.style.animation =
      `fall ${2 + Math.random() * 3}s linear forwards`;

    piece.style.animationDelay =
      Math.random() * .8
      + "s";

    box.appendChild(piece);

  }


  const style =
    document.createElement("style");

  style.textContent = `

    @keyframes fall {

      to {

        transform:
          translateY(110vh)
          rotate(720deg);

        opacity: 0;

      }

    }

  `;

  document
    .head
    .appendChild(style);

}