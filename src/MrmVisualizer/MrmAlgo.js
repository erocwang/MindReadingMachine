//returns bot guess based on past guesses
//userGuess = user's current guess 
//historyMap = map of user's history to predictions 
//userHistory = string of user's history 
export function getBotGuess(userGuess,userHistory,historyMap) {
    const botGuess = getGuessFromHistory(userGuess,userHistory,historyMap); 
    return botGuess; 
}

function getGuessFromHistory(userGuess,userHistory,historyMap) {
    var botGuess = Math.round(Math.random()); 
    var top = 0; 
    if(userHistory.length===1) {
        botGuess = !parseInt(userHistory[0]);
    }
    else {
        for(let i=userHistory.length-1; i>=Math.max(0,userHistory.length-3); i--) {
            var curGuess = Math.round(Math.random()); 
            if(historyMap.get(userHistory.length-i).has(userHistory.substring(i,userHistory.length))) {
                var zeros = historyMap.get(userHistory.length-i).get(userHistory.substring(i,userHistory.length)).get(0); 
                var ones = historyMap.get(userHistory.length-i).get(userHistory.substring(i,userHistory.length)).get(1);
            }
            if(historyMap.get(userHistory.length-i).get("est").get(0)/Math.max(1,historyMap.get(userHistory.length-i).get("est").get(1)) > top) {
                top = historyMap.get(userHistory.length-i).get("est").get(0)/Math.max(1,historyMap.get(userHistory.length-i).get("est").get(1)); 
                if(zeros > ones) {
                    botGuess = 0; 
                    curGuess = 0; 
                }
                else if(ones > zeros) {
                    botGuess = 1; 
                    curGuess = 1; 
                }
                else {
                    botGuess = Math.round(Math.random());
                    curGuess = Math.round(Math.random()); 
                }
            }
            if(curGuess===userGuess) historyMap.get(userHistory.length-i).get("est").set(0,historyMap.get(userHistory.length-i).get("est").get(0)+1);
            historyMap.get(userHistory.length-i).get("est").set(1,historyMap.get(userHistory.length-i).get("est").get(1)+1); 
        }
    }
    return botGuess; 
}


