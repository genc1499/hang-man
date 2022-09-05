// app object

const app={};


app.init = ()=>{
    app.getGuess();
    app.word="gay";
    app.array=["_","_","_"];
    app.guessed=[];
    app.wordGuess();
    app.count=0;
    app.wordMatchCount=0;
    app.showWord();
}

app.showWord=()=>{
    let hang = document.getElementById('hang-area');
    hang.innerText=(app.array.join(" "));
}

// Check word guess
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

// check guess
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

    let newS = app.word.split("")
    console.log(newS);
    newS.forEach((item,index) =>{
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
// get user's guess

app.getGuess = () =>{


    let guess = document.getElementById("guessLetter");
    guess.addEventListener('submit', function(e){
        e.preventDefault();
        app.count+=1;
        if(app.count>5){
            alert(`No more Guess, the word was ${app.word}`);
            
        }
        else{
        console.log(app.count);
        let userGuess= e.target.childNodes[1].value;
        guess.reset();
        const guessList=document.getElementById('guesses');
        guessList.append(userGuess+" ")
        app.checkGuess(userGuess.toLowerCase());
        }
    })



}


let val=1234;
val=

console.log(String(val).split(""));

console.log(Number(val))



app.init();


