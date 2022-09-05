// app object

const app={};


app.init = ()=>{
    app.getRandomWord();
    app.getGuess();
    app.array=[];
    app.guessed=[];
    app.wordGuess();
    app.count=6;
    app.wordMatchCount=0;
    app.displayGuessesLeft();
    app.countCheck = 0;
    app.letterCount=0;
}

app.displayGuessesLeft=()=>{
    const turnsLeft=document.getElementById('turns-left');
    turnsLeft.innerText=String(app.count);
}


app.getRandomWord=()=>{
    fetch('https://random-word-api.herokuapp.com/word?length=5').then((response)=>response.json()).then((data)=>{console.log(data);

    app.word=data[0];
    app.array= app.word.split("").map(item =>{return ("_")});
    app.displayWord(app.array)

    })
}



// Display word so far...
app.displayWord=(array)=>{
    let hang = document.getElementById('hang-area');
    hang.innerText=(array.join(" "));
}

// Check the word the user has entered as a guess
app.checkWordGuess=(word)=>{
    if(word===app.word){
        alert("You guessed the word!")
    }
    else{
        alert("Sorry, that's not the word!");
        count.app-=1;
    }
}

app.wordGuess = () =>{
    let guess=document.getElementById("guessWord");
    guess.addEventListener('submit',(e)=>{
        e.preventDefault();
        app.checkWordGuess(e.target.childNodes[1].value);
    })
}

// Check the letter the user has entered
app.checkGuess = (letter) =>{
    // check if user has already entered a letter
    let checked = app.guessed.filter(item=>{
        return item===letter
    })

    if(checked.length>0)
    {
        alert(`you already guessed letter ${letter} `);
    }


    else{

        let wordArray = app.word.split("")
        wordArray.forEach((item,index) =>{
            if(item===letter){
                app.array[index]=item
                console.log(app.array)
                app.guessed.push(letter);  
                let hang = document.getElementById('hang-area');
                hang.innerText=app.array.join(" ");
                console.log('corrrect', app.count);

                // Keep track of letters that match 
                const regex = /[a-zA-Z]/g; 
                app.letterCount=app.array.join(" ").match(regex).length
                
            }
        })

        // If a letter is not found in array, letter guess doesnt match, remove a guess from count
        if(app.letterCount===app.countCheck){
            app.count-=1;
            app.countCheck=app.letterCount;
            console.log(app.count);
            app.displayGuessesLeft();
        }
         
        // Make into a function
            if(app.array.join("")===app.word){
                alert("You guessed the word!")
            }

    }


}
// get user's letter guess

app.getGuess = () =>{

    let guess = document.getElementById("guessLetter");
    guess.addEventListener('submit', function(e){
        e.preventDefault();

        // increase guess count and check against the number of guesses left
       
        if(app.count===0){
            alert(`No more Guess, the word was ${app.word}`);   
        }

        else{
       
        let userGuess= e.target.childNodes[1].value;
        guess.reset();
        const guessList=document.getElementById('guesses');
        // app.count+=1;
        // Display guessed letters
        guessList.append(userGuess+" ")
        app.checkGuess(userGuess.toLowerCase());

        }
    })
}

// Initialize app
app.init();


