const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  });
app.get('/pizza/pineapple', (req, res) => {
    res.send('We do not serve that here. Never call again!');
});

app.get('/pizza/pepperoni',(req, res) => {
    res.send('Your pizza is on the way, baby');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        `;
    res.send(responseText);    
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
})

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        return res.status(400).send('Please provide a race');
    }

    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom!`;

    res.send(greeting);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

// ASSIGNMENT ONE
app.get('/sum', (req, res) => {
    const numA = req.query.numA;
    const numB = req.query.numB;

    const changeNumA = parseInt(numA, 10);
    const changeNumB = parseInt(numB, 10);

    if(!numA) {
        return res.status(400).send('Please provide a number');
    }
    if(!numB) {
        return res.status(400).send('Please provide a number');
    }
    if(Number.isNaN(numA)) {
        return res
              .status(400)
              .send('a must be a number');
      }
    
      if(Number.isNaN(numB)) {
        return res.status(400).send('b must be a number');
      }

    const numC = changeNumA + changeNumB
    const resultMessage = `The sum of ${numA} and ${numB} is ${numC}`

    res.send(resultMessage)

})

//ASSIGNMENT TWO
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text) {
        return res.status(400).send('Please provide some text');
    }
    if (!shift) {
        return res.status(400).send('Please indicate a sift');
    }

    const numShift = parseInt(shift);

    if(Number.isNaN(numShift)) {
        return res
              .status(400)
              .send('a must be a number');
      }

    ciphertext = "";    
    var re = /[a-z]/;

    for(i=0; i<text.length; i++){ 
        if(re.test(text.charAt(i))) ciphertext += String.fromCharCode((text.charCodeAt(i) - 97 + shift)%26 + 97); 
        else ciphertext += text.charAt(i); 
    }   

    
    res.send(ciphertext)

})

//ASSIGNMENT THREE

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers

    const changeNum = parseInt(numbers);
    
    if(!numbers) {
        return res.status(400).send('numbers are required');
    }
    if(!Array.isArray(numbers)) {
        return res.status(200).send("numbers must be an array");
      }
    
    const guesses = numbers
      .map(n => parseInt(n))
      .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

    if(guesses.length != 6) {
    return res
        .status(400).send("numbers must contain 6 integers between 1 and 20");
    }   
    
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

    
    const winningNumbers = [];
    for(let i = 0; i < 6; i++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        winningNumbers.push(stockNumbers[ran]);
        stockNumbers.splice(ran, 1);
    }

    
    let diff = winningNumbers.filter(n => !guesses.includes(n));
    let responseText;

    switch(diff.length){
        case 0: 
            responseText = 'Wow! Unbelievable! You could have won the mega millions!';
            break;
        case 1:   
            responseText = 'Congratulations! You win $100!';
            break;
        case 2:
            responseText = 'Congratulations, you win a free ticket!';
            break;
        default:
            responseText = 'Sorry, you lose';  
    }

    console.log(winningNumbers);
    console.log(stockNumbers)
    console.log(numbers)
    res.send(responseText);
})

