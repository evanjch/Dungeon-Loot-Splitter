let lootArray = [];

document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);

function addLoot() {

    const nameInput = document.getElementById("lootName");
    const valueInput = document.getElementById("lootValue");
    const errorDisplay = document.getElementById("lootError");

    const name = nameInput.value.trim();
    const value = parseFloat(valueInput.value);

    errorDisplay.textContent = "";

    if (name === "") {
        errorDisplay.textContent = "Loot name cannot be empty.";
        return;
    }

    if (isNaN(value) || value < 0) {
        errorDisplay.textContent = "Loot value must be a valid non-negative number.";
        return;
    }

    lootArray.push({
        name: name,
        value: value
    });

    nameInput.value = "";
    valueInput.value = "";

    renderLoot();

    const partySize = parseInt(document.getElementById("partySize").value);
    if (!isNaN(partySize) && partySize >= 1) {
        splitLoot();
    }
}

function renderLoot() {

    const lootList = document.getElementById("lootList");
    const runningTotal = document.getElementById("runningTotal");

    lootList.innerHTML = "";

    let total = 0;

    for (let i = 0; i < lootArray.length; i++) {

        const li = document.createElement("li");
        li.textContent = lootArray[i].name + " - $" + lootArray[i].value.toFixed(2);
        lootList.appendChild(li);

        total += lootArray[i].value;
    }

    runningTotal.textContent = total.toFixed(2);
}

function splitLoot() {

    const partySizeInput = document.getElementById("partySize");
    const splitError = document.getElementById("splitError");
    const finalTotal = document.getElementById("finalTotal");
    const perMember = document.getElementById("perMember");

    splitError.textContent = "";

    const partySize = parseInt(partySizeInput.value);

    if (isNaN(partySize) || partySize < 1) {
        splitError.textContent = "Party size must be at least 1.";
        return;
    }

    if (lootArray.length === 0) {
        splitError.textContent = "No loot has been entered.";
        return;
    }

    let total = 0;

    for (let i = 0; i < lootArray.length; i++) {
        total += lootArray[i].value;
    }

    const splitAmount = total / partySize;

    finalTotal.textContent = total.toFixed(2);
    perMember.textContent = splitAmount.toFixed(2);
}