/* ═══════════════════════════════════════════════════════
   ★☆ 생일축하 홈페이지 ☆★  script.js
   ── 여기만 고치면 됩니다 ─────────────────────────────── */

const CONFIG = {
  // 받는 사람 / 보내는 사람 이름
  toName: "보경",
  fromName: "상민",

  // 처음 만난 날 (YYYY-MM-DD)
  metDate: "2019-05-18",

  // 생일 (YYYY-MM-DD — 연도는 아무거나, 월/일만 씁니다)
  birthday: "2000-07-23",

  // 케이크 촛불 개수
  candleCount: 27,

  // 흐르는 글씨 (마퀴)
  marqueeText:
    "☆★☆ 어서오세요! 여기는 세상에서 제일 소중한 사람을 위한 홈페이지입니다 ☆★☆ " +
    "오늘은 아주 특별한 날! 생일 축하합니다!! ♥♥♥ " +
    "촛불도 끄고 편지도 꼭 읽어주세요 ☞☞☞ ",

  // 편지 내용 (한 글자씩 타이핑됩니다)
  letter: `생일 축하해.

작년에도 이 말을 했고
내년에도 할 거고
그 다음 해에도 할 건데
매번 처음처럼 떨려.

부끄럽지만 
이렇게 기념하고 싶어서
생일 축하 홈페이지를 만들어봤어.

좀 구려도 예쁘게 봐줘 ㅎㅎ

앞으로도 계속
네 생일마다 옆에 있을게.

사랑해.`,

  // 갤러리 (캡션은 마음대로 바꾸세요)
  photos: [
    { src: "assets/photos/photo1.jpg", caption: "핑크뮬리" },
    { src: "assets/photos/photo2.jpg", caption: "크리스마스 스튜디오" },
    { src: "assets/photos/photo3.jpg", caption: "귀여움" },
    { src: "assets/photos/photo4.jpg", caption: "야경 보러 간 날" },
  ],

  bgmOn: true,
};

/* assets/memes/ 폴더의 짤 목록.
   짤을 추가·삭제하려면 폴더에 파일을 넣고 이 목록만 고치면 됩니다. */
const MEMES = [
  // 앞의 14개는 상단 "흐르는 짤 띠"에도 들어갑니다
  "dancing-baby.gif",
  "spinning-heart-red.gif",
  "dancing-banana.gif",
  "cool-sun-sunglasses.gif",
  "hamster-running-in-wheel.gif",
  "cupid-chubby-pink.gif",
  "spinning-rose-red.gif",
  "pink-heart-with-wings.gif",
  "spinning-gold-star.gif",
  "angel-girl-halo-wings.gif",
  "birthday-cake-magenta.gif",
  "teddy-bear-red-bow.gif",
  "hamster-orange-kawaii.gif",
  "heart-pulsing-pink-purple.gif",
  // 여기부터는 짤 벽에만
  "dancing-baby-hula-skirt.gif",
  "happy-birthday-wordart-cake-gifts.gif",
  "smileys-party-hats.gif",
  "party-time-graffiti.gif",
  "congratulations-script-champagne.gif",
  "birthday-cake-rainbow-candles.gif",
  "birthday-cake-pink-tiered.gif",
  "happy-birthday-color-cycling-text.gif",
  "happy-birthday-gift-sunburst.gif",
  "balloons-bunch-colorful.gif",
  "cupid-baby-holding-heart.gif",
  "spinning-rose-pink.gif",
];

/* ═══════════════════════════════════════════════════════
   아래부터는 안 건드려도 됩니다
   ═══════════════════════════════════════════════════════ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────── 이름 채우기 ───────── */
function fillNames() {
  $("#toName").textContent = CONFIG.toName;
  $("#toNameFooter").textContent = CONFIG.toName;
  $("#fromName").textContent = CONFIG.fromName;
  $$(".to-name").forEach((el) => (el.textContent = CONFIG.toName));
  $("#marquee").textContent = CONFIG.marqueeText;
  document.title = `★☆ ${CONFIG.toName} 생일 축하해 ☆★`;
}

/* ───────── 이미지 없으면 이모지로 대체 ───────── */
function setupAssetFallbacks() {
  $$("img.asset").forEach((img) => {
    img.addEventListener("error", () => {
      const span = document.createElement("span");
      span.className = "asset-fallback blink";
      span.textContent = img.dataset.fallback || "✨";
      img.replaceWith(span);
    });
  });
}

/* ───────── 가짜 방문자 카운터 ───────── */
function visitorCounter() {
  const total = 10041004; // 천사 숫자 1004 두 번 ㅎㅎ
  const el = $("#visitorCounter");
  let shown = Math.max(0, total - 40);
  const tick = setInterval(() => {
    shown += Math.ceil((total - shown) / 6) || 1;
    if (shown >= total) {
      shown = total;
      clearInterval(tick);
    }
    el.textContent = String(shown).padStart(8, "0");
  }, 60);
}

/* ───────── 하트 폭죽 + 커서 트레일 ───────── */
const HEART_CHARS = ["💖", "💕", "💗", "💓", "♥", "💘", "✨", "🌸"];
const fxLayer = $("#fxLayer");

function burstHearts(x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "fx-heart";
    el.textContent = HEART_CHARS[(Math.random() * HEART_CHARS.length) | 0];
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = 16 + Math.random() * 18 + "px";
    fxLayer.appendChild(el);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 60 + Math.random() * 110;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;

    el.animate(
      [
        { transform: "translate(-50%,-50%) scale(.4) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.2) rotate(${(Math.random() * 720 - 360) | 0}deg)`, opacity: 1, offset: 0.6 },
        { transform: `translate(calc(-50% + ${dx * 1.2}px), calc(-50% + ${dy + 140}px)) scale(.5)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.4,1)", fill: "forwards" }
    ).onfinish = () => el.remove();
  }
}

function confettiRain(count = 60) {
  const colors = ["#ff2d95", "#ffd700", "#00e5ff", "#7cff4d", "#b98cff", "#ff7a00"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "fx-confetti";
    el.style.background = colors[(Math.random() * colors.length) | 0];
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-20px";
    el.style.borderRadius = Math.random() < 0.4 ? "50%" : "1px";
    fxLayer.appendChild(el);

    el.animate(
      [
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight + 60}px) rotate(${(Math.random() * 1080) | 0}deg) translateX(${(Math.random() * 160 - 80) | 0}px)`, opacity: 0.9 },
      ],
      { duration: 2200 + Math.random() * 2200, delay: Math.random() * 900, easing: "linear", fill: "forwards" }
    ).onfinish = () => el.remove();
  }
}

let lastTrail = 0;
function setupTrail() {
  if (reduceMotion) return;
  const drop = (x, y) => {
    const now = performance.now();
    if (now - lastTrail < 55) return;
    lastTrail = now;
    const el = document.createElement("span");
    el.className = "fx-trail";
    el.textContent = HEART_CHARS[(Math.random() * HEART_CHARS.length) | 0];
    el.style.left = x + "px";
    el.style.top = y + "px";
    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 900);
  };
  window.addEventListener("pointermove", (e) => drop(e.clientX, e.clientY), { passive: true });
}

function setupHeartBurst() {
  window.addEventListener(
    "pointerdown",
    (e) => {
      if ($("#gate") && !$("#gate").hidden && !$("#gate").classList.contains("closing")) return;
      burstHearts(e.clientX, e.clientY, 10);
    },
    { passive: true }
  );
}

/* ───────── D-DAY 계산 ───────── */
const DAY_MS = 86400000;
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const fmt = (d) => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

function updateDday() {
  const met = new Date(CONFIG.metDate + "T00:00:00");
  const now = new Date();
  const today = startOfDay(now);

  // 함께한 날 (만난 날을 1일째로)
  const days = Math.floor((today - startOfDay(met)) / DAY_MS) + 1;
  $("#metDateCell").textContent = fmt(met);
  $("#daysTogether").textContent = days.toLocaleString("ko-KR");

  // 다음 100일 단위 기념일
  const nextMilestone = (Math.floor((days - 1) / 100) + 1) * 100;
  const milestoneDate = new Date(startOfDay(met).getTime() + (nextMilestone - 1) * DAY_MS);
  const untilMilestone = Math.round((startOfDay(milestoneDate) - today) / DAY_MS);
  $("#next100").innerHTML =
    `<b class="big-num">${nextMilestone.toLocaleString("ko-KR")}</b>일<br>` +
    `${escapeHtml(fmt(milestoneDate))} ` +
    (untilMilestone === 0 ? "(오늘!)" : `(D-${untilMilestone})`);

  // 생일 카운트다운
  const b = new Date(CONFIG.birthday + "T00:00:00");
  let next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
  if (startOfDay(next) < today) next = new Date(now.getFullYear() + 1, b.getMonth(), b.getDate());
  const untilBday = Math.round((startOfDay(next) - today) / DAY_MS);
  const cell = $("#bdayCountdown");
  if (untilBday === 0) {
    cell.innerHTML = `<b class="big-num blink">D-DAY</b> 오늘이에요!! 🎉`;
    return true;
  }
  cell.innerHTML = `<b class="big-num">D-${untilBday}</b><br>${escapeHtml(fmt(next))}`;
  return false;
}

function tickSeconds() {
  const met = new Date(CONFIG.metDate + "T00:00:00");
  const el = $("#secondsTogether");
  const run = () => {
    const diff = Date.now() - met.getTime();
    if (diff < 0) {
      el.textContent = "> 아직 만나기 전이에요...";
      return;
    }
    const s = Math.floor(diff / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    el.textContent = `> 우리가 함께한 시간: ${h.toLocaleString("ko-KR")}시간 ${m}분 ${s % 60}초 ▊`;
  };
  run();
  setInterval(run, 1000);
}

/* ───────── 케이크 촛불 ───────── */
let candles = [];
function buildCake() {
  const wrap = $("#candles");
  const cake = $("#cake");
  wrap.innerHTML = "";
  candles = [];

  // 한국식으로 긴 초 1개 = 10살, 짧은 초 1개 = 1살
  const n = CONFIG.candleCount;
  const longs = Math.floor(n / 10);
  const shorts = n % 10;
  const total = longs + shorts;

  // 초는 맨 윗층 폭 안에 들어가야 하므로 개수에 맞춰 굵기를 줄입니다
  cake.style.setProperty("--cw", total > 12 ? "5px" : total > 9 ? "6px" : "7px");
  for (let i = 0; i < total; i++) {
    const isLong = i < longs;
    const c = document.createElement("button");
    c.className = isLong ? "candle long" : "candle";
    c.type = "button";
    c.setAttribute("aria-label", isLong ? "긴 초(10살) 끄기" : "짧은 초(1살) 끄기");
    c.innerHTML = '<span class="flame"></span>';
    c.addEventListener("click", (e) => {
      e.stopPropagation();
      blowOut(c);
    });
    wrap.appendChild(c);
    candles.push(c);
  }

  setLights();

  const parts = [];
  if (longs) parts.push(`긴 초 ${longs}개(${longs * 10}살)`);
  if (shorts) parts.push(`짧은 초 ${shorts}개(${shorts}살)`);
  $("#candleLegend").textContent = parts.join(" + ") + ` = ${n}살 🎂`;
}

/* 촛불이 하나라도 살아있으면 방 불을 끕니다 */
function setLights() {
  const anyLit = candles.some((c) => !c.classList.contains("out"));
  $("#cakeSection").classList.toggle("lights-off", anyLit);
}

function blowOut(candle) {
  if (candle.classList.contains("out")) return;
  candle.classList.add("out");
  const r = candle.getBoundingClientRect();
  burstHearts(r.left + r.width / 2, r.top, 5);
  setLights();
  checkAllOut();
}

function blowAll() {
  candles.forEach((c, i) => setTimeout(() => blowOut(c), i * 130));
}

let celebrated = false;
function checkAllOut() {
  if (celebrated) return;
  if (!candles.every((c) => c.classList.contains("out"))) return;
  celebrated = true;
  setTimeout(() => {
    $("#wishMsg").hidden = false;
    $("#cakeHint").textContent = "🎉 축하합니다! 🎉";
    $("#relightBtn").hidden = false;
    confettiRain(70);
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 26);
    playFanfare();
  }, 400);
}

function relight() {
  celebrated = false;
  candles.forEach((c) => c.classList.remove("out"));
  setLights();
  $("#wishMsg").hidden = true;
  $("#relightBtn").hidden = true;
  $("#cakeHint").textContent = "촛불을 손가락으로 톡톡 두드려서 꺼보세요!";
  const btn = $("#micBtn");
  btn.disabled = false;
  btn.textContent = "🎤 후~ 불어서 끄기";
}

/* ───────── 마이크로 후~ 불기 ───────── */
let micStream = null;
let micSource = null;
let bgmWasOn = false;
async function startMic() {
  const btn = $("#micBtn");
  if (micStream) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    $("#cakeHint").textContent = "이 브라우저는 마이크를 지원하지 않아요. 촛불을 눌러서 꺼주세요!";
    return;
  }
  btn.disabled = true;
  btn.textContent = "🎤 마이크 여는 중...";
  try {
    // noiseSuppression 은 "숨소리·바람소리"를 지우도록 만들어진 기능이라
    // 켜져 있으면 후~ 부는 소리가 통째로 걸러집니다. 반드시 꺼야 합니다.
    // autoGainControl 도 끄지 않으면 볼륨이 자동 보정돼서 세기 판단이 흔들립니다.
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: false,
        echoCancellation: false,
        autoGainControl: false,
      },
    });
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "🎤 후~ 불어서 끄기";
    $("#cakeHint").textContent =
      err && err.name === "NotAllowedError"
        ? "마이크 권한이 거부됐어요 😢 촛불을 손가락으로 눌러주세요!"
        : "마이크를 못 켰어요 😢 촛불을 손가락으로 눌러주세요!";
    return;
  }

  // BGM 을 스피커로 내보내면서 동시에 마이크로 들으면
  // (1) 기기가 통화용 오디오 경로로 바뀌면서 소리가 갑자기 커지고
  // (2) BGM 이 그대로 마이크에 잡혀서 후~ 부는 소리와 구분이 안 됩니다.
  // 그래서 듣는 동안에는 BGM 을 끄고, 끝나면 원래대로 되돌립니다.
  bgmWasOn = bgmPlaying;
  if (bgmPlaying) stopBgm();

  // AudioContext 를 새로 만들지 않고 BGM 이 쓰던 것을 재사용합니다 (두 개가 겹치면 출력이 커짐)
  const ctx = (audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)());
  await ctx.resume(); // iOS 사파리는 resume 안 하면 조용히 멈춰 있습니다
  const src = (micSource = ctx.createMediaStreamSource(micStream));
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.1;
  src.connect(analyser);

  const time = new Uint8Array(analyser.fftSize);
  const freq = new Uint8Array(analyser.frequencyBinCount);
  // 후 부는 소리는 대부분 저주파(~20-500Hz) 쪽에 몰립니다
  const lowBins = Math.max(4, Math.round(500 / (ctx.sampleRate / analyser.fftSize)));

  const meter = $("#micMeter");
  meter.hidden = false;
  const bar = $("#micBar");
  const mark = $("#micMark");

  // 1) 먼저 1초간 주변 소음을 재서 기준선을 잡습니다
  btn.textContent = "🎤 조용히... 소음 측정 중";
  $("#cakeHint").textContent = "잠깐만요, 주변 소리를 재고 있어요...";

  let phase = "calibrate";
  let ambient = 0;
  let threshold = 1;
  let loud = 0;
  let hintShown = false;
  const samples = [];
  const startedAt = performance.now();

  // 빨간 선을 막대의 이 위치에 고정합니다 (막대 = 임계값 대비 비율)
  const MARK_AT = 60;
  mark.style.left = MARK_AT + "%";

  const read = () => {
    analyser.getByteTimeDomainData(time);
    let sum = 0;
    for (let i = 0; i < time.length; i++) {
      const v = (time[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / time.length);

    analyser.getByteFrequencyData(freq);
    let low = 0;
    for (let i = 0; i < lowBins; i++) low += freq[i];
    low = low / lowBins / 255;

    // 저주파 성분에 가중치를 줘서 "부는 소리"를 말소리보다 잘 잡게 합니다
    return rms * 0.5 + low * 0.5;
  };

  const loop = () => {
    if (!micStream) return;
    const level = read();

    if (phase === "calibrate") {
      samples.push(level);
      if (performance.now() - startedAt > 1000) {
        // 최댓값만 쓰면 순간적인 잡음 한 번에 기준이 확 올라갑니다.
        // 평균을 기준으로 하고 최댓값은 조금만 반영합니다.
        const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
        const peak = Math.max(...samples);
        ambient = mean + (peak - mean) * 0.3;
        threshold = Math.min(0.32, Math.max(0.03, ambient * 1.5 + 0.02));
        phase = "listen";
        btn.textContent = "🎤 후~ 하고 불어보세요!";
        $("#cakeHint").textContent = "자, 마이크에 대고 크게 후~ 불어주세요!";
      }
    } else {
      // 막대는 "임계값 대비 비율"입니다. 빨간 선(60%)이 곧 임계값이므로
      // 눈에 보이는 것과 실제 판정이 절대 어긋나지 않습니다.
      // (예전엔 둘을 각각 다른 배율로 그려서, 막대가 선을 넘어 보여도
      //  실제로는 임계값 아래인 경우가 있었습니다)
      const ratio = level / threshold;
      bar.style.width = Math.min(100, ratio * MARK_AT) + "%";
      bar.classList.toggle("over", ratio > 1);
      loud = ratio > 1 ? loud + 1 : 0;
      if (loud >= 3) {
        blowAll();
        stopMic();
        btn.textContent = "🎤 잘 불었어요!";
        btn.disabled = true;
        return;
      }
      // 한참 안 되면 손가락으로 끄라고 안내
      if (!hintShown && performance.now() - startedAt > 9000) {
        hintShown = true;
        $("#cakeHint").textContent = "잘 안 되면 촛불을 손가락으로 눌러도 꺼져요!";
      }
    }
    requestAnimationFrame(loop);
  };
  loop();
}

function stopMic() {
  if (!micStream) return;
  micStream.getTracks().forEach((t) => t.stop());
  micStream = null;
  // 노드를 끊어주지 않으면 마이크 입력이 그래프에 남아 있습니다
  if (micSource) {
    micSource.disconnect();
    micSource = null;
  }
  const meter = $("#micMeter");
  if (meter) meter.hidden = true;
  // 마이크 때문에 껐던 BGM 을 되돌립니다
  if (bgmWasOn) {
    bgmWasOn = false;
    startBgm();
  }
}

/* ───────── 편지 타자기 ───────── */
let typing = false;
function openLetter() {
  const env = $("#envelope");
  if (env.classList.contains("opened")) return;
  env.classList.add("opened");
  env.setAttribute("aria-expanded", "true");
  const r = env.getBoundingClientRect();
  burstHearts(r.left + r.width / 2, r.top + r.height / 2, 16);

  setTimeout(() => {
    $("#letterBody").hidden = false;
    $("#letterBody").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    typeLetter();
  }, 600);
}

function typeLetter() {
  if (typing) return;
  typing = true;
  const target = $("#letterText");
  const text = CONFIG.letter;
  if (reduceMotion) {
    target.textContent = text;
    typing = false;
    followTyping(target);
    return;
  }
  let i = 0;
  const caret = '<span class="caret">▊</span>';
  const step = () => {
    i++;
    const chunk = text.slice(0, i);
    target.innerHTML = escapeHtml(chunk) + caret;
    followTyping(target);
    if (i < text.length) {
      const ch = text[i - 1];
      const delay = ch === "\n" ? 220 : ch === "." || ch === "," ? 180 : 55;
      setTimeout(step, delay);
    } else {
      target.innerHTML = escapeHtml(text) + caret;
      typing = false;
    }
  };
  step();
}

/* 글자가 찍히면서 화면 아래로 넘어가면 그만큼 따라 내려갑니다.
   항상 스크롤하지 않고 "화면 밖으로 나갈 때만" 움직여서 덜 산만합니다. */
function followTyping(el) {
  const bottom = el.getBoundingClientRect().bottom;
  const limit = window.innerHeight - 90; // 아래에 여유를 두고 멈춤
  const over = bottom - limit;
  if (over > 0) window.scrollBy(0, over);
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ───────── 코드로 보는 내 마음 ───────── */
function renderCodeBlock() {
  const lines = [
    ['cm', '// my_heart.js — 배포 금지'],
    ['', ''],
    ['kw', 'const ', 'plain', '너 = ', 'str', `"${CONFIG.toName}"`, 'plain', ';'],
    ['kw', 'let ', 'plain', '내마음 = ', 'num', 'Infinity', 'plain', ';'],
    ['', ''],
    ['kw', 'if ', 'plain', '(오늘 === ', 'str', '"너의 생일"', 'plain', ') {'],
    ['plain', '  ', 'fn', 'console.log', 'plain', '(', 'str', '"생일 축하해 ♥"', 'plain', ');'],
    ['plain', '  내마음 += ', 'num', 'Infinity', 'plain', ';  ', 'cm', '// 오버플로우 남'],
    ['plain', '}'],
    ['', ''],
    ['kw', 'while ', 'plain', '(내가살아있음) {'],
    ['plain', '  ', 'fn', '좋아하기', 'plain', '(너);'],
    ['plain', '  ', 'kw', 'if ', 'plain', '(너.', 'fn', '웃음', 'plain', '()) 나.행복++;'],
    ['plain', '}'],
    ['', ''],
    ['fn', 'export default ', 'plain', '내마음;  ', 'cm', '// 받아줘'],
  ];
  const cls = { kw: 'kw', str: 'str', fn: 'fn', cm: 'cm', num: 'str', plain: '' };
  const html = lines
    .map((parts) => {
      if (!parts[0]) return '';
      let out = '';
      for (let i = 0; i < parts.length; i += 2) {
        const c = cls[parts[i]] ?? '';
        const t = escapeHtml(parts[i + 1] ?? '');
        out += c ? `<span class="${c}">${t}</span>` : t;
      }
      return out;
    })
    .join('\n');
  $('#codeBlock').innerHTML = html;
}

function runCode() {
  const out = $("#codeOutput");
  out.hidden = false;
  const lines = [
    "> node my_heart.js",
    "",
    "생일 축하해 ♥",
    `RangeError: 내마음이 Infinity를 초과했습니다`,
    `  at 좋아하기 (${CONFIG.fromName}.js:1:1)`,
    "",
    "> 프로세스가 종료되지 않습니다. (평생)",
  ];
  out.textContent = "";
  let i = 0;
  const push = () => {
    out.textContent += (i ? "\n" : "") + lines[i];
    i++;
    followTyping(out);
    if (i < lines.length) setTimeout(push, 320);
    else {
      confettiRain(30);
      burstHearts(window.innerWidth / 2, window.innerHeight * 0.6, 14);
    }
  };
  push();
}

function consoleLove() {
  const style = "color:#ff2d95;font-size:16px;font-weight:bold;text-shadow:1px 1px 0 #ffd6f5";
  console.log(`%c♥ ${CONFIG.toName}, 생일 축하해 ♥`, style);
  console.log(
    "%c" +
      [
        "  ♥♥♥     ♥♥♥  ",
        "♥♥♥♥♥♥ ♥♥♥♥♥♥",
        "♥♥♥♥♥♥♥♥♥♥♥♥♥",
        "  ♥♥♥♥♥♥♥♥♥♥♥  ",
        "     ♥♥♥♥♥♥♥     ",
        "        ♥♥♥        ",
        "          ♥          ",
      ].join("\n"),
    "color:#ff2d95;font-size:12px;line-height:1.1"
  );
  console.log("%c여기까지 열어본 거 다 알아 ㅎㅎ 개발자 다 됐네", "color:#00b3b3;font-size:13px");
}

/* ───────── 짤 대잔치 ───────── */
function buildMemeWall() {
  const wall = $("#memeWall");
  const belt = $("#gifBelt");
  const memes = MEMES;

  if (!memes.length) {
    $("#memePanel").hidden = true;
    belt.hidden = true;
    return;
  }

  // 짤 벽
  wall.innerHTML = memes
    .map((m) => `<img src="assets/memes/${m}" alt="" loading="lazy" class="meme-img">`)
    .join("");

  // 깨진 짤은 조용히 제거
  $$(".meme-img").forEach((img) => {
    img.addEventListener("error", () => img.remove());
    img.addEventListener("click", () => {
      img.classList.remove("poked");
      void img.offsetWidth; // 애니메이션 재시작
      img.classList.add("poked");
      const r = img.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + r.height / 2, 8);
    });
  });

  // 흐르는 짤 띠 (같은 목록을 두 번 넣어야 끊김 없이 반복됨)
  const belted = memes.slice(0, 14);
  const row = belted.map((m) => `<img src="assets/memes/${m}" alt="" loading="lazy">`).join("");
  belt.innerHTML = `<div class="gif-belt-track">${row}${row}</div>`;
}

/* ───────── 갤러리 ───────── */
function buildGallery() {
  const wrap = $("#gallery");
  const photos = CONFIG.photos;
  // 사진이 없으면 빈 액자만 놓아둡니다
  if (!photos.length) {
    wrap.innerHTML = `<figure><div class="gal-empty">📷</div>
      <figcaption>사진 넣는 자리</figcaption></figure>`.repeat(4);
    return;
  }

  wrap.innerHTML = photos
    .map(
      (p) =>
        `<figure><img src="${p.src}" alt="${escapeHtml(p.caption || "")}" loading="lazy"
           data-fallback="${p.fallback || "📷"}" class="gal-img">
         <figcaption>${escapeHtml(p.caption || "")}</figcaption></figure>`
    )
    .join("");

  $$(".gal-img").forEach((img) => {
    // 이미지가 없으면 이모지로 대체
    img.addEventListener("error", () => {
      const div = document.createElement("div");
      div.className = "gal-fallback";
      div.textContent = img.dataset.fallback;
      img.replaceWith(div);
    });
    // 누르면 크게 보기
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
}

/* ───────── 8비트 BGM (Happy Birthday) ───────── */
let audioCtx = null;
let bgmTimer = null;
let bgmPlaying = false;
let bgmNodes = [];   // 예약해 둔 BGM 오실레이터 (즉시 정지용)
let fanfareTimer = null;

const NOTE_BASE = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
function freqOf(note) {
  const m = /^([a-g])(#?)(\d)$/.exec(note);
  if (!m) return 440;
  const semis = NOTE_BASE[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) - 4) * 12 - 9;
  return 440 * Math.pow(2, semis / 12);
}

// [음, 박자]
const MELODY = [
  ["g4", 0.5], ["g4", 0.5], ["a4", 1], ["g4", 1], ["c5", 1], ["b4", 2],
  ["g4", 0.5], ["g4", 0.5], ["a4", 1], ["g4", 1], ["d5", 1], ["c5", 2],
  ["g4", 0.5], ["g4", 0.5], ["g5", 1], ["e5", 1], ["c5", 1], ["b4", 1], ["a4", 2],
  ["f5", 0.5], ["f5", 0.5], ["e5", 1], ["c5", 1], ["d5", 1], ["c5", 2.5],
];

/* collect 를 주면 bgmNodes 에 담아 두었다가 stopBgm 에서 즉시 끌 수 있습니다.
   이걸 안 하면 예약만 취소되고 이미 예약된 소리는 끝까지 울립니다. */
function beep(freq, start, dur, type = "square", gain = 0.06, collect = false) {
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.9);
  osc.connect(g).connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + dur);

  if (collect) {
    bgmNodes.push(osc);
    osc.onended = () => {
      const i = bgmNodes.indexOf(osc);
      if (i >= 0) bgmNodes.splice(i, 1);
    };
  }
}

function scheduleMelody() {
  const beat = 0.42;
  let t = audioCtx.currentTime + 0.15;
  MELODY.forEach(([n, len]) => {
    beep(freqOf(n), t, len * beat * 0.92, "square", 0.06, true);
    t += len * beat;
  });
  return (t - audioCtx.currentTime) * 1000 + 700;
}

function startBgm() {
  if (bgmPlaying) return;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.resume();
  bgmPlaying = true;
  const loop = () => {
    if (!bgmPlaying) return;
    const ms = scheduleMelody();
    bgmTimer = setTimeout(loop, ms);
  };
  loop();
  $("#bgmBtn").textContent = "🔊";
}

function stopBgm() {
  bgmPlaying = false;
  clearTimeout(bgmTimer);
  // 타이머만 지우면 이미 예약된 음(최대 13초치)이 계속 울립니다.
  // 예약해 둔 오실레이터를 직접 멈춰야 실제로 소리가 끊깁니다.
  bgmNodes.forEach((osc) => {
    try { osc.stop(); } catch (e) { /* 이미 끝난 노드 */ }
  });
  bgmNodes = [];
  $("#bgmBtn").textContent = "🔇";
}

function playFanfare() {
  if (!audioCtx) return;
  // BGM 위에 그대로 얹으면 소리가 뭉치므로 잠깐 멈췄다가 끝나고 되돌립니다
  const wasOn = bgmPlaying;
  if (wasOn) stopBgm();

  const t = audioCtx.currentTime;
  ["c5", "e5", "g5", "c6"].forEach((n, i) => beep(freqOf(n), t + i * 0.09, 0.3, "triangle", 0.1));

  clearTimeout(fanfareTimer);
  if (wasOn) fanfareTimer = setTimeout(startBgm, 1400);
}

/* ───────── 사진 크게 보기 ───────── */
function openLightbox(src, caption) {
  $("#lightboxImg").src = src;
  $("#lightboxCap").textContent = caption || "";
  $("#lightbox").hidden = false;
}
function closeLightbox() {
  $("#lightbox").hidden = true;
  $("#lightboxImg").src = "";
}

/* ───────── 입장 ───────── */
function enterSite() {
  const gate = $("#gate");
  gate.classList.add("closing");
  setTimeout(() => {
    gate.hidden = true;
    gate.remove();
  }, 500);

  $("#site").hidden = false;
  if (CONFIG.bgmOn) startBgm();
  confettiRain(50);
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 20);

  // 오늘이 생일이면 자동 축포
  if (isBirthdayToday) setTimeout(() => confettiRain(80), 1200);
}

/* ───────── 시작 ───────── */
let isBirthdayToday = false;

function init() {
  fillNames();
  setupAssetFallbacks();
  visitorCounter();
  isBirthdayToday = updateDday();
  tickSeconds();
  buildCake();
  buildMemeWall();
  renderCodeBlock();
  buildGallery();
  setupTrail();
  setupHeartBurst();
  consoleLove();

  $("#enterBtn").addEventListener("click", enterSite);
  $("#envelope").addEventListener("click", openLetter);
  $("#micBtn").addEventListener("click", startMic);
  $("#relightBtn").addEventListener("click", relight);
  $("#runCodeBtn").addEventListener("click", runCode);
  $("#lightbox").addEventListener("click", closeLightbox);
  $("#bgmBtn").addEventListener("click", () => (bgmPlaying ? stopBgm() : startBgm()));

  // 자정 넘어가면 D-DAY 갱신
  setInterval(updateDday, 60000);

  // 주소 뒤에 #skip 을 붙이면 입장 화면을 건너뜁니다 (미리보기용)
  if (location.hash === "#skip") enterSite();
}

document.addEventListener("DOMContentLoaded", init);
