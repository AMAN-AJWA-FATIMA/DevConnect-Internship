const servingsInput = document.querySelector("#servings");
const decreaseButton = document.querySelector("#decrease-servings");
const increaseButton = document.querySelector("#increase-servings");
const status = document.querySelector("#quantity-status");
const quantities = [...document.querySelectorAll(".quantity")];
const BASE_SERVINGS = 2;
const MIN_SERVINGS = 1;
const MAX_SERVINGS = 12;

function formatQuantity(value) {
  if (Number.isInteger(value)) return String(value);

  // Use common fractions when the scaled quantity is close to a quarter increment.
  const whole = Math.floor(value);
  const fraction = value - whole;
  const fractions = [
    [0.25, "¼"], [0.3333, "⅓"], [0.5, "½"], [0.6667, "⅔"], [0.75, "¾"]
  ];
  const match = fractions.find(([decimal]) => Math.abs(fraction - decimal) < 0.035);
  if (match) return whole ? `${whole}${match[1]}` : match[1];

  return String(Number(value.toFixed(2)));
}

function unitFor(value, unit) {
  if (unit === "cloves") return value === 1 ? "clove" : "cloves";
  if (unit === "tbsp") return value === 1 ? "tbsp" : "tbsp";
  if (unit === "tsp") return value === 1 ? "tsp" : "tsp";
  return unit;
}

function updateRecipe(announce = true) {
  const parsed = Number.parseInt(servingsInput.value, 10);
  const servings = Number.isFinite(parsed)
    ? Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, parsed))
    : BASE_SERVINGS;

  servingsInput.value = String(servings);

  quantities.forEach((element) => {
    const base = Number(element.dataset.base);
    const unit = element.dataset.unit;
    const scaled = base * servings / BASE_SERVINGS;
    element.textContent = `${formatQuantity(scaled)} ${unitFor(scaled, unit)}`;
  });

  decreaseButton.disabled = servings <= MIN_SERVINGS;
  increaseButton.disabled = servings >= MAX_SERVINGS;

  if (announce) {
    status.textContent = `Ingredient quantities updated for ${servings} ${servings === 1 ? "serving" : "servings"}.`;
  }
}

decreaseButton.addEventListener("click", () => {
  servingsInput.value = String(Number(servingsInput.value) - 1);
  updateRecipe();
});

increaseButton.addEventListener("click", () => {
  servingsInput.value = String(Number(servingsInput.value) + 1);
  updateRecipe();
});

servingsInput.addEventListener("change", () => updateRecipe());
servingsInput.addEventListener("input", () => {
  if (servingsInput.value !== "") updateRecipe();
});

updateRecipe(false);
