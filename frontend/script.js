const chatContainer = document.querySelector("#chat-container");
const input = document.querySelector("#input-text");
const askBtn = document.querySelector("#ask-btn");

function generate(text) {
  const chatText = document.createElement("div");
  chatText.className = "bg-neutral-800 my-6 ml-auto p-3 rounded-xl max-w-fit";
  chatText.textContent = text;

  chatContainer.appendChild(chatText);

  input.value = "";
}

function handleAsk() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  generate(text);
}

function handleEnter(e) {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  if (e.key === "Enter") {
    generate(text);
  }
}

input.addEventListener("keyup", handleEnter);
askBtn.addEventListener("click", handleAsk);
