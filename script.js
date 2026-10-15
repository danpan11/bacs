const config = window.BACS_CONFIG;
const create = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

for (const plan of config.plans) {
  const card = create("article", `plan${plan.featured ? " featured" : ""}`);
  card.append(create("p", "plan-kicker", plan.featured ? "EL PUNTO DE ENCUENTRO" : "MÚSICA A TU MEDIDA"));
  card.append(create("h3", "", plan.name), create("p", "plan-subtitle", plan.subtitle));
  const price = create("p", "price");
  price.append(create("span", "", String(plan.price)), document.createTextNode(" €"));
  card.append(price, create("p", "plan-description", plan.description));
  const list = create("ul", "includes");
  for (const inclusion of plan.includes) list.append(create("li", "", inclusion));
  card.append(list, create("p", "proposal", plan.proposal));
  const link = create("a", "button plan-button", `Me interesa ${plan.name} ↗`);
  link.href = "#contacto";
  link.addEventListener("click", () => { document.querySelector("#plan-choice").value = plan.name; });
  card.append(link);
  document.querySelector("#plans").append(card);
  const option = create("option", "", plan.name);
  option.value = plan.name;
  document.querySelector("#plan-choice").append(option);
}

for (const [index, member] of config.members.entries()) {
  const card = create("article", "member");
  const photo = create("div", "member-photo");
  const image = create("img");
  image.src = member.image;
  image.alt = `${member.name}, ${member.role.toLowerCase()} de BACS`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 560;
  image.style.objectPosition = member.position;
  photo.append(image, create("span", "member-index", `0${index + 1}`));
  card.append(photo, create("h3", "", member.name), create("p", "member-role", member.role), create("p", "member-description", member.description));
  document.querySelector("#members").append(card);
}

for (const song of config.exampleSetlist) {
  const item = create("li");
  const details = create("div");
  details.append(create("h3", "", song.title), create("p", "", song.artist));
  item.append(details, create("span", "song-genre", song.genre));
  document.querySelector("#songs").append(item);
}
document.querySelector(".setlist > .small").textContent = "Selección de ejemplo de nuestra playlist BACS - Propuestas. El setlist de cada show se acuerda con la banda.";

try {
  const spotifyUrl = new URL(config.spotify);
  if (spotifyUrl.protocol === "https:" && spotifyUrl.hostname === "open.spotify.com") {
    const spotify = document.querySelector("#spotify");
    spotify.href = spotifyUrl.href;
    spotify.target = "_blank";
    spotify.rel = "noopener noreferrer";
    spotify.removeAttribute("aria-disabled");
    spotify.textContent = "Escucha nuestra playlist ↗";
    document.querySelector("#spotify-note").textContent = "Se abre en Spotify. Dale al play y empieza a imaginar tu evento.";
  }
} catch {}

function contactValue(channel) {
  if (config[channel]) return config[channel];
  try {
    return atob(config.contactEncoded?.[channel] || "");
  } catch {
    return "";
  }
}
const whatsappValue = contactValue("whatsapp");
const emailValue = contactValue("email");
const whatsapp = /^\+?[1-9]\d{6,14}$/.test(whatsappValue) ? whatsappValue.replace(/^\+/, "") : "";
const email = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(emailValue) ? emailValue : "";
document.querySelector("#whatsapp").disabled = !whatsapp;
document.querySelector("#email").disabled = !email;
if (whatsapp || email) document.querySelector("#contact-note").textContent = "Consulta disponibilidad y condiciones. El envío se realiza desde tu aplicación, sin guardar datos en esta web.";

function bookingMessage() {
  const values = new FormData(document.querySelector("#booking"));
  const rawDate = values.get("date");
  const date = rawDate ? rawDate.split("-").reverse().join("/") : "Por decidir";
  return `¡Hola, BACS! Me gustaría consultar un show.\n\nEvento: ${values.get("event")}\nFecha: ${date}\nLugar: ${values.get("city") || "Por decidir"}\nFormato: ${values.get("plan")}\n\n${values.get("message") || "¡Me gustaría conocer vuestra disponibilidad y presupuesto!"}`;
}
document.querySelector("#booking").addEventListener("submit", (event) => {
  event.preventDefault();
  if (whatsapp) window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(bookingMessage())}`, "_blank", "noopener,noreferrer");
  else if (email) openEmail();
});
function openEmail() {
  const form = document.querySelector("#booking");
  if (email && form.reportValidity()) window.location.href = `mailto:${email}?subject=${encodeURIComponent("Consulta de evento · BACS")}&body=${encodeURIComponent(bookingMessage())}`;
}
document.querySelector("#email").addEventListener("click", openEmail);

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav");
menuButton.hidden = false;
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
});
navigation.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && navigation.classList.contains("is-open")) { closeMenu(); menuButton.focus(); } });
document.querySelector("#year").textContent = new Date().getFullYear();
