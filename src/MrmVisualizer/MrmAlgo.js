//returns bot guess based on past guesses
//userGuess = user's current guess 
//historyMap = map of user's history to predictions 
//userHistory = string of user's history 
export function getBotGuess(userHistory,historyMap) {
    const botGuess = getGuessFromHistory(userHistory,historyMap); 
    return botGuess; 
}

function getGuessFromHistory(userHistory,historyMap) {
    var botGuess = Math.round(Math.random()); 
    var zeros = 0; 
    var ones = 0;
    if(userHistory.length===1) {
        botGuess = !parseInt(userHistory[0]);
    }
    else {
        for(let i=userHistory.length-2; i>=Math.max(0,userHistory.length-4); i--) {
            zeros += Math.pow(historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).get(0),userHistory.length-1-i); 
            ones += Math.pow(historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).get(1),userHistory.length-1-i);
        }
        console.log(zeros);
        console.log(ones);
        if(zeros>ones) botGuess=0;
        else if(zeros<ones) botGuess=1;  
    }
    return botGuess; 
}


