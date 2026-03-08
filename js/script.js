// Application State
let lootArray = [];

// Event Listeners
document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", function () {
    updateUI();
});
document.getElementById("partySize").addEventListener("input", updateUI);

// Add Loot
function addLoot() {

    const nameInput = document.getElementById("lootName");
    const valueInput = document.getElementById("lootValue");
    const quantityInput = document.getElementById("lootQuantity");
    const errorDisplay = document.getElementById("lootError");

    const name = nameInput.value.trim();
    const value = parseFloat(valueInput.value);
    const quantity = parseInt(quantityInput.value);

    errorDisplay.textContent = "";

    if (name === "") {
        errorDisplay.textContent = "Loot name cannot be empty.";
        return;
    }

    if (isNaN(value) || value < 0) {
        errorDisplay.textContent = "Loot value must be a valid non-negative number.";
        return;
    }

    if (isNaN(quantity) || quantity < 1) {
        errorDisplay.textContent = "Quantity must be at least 1.";
        return;
    }

    // Add to state
    lootArray.push({
        name: name,
        value: value,
        quantity: quantity
    });

    nameInput.value = "";
    valueInput.value = "";
    quantityInput.value = "";

    updateUI();
}


// Remove Loot
function removeLoot(index) {
    lootArray.splice(index, 1);
    updateUI();
}

// UI Update
function updateUI() {

    const partySizeInput = document.getElementById("partySize");
    const partyError = document.getElementById("partyError");
    const splitError = document.getElementById("splitError");
    const splitButton = document.getElementById("splitLootBtn");

    const lootRows = document.getElementById("lootRows");
    const noLootMessage = document.getElementById("noLootMessage");
    const totalSection = document.getElementById("totalSection");
    const results = document.getElementById("results");

    const runningTotal = document.getElementById("runningTotal");
    const finalTotal = document.getElementById("finalTotal");
    const perMember = document.getElementById("perMember");

    partyError.textContent = "";
    splitError.textContent = "";

    const partySize = parseInt(partySizeInput.value);

    // Calculate total
    let total = 0;

    for (let i = 0; i < lootArray.length; i++) {
        total += lootArray[i].value * lootArray[i].quantity;
    }

    runningTotal.textContent = total.toFixed(2);
    finalTotal.textContent = total.toFixed(2);


    // Render Loot List
    lootRows.innerHTML = "";

    for (let i = 0; i < lootArray.length; i++) {

        let row = document.createElement("div");
        row.className = "loot-row";

        let nameCell = document.createElement("div");
        nameCell.className = "loot-cell";
        nameCell.innerText = lootArray[i].name;

        let valueCell = document.createElement("div");
        valueCell.className = "loot-cell";
        valueCell.innerText = lootArray[i].value.toFixed(2);

        let quantityCell = document.createElement("div");
        quantityCell.className = "loot-cell";
        quantityCell.innerText = lootArray[i].quantity;

        let actionCell = document.createElement("div");
        actionCell.className = "loot-cell";

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", function () {
            removeLoot(i);
        });

        actionCell.appendChild(removeBtn);

        row.appendChild(nameCell);
        row.appendChild(valueCell);
        row.appendChild(quantityCell);
        row.appendChild(actionCell);

        lootRows.appendChild(row);
    }


    // Empty State Control
    if (lootArray.length === 0) {
        noLootMessage.classList.remove("hidden");
        totalSection.classList.add("hidden");
        results.classList.add("hidden");
    } else {
        noLootMessage.classList.add("hidden");
        totalSection.classList.remove("hidden");
    }

    // Validating the Party
    let validParty = true;

    if (isNaN(partySize) || partySize < 1) {
        partyError.textContent = "Party size must be at least 1.";
        validParty = false;
    }
    
    // Calculating Split
    if (validParty && lootArray.length > 0) {
        let splitAmount = total / partySize;
        perMember.textContent = splitAmount.toFixed(2);
        results.classList.remove("hidden");
        splitButton.disabled = false;
    } else {
        results.classList.add("hidden");
        splitButton.disabled = true;
    }
}