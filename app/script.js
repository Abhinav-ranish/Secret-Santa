// Uncomment the following line if you need to include the smtp.js library in your HTML file.
// <script src="smtp.js"></script>

function randomize() {
    var namesInput = document.getElementById('names').value.trim();
    var emailsInput = document.getElementById('emails').value.trim();

    if (namesInput === '' || emailsInput === '') {
        alert('Please enter names and emails before randomizing.');
        return;
    }

    var namesArray = namesInput.split('\n').map(name => name.trim());
    var emailArray = emailsInput.split('\n').map(email => email.trim());

    if (namesArray.length < 2 || namesArray.length !== emailArray.length) {
        alert('Please provide at least two names and a corresponding email address for each participant.');
        return;
    }

    var pairs = generateRandomPairs(namesArray);

    // Send pairs via SMTP email
    sendEmails(pairs, emailArray);

    alert('Secret Santa pairs generated and emails sent.');
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

function sendEmails(pairs, emails) {
    pairs.forEach((pair, index) => {
        let email = emails[index];
        sendEmail(pair, email);
    });
}


function sendEmail(pair, email) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "....@gmail.com", // Replace with your Gmail address
        Password: "....", // Replace with your Gmail password or app-specific password
        To: email,
        From: "noreply....@gmail.com", // Should be the same as the Username
        Subject: "Secret Santa Pairing",
        Body: `You are paired! ${pair.giver} gives to ${pair.receiver}`,
        // You might need to add the property 'SMTPS' if Gmail requires SSL
        // SMTPS: true,
        // You may also need to set the port to 465 (SSL)
        Port: 465,
        // Enable TLS (if needed)
        // TLS: true,
    }).then(
        message => console.log('Email sent successfully:', message),
        error => console.error('Error sending email:', error)
    );
}
