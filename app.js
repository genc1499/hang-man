// app object

const app={};


app.init = ()=>{
    app.getGuess();
    app.word="hellohello";
    app.array= app.word.split("").map(item =>{return ("_")});
    app.guessed=[];
    app.wordGuess();
    app.count=0;
    app.wordMatchCount=0;
    app.displayWord(); 
}


// Display word so far...
app.displayWord=()=>{
    let hang = document.getElementById('hang-area');
    hang.innerText=(app.array.join(" "));
}

// Check the word the user has entered as a guess
app.checkWordGuess=(word)=>{
    if(word===app.word){
        alert("You guessed the word!")
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
        }

        if(app.array.join("")===app.word){
            alert("You guessed the word!")
        }
    
    })

}


}
// get user's letter guess

app.getGuess = () =>{

    let guess = document.getElementById("guessLetter");
    guess.addEventListener('submit', function(e){
        e.preventDefault();

        // increase guess count and check against the number of guesses left
        app.count+=1;
        if(app.count>5){
            alert(`No more Guess, the word was ${app.word}`);   
        }

        else{
       
        let userGuess= e.target.childNodes[1].value;
        guess.reset();
        const guessList=document.getElementById('guesses');
        
        // Display guessed letters
        guessList.append(userGuess+" ")
        app.checkGuess(userGuess.toLowerCase());

        }
    })
}

// Initialize app
app.init();


