function randomize() {
    var namesInput = document.getElementById('names').value.trim();

    if (namesInput === '') {
        alert('Please enter names before randomizing.');
        return;
    }

    var namesArray = namesInput.split('\n').map(name => name.trim());

    if (namesArray.length < 2) {
        alert('Please enter at least two names.');
        return;
    }

    var randomizedPairs = generateRandomPairs(namesArray);

    displayResult(randomizedPairs);
}

function generateRandomPairs(names) {
    var pairs = [...names];
    var randomizedPairs = [];

    for (let i = 0; i < names.length; i++) {
        let pairIndex = Math.floor(Math.random() * pairs.length);
        let pair = pairs.splice(pairIndex, 1)[0];

        randomizedPairs.push({ giver: names[i], receiver: pair });
    }

    return randomizedPairs;
}

function displayResult(pairs) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    pairs.forEach(pair => {
        var pairElement = document.createElement('div');
        pairElement.textContent = `${pair.giver} gives to ${pair.receiver}`;
        resultDiv.appendChild(pairElement);
    });
}
