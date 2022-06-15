// declaring element
const username = document.getElementById("username");
const registerForm = document.getElementById("registerForm");
const logoutForm = document.getElementById("logoutForm");
const startSection = document.getElementById("start");
const rewardSection = document.getElementById("reward");
const homeSection = document.getElementById("home");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const rewardImage = document.getElementById("imgReward");

const player = new Player();

let default_option = ["😍", "🤣", "😱"];
[box1.textContent, box2.textContent, box3.textContent] = default_option;
// box1.textContent = default_option[0];
// box2.textContent = default_option[1];
// box3.textContent = default_option[2];

function dice() {
  let gacha = [];
  for (let i = 0; i < default_option.length; i++) {
    const roll = default_option[~~(Math.random() * default_option.length)];
    gacha.push(roll);
  }
  return gacha;
}

function reward() {
  fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
    .then((x) => x.json())
    .then((result) => {
      //set nama hadiah reward
      let text = document.createElement("h1");
      text.textContent = result.name;

      score();

      //set gambar hadiah
      let img = new Image(100, 100);
      img.src = result.image_link;

      //set element
      rewardImage.appendChild(img);
      rewardImage.appendChild(text);
    });
}

let total_score = 0;
function score() {
  for (i = 0; i < 1; i++) {
    if (box1.textContent == box2.textContent && box1.textContent == box3.textContent) total_score += 100;
    console.log(total_score);
    document.getElementById("hasilScore").innerHTML = `Your Score : ${total_score}`;
  }
}

function winner() {
  if (box1.textContent == box2.textContent && box1.textContent == box3.textContent) {
    reward();
    location.href = "#reward";
  } else {
    swal("Gagal Cuy!", "Jangan Nyerah!", "error");
  }
}

function start() {
  //selama
  const rolling = setInterval(function () {
    const result = dice();
    [box1.textContent, box2.textContent, box3.textContent] = result;
    // box1.textContent = result[0];
    // box2.textContent = result[1];
    // box3.textContent = result[2];
  }, 70);

  //ketika
  setTimeout(function () {
    clearInterval(rolling);
    winner();
  }, 1000);
}

let token = sessionStorage.getItem("token");
onload = function () {
  if (token && token != null) {
    registerForm.style.display = "none";
    rewardSection.style.display = "block";
    startSection.style.display = "block";
    homeSection.style.display = "none";
  } else {
    registerForm.style.display = "block";
    rewardSection.style.display = "none";
    startSection.style.display = "none";
    homeSection.style.display = "block";
  }
};

document.getElementById("nama").innerHTML = token;

function register() {
  player.username = username.value;
  player.register;
}

function logout() {
  player.logout;
}
