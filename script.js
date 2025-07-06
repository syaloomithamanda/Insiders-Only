function checkName() {
  const input = document.getElementById("nameInput").value.trim();
  if (input === "DELITHA") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("birthdayPage").style.display = "flex";

    const audio = document.getElementById("birthdayAudio");
    audio.play().catch((e) => {
      console.warn("Autoplay diblokir, user perlu klik dulu");
    });

    startConfetti();
  } else {
    alert("BUKAN KAMU ORANGNYA");
  }
}

// === Confetti ===
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetti = [];

  function createConfetti() {
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
      ctx.stroke();
    });

    updateConfetti();
    requestAnimationFrame(drawConfetti);
  }

  function updateConfetti() {
    confetti.forEach((c) => {
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  createConfetti();
  drawConfetti();
}
