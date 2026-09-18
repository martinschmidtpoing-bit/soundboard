const data = {
  ru: {
    name: "Russisch", locale: "ru-RU",
    words: [
      ["Дурак", "Durak", "Idiot / Dummkopf"],
      ["Идиот", "Idiot", "Idiot"],
      ["Придурок", "Pridurok", "Trottel"],
      ["Козёл", "Kozjol", "Mistkerl"],
      ["Сволочь", "Svoloč", "Dreckskerl"],
      ["Мудак", "Mudak", "Arschloch"],
      ["Заткнись", "Zatknis", "Halt die Klappe"],
      ["Чёрт", "Čjort", "Verdammt / Teufel"],
      ["Блин", "Blin", "Mist / Verdammt"],
      ["Сука", "Suka", "Miststück / Schlampe"]
    ]
  },
  ar: {
    name: "Arabisch", locale: "ar-SA",
    words: [
      ["غبي", "ghabī", "dumm / Idiot"],
      ["أحمق", "aḥmaq", "Dummkopf"],
      ["تافه", "tāfih", "armselig / lächerlich"],
      ["حقير", "ḥaqīr", "Widerling / verachtenswert"],
      ["وقح", "waqiḥ", "unverschämt"],
      ["كلب", "kalb", "Hund (als Beleidigung)"],
      ["حمار", "ḥimār", "Esel / Idiot"],
      ["اخرس", "ikhras", "Halt den Mund"],
      ["تباً", "tabban", "Verdammt"],
      ["لعنة", "laʿna", "Fluch / Verdammt"]
    ]
  },
  tr: {
    name: "Türkisch", locale: "tr-TR",
    words: [
      ["Aptal", "aptal", "Idiot / dumm"],
      ["Salak", "salak", "Trottel"],
      ["Gerizekâlı", "gerizekâlı", "Vollidiot"],
      ["Şerefsiz", "şerefsiz", "Ehrloser / Mistkerl"],
      ["Pislik", "pislik", "Dreckskerl"],
      ["Terbiyesiz", "terbiyesiz", "Unverschämter"],
      ["Defol", "defol", "Hau ab"],
      ["Lanet olsun", "lanet olsun", "Verdammt"],
      ["Sus", "sus", "Sei still"],
      ["Dangalak", "dangalak", "Depp / Trottel"]
    ]
  },
  sh: {
    name: "Serbokroatisch", locale: "hr-HR",
    words: [
      ["Budala", "budala", "Idiot / Narr"],
      ["Glupan", "glupan", "Dummkopf"],
      ["Kreten", "kreten", "Idiot"],
      ["Đubre", "đubre", "Dreckskerl"],
      ["Stoko", "stoko", "Vieh / grobe Beleidigung"],
      ["Marš", "marš", "Hau ab"],
      ["Gubi se", "gubi se", "Verschwinde"],
      ["Začepi", "začepi", "Halt die Klappe"],
      ["Prokletstvo", "prokletstvo", "Verdammt / Fluch"],
      ["Jebote", "jebote", "Verdammt / vulgärer Ausruf"]
    ]
  }
};

const grid = document.querySelector("#soundGrid");
const title = document.querySelector("#languageTitle");
const tabs = [...document.querySelectorAll(".tab")];
const stopBtn = document.querySelector("#stopBtn");
let current = "ru";

function voicesFor(locale) {
  const voices = speechSynthesis.getVoices();
  const exact = voices.find(v => v.lang.toLowerCase() === locale.toLowerCase());
  const prefix = locale.slice(0,2).toLowerCase();
  return exact || voices.find(v => v.lang.toLowerCase().startsWith(prefix)) || null;
}

function speak(text, locale) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = locale;
  u.rate = 0.88;
  const voice = voicesFor(locale);
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

function render(lang) {
  current = lang;
  const set = data[lang];
  title.textContent = set.name;
  document.documentElement.lang = lang === "sh" ? "hr" : lang;
  grid.innerHTML = "";
  set.words.forEach(([word, latin, meaning], i) => {
    const b = document.createElement("button");
    b.className = "sound";
    b.type = "button";
    b.innerHTML = `<span class="num">${String(i+1).padStart(2,"0")} · PLAY</span>
      <span class="word">${word}</span>
      <span class="meaning">${latin} · ${meaning}</span>`;
    b.addEventListener("click", () => speak(word, set.locale));
    grid.appendChild(b);
  });
  tabs.forEach(t => {
    const active = t.dataset.lang === lang;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
}

tabs.forEach(t => t.addEventListener("click", () => {
  speechSynthesis.cancel();
  render(t.dataset.lang);
}));
stopBtn.addEventListener("click", () => speechSynthesis.cancel());
speechSynthesis.onvoiceschanged = () => {};
render(current);
