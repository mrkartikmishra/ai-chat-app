const chatContainer = document.querySelector("#chat-container");
const input = document.querySelector("#input-text");
const askBtn = document.querySelector("#ask-btn");

async function callServer(text) {
  const response = await fetch("http://localhost:3001/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: text }),
  });

  if (!response.ok) {
    throw new Error("Error while generating response..");
  }

  const result = await response.json();

  return result.message;
}

async function generate(text) {
  const userMsgEle = document.createElement("div");
  userMsgEle.className = "bg-neutral-800 my-6 ml-auto p-3 rounded-xl max-w-fit";
  userMsgEle.textContent = text;

  chatContainer.appendChild(userMsgEle);

  input.value = "";

  const assistantMsgEle = document.createElement("div");
  assistantMsgEle.className = "max-w-fit";
  assistantMsgEle.textContent = "Thinking...";
  chatContainer.appendChild(assistantMsgEle);

  const assistantMsg = await callServer(text);
  assistantMsgEle.textContent = assistantMsg;

  chatContainer.appendChild(assistantMsgEle);
}

async function handleAsk() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  await generate(text);
}

async function handleEnter(e) {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  if (e.key === "Enter") {
    await generate(text);
  }
}

input.addEventListener("keyup", handleEnter);
askBtn.addEventListener("click", handleAsk);
