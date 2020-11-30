import React, {Component} from 'react';
import {getBotGuess} from './MrmAlgo';
import './MrmVisualizer.css';

export default class MrmVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            userCorrect: 0, 
            userIncorrect: 0, 
            userHistory: "", 
            historyMap : new Map(),
        };
    }

    componentDidMount() {
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

    guess0() {
        const {userCorrect,userIncorrect,userHistory,historyMap} = this.state; 
        const botGuess = getBotGuess(0,userHistory,historyMap);
        const [newuserCorrect,newuserIncorrect] = updateGuesses(0,botGuess,userCorrect,userIncorrect); 
        const newuserHistory = updateHistory(0,userHistory);
        const newhistoryMap = updateMap(newuserHistory,historyMap); 
        this.setState({userCorrect:newuserCorrect,userIncorrect:newuserIncorrect,userHistory:newuserHistory,historyMap:newhistoryMap}); 
    }

    guess1() {
        const {userCorrect,userIncorrect,userHistory,historyMap} = this.state; 
        const botGuess = getBotGuess(1,userHistory,historyMap);
        const [newuserCorrect,newuserIncorrect] = updateGuesses(1,botGuess,userCorrect,userIncorrect); 
        const newuserHistory = updateHistory(1,userHistory);
        const newhistoryMap = updateMap(newuserHistory,historyMap); 
        this.setState({userCorrect:newuserCorrect,userIncorrect:newuserIncorrect,userHistory:newuserHistory,historyMap:newhistoryMap});  
    }

    render() {
        const {userCorrect,userIncorrect} = this.state; 
        return (
            <>
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
                    style = {{height: `${userCorrect}px`}}
                ></div> 
                <div className = "incorrect-bar"
                    style = {{height: `${userIncorrect}px`}}
                ></div> 
            </div>
            <div> 
                userCorrect: {userCorrect} 
            </div> 
            <div>
                userIncorrect: {userIncorrect}    
            </div> 
            <button onClick={() => this.guess0()}>
                Guess 0
            </button>
            <button onClick={() => this.guess1()}>
                Guess 1
            </button>
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