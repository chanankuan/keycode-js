const eventKey = document.querySelector(".event-key-card"),
      eventCode = document.querySelector(".event-code-card"),
      eventWhich = document.querySelector(".event-which-card"),
      historyBlock = document.querySelector(".history-block .wrapper"),
      pageTitle = document.querySelector(".page-title"),
      heading = document.querySelector(".page-key-code"),
      homePage = document.querySelector(".home-message"),
      metaKeys = {
        Meta: "⌘",
        Tab: "↹",
        CapsLock: "⇪",
        Shift: "⇧",
        Control: "^",
        Option: "⌥",
        Backspace: "⌫",
        Enter: "↵",
        ArrowUp: "↑",
        ArrowDown: "↓",
        ArrowLeft: "←",
        ArrowRight: "→"
      };

let keyButtons;
let keys = [];

window.addEventListener("keydown", (event) => {
  homePage.classList.add("hide");
  let currentKey = event.key.toUpperCase();
  currentKey = checkMetaKey(currentKey);
  
  keys.forEach(el => {
    if (currentKey === el) {
      historyBlock.removeChild(historyBlock.childNodes[keys.indexOf(el)]);
      keys.splice(keys.indexOf(el), 1);
    }
  })
  
  updateDisplay(event)
  addToHistoryBlock(event);
});

function addToHistoryBlock(event) {
  let currentKey = event.key.toUpperCase();
  currentKey = checkMetaKey(currentKey);
  keys.unshift(currentKey);

  let span = document.createElement("span");
  let button  = document.createElement("button");
  span.innerHTML = keys[0]
  button.appendChild(span);
  button.classList.add("keyButton");
  historyBlock.insertAdjacentElement("afterbegin", button);

  if (keys.length > 4) {
    keys = keys.slice(0, 4);
    historyBlock.lastElementChild.remove();
  }

  button.addEventListener("click", () => {
    updateDisplay(event);
  })
}

function checkMetaKey(currentKey) {
  for (const [key, value] of Object.entries(metaKeys)) {
    if (currentKey === key.toUpperCase()) {
      return currentKey = value;
    }
  }
  return currentKey;
}

function updateDisplay(event) {
  eventKey.innerHTML = event.key;
  eventCode.innerHTML = event.code;
  eventWhich.innerHTML = event.which;
  pageTitle.innerHTML = `JavaScript Key Code ${event.which}`;
  heading.innerHTML = event.which;
}