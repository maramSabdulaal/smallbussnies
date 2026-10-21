const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
});

const hours = [
    { day: "Sunday", open: 10, close: 18 },
    { day: "Monday", open: 9, close: 20 },
    { day: "Tuesday", open: 9, close: 20 },
    { day: "Wednesday", open: 9, close: 20 },
    { day: "Thursday", open: 9, close: 22 },
    { day: "Friday", open: null, close: null },
    { day: "Saturday", open: 10, close: 22 }
];

function formatHour(h) {
    const suffix = h >= 12 ? "PM" : "AM";
    return ((h + 11) % 12 + 1) + ":00 " + suffix;
}

const today = new Date().getDay();
const body = document.getElementById("hours-body");

hours.forEach((h, i) => {
    const row = document.createElement("tr");

    if (i === today) {
        row.className = "today";
    }

    row.innerHTML = `<td>${h.day}</td><td>${h.open === null ? "Closed" : formatHour(h.open) + " – " + formatHour(h.close)}</td>`;
    body.appendChild(row);
});

const status = document.getElementById("open-status");
const now = new Date().getHours();
const t = hours[today];

if (t.open !== null && now >= t.open && now < t.close) {
    status.textContent = "We're open now until " + formatHour(t.close);
    status.className = "status open";
} else {
    status.textContent = "We're closed right now. See our hours below.";
    status.className = "status closed";
}

const menu = {
    "Coffee": [
        { name: "Espresso", desc: "Rich and bold", price: "1.200" },
        { name: "Flat white", desc: "Smooth, velvety milk", price: "1.800" },
        { name: "Spiced latte", desc: "Cardamom and cinnamon", price: "2.000" }
    ],
    "Tea": [
        { name: "Karak chai", desc: "Strong, sweet and creamy", price: "1.000" },
        { name: "Mint tea", desc: "Fresh leaves, served hot", price: "1.200" }
    ],
    "Bakes": [
        { name: "Date and walnut cake", desc: "Baked this morning", price: "1.800" },
        { name: "Butter croissant", desc: "Flaky and warm", price: "1.500" },
        { name: "Chocolate cookie", desc: "Big and chewy", price: "1.000" }
    ]
};

const tabs = document.getElementById("tabs");
const list = document.getElementById("menu-list");

function showCategory(cat) {
    tabs.querySelectorAll("button").forEach(b => {
        b.setAttribute("aria-pressed", String(b.textContent === cat));
    });

    list.innerHTML = menu[cat].map(item => `
    <li>
      <span class="name">${item.name}<span class="desc">${item.desc}</span></span>
      <span class="dots"></span>
      <span class="price">BD ${item.price}</span>
    </li>`).join("");
}

Object.keys(menu).forEach(cat => {
    const b = document.createElement("button");
    b.textContent = cat;
    b.addEventListener("click", () => showCategory(cat));
    tabs.appendChild(b);
});

showCategory("Coffee");

const form = document.getElementById("contact-form");
const msg = document.getElementById("form-msg");

form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const text = form.message.value.trim();

    if (!name || !text) {
        msg.textContent = "Please add your name and a message.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        msg.textContent = "Please enter a valid email address.";
    } else {
        msg.textContent = `Thank you, ${name}! We'll reply soon.`;
        form.reset();
    }
});

document.getElementById("year").textContent = new Date().getFullYear();