const fortnights = require('../../bookhelper/assets/json/fortnights.json').Fortnight;

loadFortnights(fortnights);

function loadFortnights(fortnights) {
    let rows = '';
    for (const f of fortnights) {
        let drops = '';
        for (const d of f.drops) {
            drops += `<img src="https://onepiece-treasurecruise.com/wp-content/uploads/f${d}.png" class="characterImage" />`;
        }
        rows += `<tr><td class="fortnightTitle">${f.name}</td><td class="fortnightCharacters">${drops}</td></tr>`;
    }
    $('#fortnightsTable').append(rows);
}