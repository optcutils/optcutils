const fetch = require('node-fetch');
const fs = require('fs');
let dropData = '';
let charactersData = '';
fetch('https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/data/drops.js')
    .then((data) => {
        let dest = fs.createWriteStream('./lib/drops.txt');
        let stream = data.body.pipe(dest);
        stream.on('finish', () => {
            console.warn('Fortnights downloaded');
            fetch('https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/data/units.js')
                .then((data) => {
                    let dest = fs.createWriteStream('./lib/characters.txt');
                    let stream = data.body.pipe(dest);
                    stream.on('finish', () => {
                        console.warn('Characters downloaded');
                        loadFile();
                    });
                });
        });
    });


function loadFile() {
    fs.readFile(`${__dirname}/drops.txt`, 'utf8', (err, data) => {
        if (err) throw err;
        dropData = data;
        fs.readFile(`${__dirname}/characters.txt`, 'utf8', (err2, data2) => {
            if (err) throw err;
            charactersData = data2;
            processData();
        });
    });
}

function processData() {
    let window = {};
    eval(dropData);
    eval(charactersData);
    let fortnights = window.drops.Fortnight;
    let characters = window.units;
    fortnights = fortnights.map(prepareFortnight);
    characters = characters.map((character, index) => prepareCharacter(character, index));
    saveFile(fortnights, characters);
    //fortnights.map((fortnight => console.log(fortnight.name)));
}

function prepareCharacter(character, index) {
    return {name: character[0], value: index + 1};
}

function prepareFortnight(fortnight) {
    fortnight.drops = [];
    moveDrops(fortnight, 'Expert');
    moveDrops(fortnight, 'Elite');
    moveDrops(fortnight, 'All Difficulties');
    moveDrops(fortnight, 'All Dificulties');
    moveDrops(fortnight, 'Japan');
    fortnight.thumb = fortnight.thumb.toString().padStart(4, '0');
    return fortnight;
}

function moveDrops(data, text) {
    if (data[text]) {
        data[text].map((element) => {
            if (element.toString().startsWith('-')) data.drops.push(element.toString().replace('-', '').padStart(4, '0'));
        });
    }
}

function saveFile(fortnights, characters) {
    fs.writeFile('./bookhelper/assets/json/fortnightsNEW.json', JSON.stringify(fortnights));
    fs.writeFile('./bookhelper/assets/json/charactersNEW.json', JSON.stringify(characters));
}