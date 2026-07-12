// =============================
// THE CHESS COMEBACK CHALLENGE
// script.js
// =============================

let currentXP = 0;
let puzzleScore = 0;
let currentStep = 0;

// Progress percentages
const progress = {
    landing:0,
    puzzle1:15,
    questions1:30,
    puzzle2:45,
    questions2:60,
    puzzle3:80,
    finalQuestions:90,
    result:100
};

// ----------------------------
// Screen Navigation
// ----------------------------

function nextScreen(screenID){

    document.querySelectorAll(".screen").forEach(screen=>{
        screen.classList.remove("active");
    });

    document.getElementById(screenID).classList.add("active");

    document.getElementById("progressBar").style.width =
        progress[screenID] + "%";

}

// ----------------------------
// Puzzle Logic
// ----------------------------

function answerPuzzle(level,correct){

    let result=document.getElementById("result"+level);

    if(correct){

        result.innerHTML="✅ Correct!";

        puzzleScore++;

        if(level===1) currentXP+=100;
        if(level===2) currentXP+=200;
        if(level===3) currentXP+=300;

        setTimeout(()=>{

            if(level===1)
                nextScreen("questions1");

            else if(level===2)
                nextScreen("questions2");

            else
                nextScreen("finalQuestions");

        },1200);

    }

    else{

        result.innerHTML="❌ Nice try!";

    }

}

// ----------------------------
// Hint
// ----------------------------

function showHint(){

    document.getElementById("hint").innerHTML=
    "💡 Think of letting go of your queen, use the knight";

}

// ----------------------------
// Personality Generator
// ----------------------------

function finishChallenge(){

    nextScreen("result");

    currentXP+=150;

    document.getElementById("xp").innerHTML=currentXP;

    const quitReason=document.getElementById("quitReason").value;

    const returnReason=document.getElementById("returnReason").value;

    let personality="";
    let summary="";

    if(quitReason==="Studies" || quitReason==="Work"){

        personality="📚 The Busy Strategist";

        summary="You didn't stop loving chess. Life simply demanded your attention. Short daily sessions could bring you back.";

    }

    else if(quitReason==="Rating Frustration"){

        personality="🔥 The Competitive Fighter";

        summary="You thrive on improvement. A structured training plan and regular puzzles can reignite your progress.";

    }

    else if(returnReason==="Friends"){

        personality="♟ The Social Player";

        summary="Chess is more fun when shared. Clubs, communities, and tournaments are your gateway back.";

    }

    else{

        personality="🏆 The Weekend Warrior";

        summary="You still have the instincts. All you need is a reason to sit at the board again.";

    }

    document.getElementById("personality").innerHTML=personality;

    document.getElementById("summary").innerHTML=summary;

}

// ----------------------------
// Share Button
// ----------------------------

document.getElementById("shareButton").addEventListener("click",()=>{

    alert(
`🏆 I completed the Chess Comeback Challenge!

Can you beat my score?

#ChessComebackChallenge #ChessBaseIndia`
    );

});

// ----------------------------
// Submit Button
// (Google Sheets later)
// ----------------------------

const scriptURL = "https://script.google.com/macros/s/AKfycbzdZVUJn8fcaH9LtNDEggnyZm9qzdcfx_HNq9hg1msHT21szEwhks7t1SVCCaErjloJpw/exec";

document.getElementById("submitButton").addEventListener("click", () => {

    const data = {

        rating: document.getElementById("rating").value,

        lastPlayed: document.getElementById("lastPlayed").value,

        quitReason: document.getElementById("quitReason").value,

        creator: document.getElementById("creator").value,

        returnReason: document.getElementById("returnReason").value,

        personality: document.getElementById("personality").innerText,

        xp: currentXP,

        puzzleScore: puzzleScore

    };

    const formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }

fetch(scriptURL, {
    method: "POST",
    body: formData,
    mode: "no-cors"
})
.then(() => {
    alert("🎉 Thanks for participating!");
})
.catch(err => {
    console.error(err);
});
});

// ----------------------------
// Chess Boards
// ----------------------------

