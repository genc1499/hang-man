// app object

const app={};

app.init = ()=>{
    app.getGuess();
    app.count = 5;
    app.word="hello";
    app.array=["_","_","_","_","_"];
    app.guessed=[];
  
}

// check guess
app.checkGuess = (word) =>{
    // check if user has already entered a letter
    let checked = app.guessed.filter(item=>{
        return item===word
    })

    if(checked.length>0)
    {
        alert(`you already guessed letter ${word} `);
    }


    else{

    let newS = app.word.split("")
    console.log(newS);
    newS.forEach((item,index) =>{
        if(item===word){
            app.array[index]=item
            console.log(app.array)
            app.guessed.push(word);

            
        }
    
    })

}

   
    
    

}
// get user's guess

app.getGuess = () =>{


let guess = document.querySelector("form");
guess.addEventListener('submit', function(e){
    e.preventDefault();
    let userGuess= e.target.childNodes[1].value;
    app.checkGuess(userGuess);
})



}


app.init();


