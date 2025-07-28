const kids = [
  { name: "10yo", color: "#ff8a65" },
  { name: "8yo", color: "#81c784" },
  { name: "6yo", color: "#4fc3f7" },
  { name: "4yo", color: "#ce93d8" },
];

const dailyTasks = ["Make bed", "Personal task"];

const rotatingTasks = [
  "Wipe counters",
  "Take out trash",
  "Help feed pet",
  "Clear table",
];

// Get rotation index based on day of week
const today = new Date();
const rotationIndex = today.getDay() % rotatingTasks.length;

// Load saved checkboxes from localStorage
function loadCheckbox(key) {
  return localStorage.getItem(key) === "true";
}
function saveCheckbox(key, checked) {
  localStorage.setItem(key, checked);
}

const chart = document.getElementById("chart");

kids.forEach((kid, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.borderTop = `6px solid ${kid.color}`;

  const title = document.createElement("h2");
  title.textContent = kid.name;
  card.appendChild(title);

  dailyTasks.forEach(task => {
    const taskId = `${kid.name}-${task}`;
    const wrapper = document.createElement("label");
    wrapper.className = "task";

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = loadCheckbox(taskId);
    box.addEventListener("change", () => saveCheckbox(taskId, box.checked));

    wrapper.appendChild(box);
    wrapper.appendChild(document.createTextNode(task));
    card.appendChild(wrapper);
  });

  const rotTask = document.createElement("div");
  rotTask.className = "rotating";
  rotTask.textContent = `Today's Task: ${rotatingTasks[(i + rotationIndex) % rotatingTasks.length]}`;
  card.appendChild(rotTask);

  chart.appendChild(card);
});
