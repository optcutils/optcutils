const fortnights = require('../../bookhelper/assets/json/fortnights.json').Fortnight;

const unique = (data) => Array.from(new Set(data));
const characterInput = $('#fortnightName');
const fortnightsTable = $('#fortnightsTable');
let timeout;

characterInput.on('keyup', (evt) => {
    const value = evt.target.value;
    const filteredList = fortnights.filter(f => f.name.indexOf(value) > -1);
    clearTable();

    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => loadFortnights(filteredList), 500);
});

function loadFortnights(fortnights) {
    let rows = '';
    for (const f of fortnights) {
        let drops = '';
        const dropList = unique(f.drops);
        for (const d of dropList) {
            drops += `<img src="https://onepiece-treasurecruise.com/wp-content/uploads/f${d}.png" class="characterImage" />`;
        }
        rows += `<tr><td class="fortnightTitle">${f.name}</td><td class="fortnightCharacters">${drops}</td></tr>`;
    }
    fortnightsTable.append(rows);
}

function clearTable() {
    fortnightsTable.empty();
}



loadFortnights(fortnights);

