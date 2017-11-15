
const fortnights = require('../../bookhelper/assets/json/fortnights.json').Fortnight;
const characters = require('../../bookhelper/assets/json/characters.json');
const $ = require('jquery');
const selectize = require('selectize');

let selectedCharacters;

if (localStorage.getItem('characters')) {
    selectedCharacters = new Set(JSON.parse(localStorage.getItem('characters')));
} else {
    selectedCharacters = new Set();
}

function clearTable(fortnightsTable) {
    fortnightsTable.empty();
}

const unique = (data) => Array.from(new Set(data));
const fortnightsTable = $('#fortnightsTable');
const characterNames = $('#characterNames');
const characterBox = $('#characterBox');
let timeout;

characterNames.selectize({
    closeAfterSelect: true,
    placeholder: 'Select your character'
});

characterNames.on('change', (evt) => {
    if (evt.target.value != 0) {
        selectedCharacters.add(pad(evt.target.value, 4));
    }
    //loadTable(fortnights, evt.target.value.split(','));
    createCharacterBox();
    saveData();
});

characterBox.on('click', 'button', evt => {
    const id = evt.currentTarget.dataset.charId;
    selectedCharacters.delete(id);
    createCharacterBox();
});

function createCharacterBox() {
    saveData();
    characterBox.empty();
    characterBox.append(Array.from(selectedCharacters).map(c => `<img src="https://onepiece-treasurecruise.com/wp-content/uploads/f${c}.png" class="characterImage" /><button data-char-id="${c}">x</button>`));
    loadTable(fortnights, Array.from(selectedCharacters));
}

function loadTable(fortnights, characterList = []) {
    const filteredTable = characterList.length
        ? fortnights
            .filter((e) => e.drops
                .some((f) => characterList.indexOf(f) > -1))
        : fortnights;
    const html = filteredTable
        .map((element) => `
            <tr>
                <td class="fortnightTitle">${element.name}</td>
                <td class="fortnightCharacters">${filterDrops(unique(element.drops), characterList)}</td>
            </tr>`);
    clearTable(fortnightsTable);
    fortnightsTable.append(html.join(''));

}

function filterDrops(dropList, characterList) {
    const imgList = dropList
        .filter(e => characterList.indexOf(e) > -1)
        .map(f => `<img src="https://onepiece-treasurecruise.com/wp-content/uploads/f${f}.png" class="characterImage" />`)
        .join('');
    return imgList.length ? imgList : 'No characters selected';
}

function saveData() {
    localStorage.setItem('characters', JSON.stringify(Array.from(selectedCharacters)));
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
/*function fillSelect(characters){
    const list = characters.map((c, i) => `<option value="${i + 1}">${c[0]}</option>`);
    characterNames.append(list);
}*/

//fillSelect(characters);
createCharacterBox();



/*drops += `<img src="https://onepiece-treasurecruise.com/wp-content/uploads/f${d}.png" class="characterImage" />`;
rows += `<tr><td class="fortnightTitle">${f.name}</td><td class="fortnightCharacters">${drops}</td></tr>`;*/