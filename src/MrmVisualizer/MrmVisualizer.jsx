import React, {Component} from 'react';
import {getBotGuess} from './MrmAlgo';
import './MrmVisualizer.css';

export default class MrmVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCorrect: 0, 
            userIncorrect: 0, 
            userHistory: "", 
            historyMap: new Map(),
            showResult: 0, 
        };
    }

    componentDidMount() {
        document.body.style.backgroundColor = "grey"; 
        const historyMap = new Map(); 
        historyMap.set(1,new Map(new Map())); 
        historyMap.get(1).set("est", new Map());
        historyMap.get(1).get("est").set(0,0);
        historyMap.get(1).get("est").set(1,0);
        historyMap.set(2,new Map(new Map())); 
        historyMap.get(2).set("est",new Map());
        historyMap.get(2).get("est").set(0,0);
        historyMap.get(2).get("est").set(1,0);
        historyMap.set(3,new Map(new Map()));
        historyMap.get(3).set("est",new Map());  
        historyMap.get(3).get("est").set(0,0);
        historyMap.get(3).get("est").set(1,0);
        historyMap.set(4,new Map(new Map()));
        historyMap.get(4).set("est",new Map());  
        historyMap.get(4).get("est").set(0,0);
        historyMap.get(4).get("est").set(1,0);
        historyMap.set(5,new Map(new Map()));
        historyMap.get(5).set("est",new Map());  
        historyMap.get(5).get("est").set(0,0);
        historyMap.get(5).get("est").set(1,0);
        this.setState({historyMap});
    }

    handleKeyPress(e) {
        if(e.keyCode === 37) {
            this.guess0(); 
        }
        else if(e.keyCode === 39) {
            this.guess1(); 
        }
    }

    guess0() {
        if(this.state.showResult) return; 
        const {userCorrect,userIncorrect,userHistory,historyMap} = this.state; 
        const botGuess = getBotGuess(0,userHistory,historyMap);
        const [newuserCorrect,newuserIncorrect] = updateGuesses(0,botGuess,userCorrect,userIncorrect); 
        const newuserHistory = updateHistory(0,userHistory);
        const newhistoryMap = updateMap(newuserHistory,historyMap); 
        this.setState({userCorrect:newuserCorrect,userIncorrect:newuserIncorrect,userHistory:newuserHistory,historyMap:newhistoryMap}); 
        if(newuserCorrect>newuserIncorrect) document.getElementById("text").innerHTML = "You win!";
        else document.getElementById("text").innerHTML = "You lose!";
        if(newuserCorrect >= 30 || newuserIncorrect >= 30) this.setState({showResult: 1});
        else this.setState({showResult: 0})
    }

    guess1() {
        if(this.state.showResult) return; 
        const {userCorrect,userIncorrect,userHistory,historyMap} = this.state; 
        const botGuess = getBotGuess(1,userHistory,historyMap);
        const [newuserCorrect,newuserIncorrect] = updateGuesses(1,botGuess,userCorrect,userIncorrect); 
        const newuserHistory = updateHistory(1,userHistory);
        const newhistoryMap = updateMap(newuserHistory,historyMap); 
        this.setState({userCorrect:newuserCorrect,userIncorrect:newuserIncorrect,userHistory:newuserHistory,historyMap:newhistoryMap});  
        if(newuserCorrect>newuserIncorrect) document.getElementById("text").innerHTML = "You win!";
        else document.getElementById("text").innerHTML = "You lose!";
        if(newuserCorrect >= 30 || newuserIncorrect >= 30) this.setState({showResult: 1});
        else this.setState({showResult: 0})
    }

    restart() {
        this.setState({userCorrect: 0, userIncorrect: 0, showResult: 0, userHistory: ""});
    }

    render() {
        const {userCorrect,userIncorrect,showResult} = this.state; 
        return (
            <>
            <div tabIndex="-1" onKeyDown={(e) => this.handleKeyPress(e)}> 
            <div className="row-container"> 
                <div className="black-box">
                </div>
                <div className="white-box">
                </div>
                <div className="black-box">
                </div>
                <div className="white-box">
                </div>
            </div>
            <div className="row-container"> 
                <div className="white-box">
                </div>
                <div className="black-box">
                </div>
                <div className="white-box">
                </div>
                <div className="black-box">
                </div>
            </div>
            <div className = "bar-container"> 
                <div className = "correct-bar"
                    style = {{height: `${userCorrect*2}px`}}
                ></div> 
                <div className = "incorrect-bar"
                    style = {{height: `${userIncorrect*2}px`}}
                ></div> 
            </div>
            <div className = "text-container"> 
                botIncorrect: {userCorrect} 
            </div> 
            <div className = "text-container">
                botCorrect: {userIncorrect}    
            </div> 
            <button class = "button1" onClick={() => this.guess0()}>
                Guess 0
            </button>
            <button class = "button1" onClick={() => this.guess1()}>
                Guess 1
            </button>
            <div className = "result" style = {{visibility: showResult ? `visible` : `hidden`}} >
                <p id="text"> </p> 
                <button onClick={() => this.restart()}>
                    Restart!
                </button>
            </div> 
            </div> 
            </>
        );
    }
}

const updateGuesses = (userGuess,botGuess,userCorrect,userIncorrect) => {
    if(userGuess===botGuess) {
        userIncorrect++; 
    }
    else {
        userCorrect++; 
    }
    return [userCorrect,userIncorrect]; 
};

const updateHistory = (userGuess,userHistory) => {
    userHistory += userGuess
    return userHistory; 
}; 

const updateMap = (userHistory,historyMap) => {
    var cur = 0; 
    if(userHistory[userHistory.length-1]==="0") {
        for(let i=userHistory.length-2; i>=Math.max(0,userHistory.length-6); i--) {
            if(!historyMap.get(userHistory.length-1-i).has(userHistory.substring(i,userHistory.length-1))) {
                historyMap.get(userHistory.length-1-i).set(userHistory.substring(i,userHistory.length-1),new Map());
                historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).set(0,0);
                historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).set(1,0);               
            }
            cur = historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).get(0);
            historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).set(0,cur+1); 
        }
    }
    else {
        for(let i=userHistory.length-2; i>=Math.max(0,userHistory.length-6); i--) {
            if(!historyMap.get(userHistory.length-1-i).has(userHistory.substring(i,userHistory.length-1))) {
                historyMap.get(userHistory.length-1-i).set(userHistory.substring(i,userHistory.length-1),new Map());
                historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).set(0,0);
                historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).set(1,0);          
            }
            cur = historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).get(1);
            historyMap.get(userHistory.length-1-i).get(userHistory.substring(i,userHistory.length-1)).set(1,cur+1); 
        }
    }
    return historyMap; 
};