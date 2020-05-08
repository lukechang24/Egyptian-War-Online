import React, { Component } from "react"
import Game from "../Game"
import { withFirebase } from "../Firebase"
import { withRouter } from "react-router-dom"
import cards from "./cards"

class Room extends Component {
    state = {
        players: [],
        deck: [],
        pile: [],
        whoseTurn: "",
        royalCount: null,
        whoseRoyal: null,
        phase: "",
    }
    componentDidMount() {
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                const randomId = this.generateRandomId()
                if(snap.exists) {
                    this.props.firebase.findRoom(this.props.match.params.id).get()
                        .then(snap => {
                            if(!this.checkIfExists(randomId, snap.data().players)) {
                                this.props.firebase.findRoom(snap.id).update({
                                    players: [...snap.data().players, 
                                        {
                                            id: randomId, 
                                            name: `player${snap.data().players. length+1}`,
                                            hand: []
                                        }]
                                })
                            }
                        })
                } else {
                    this.props.firebase.createRoom().doc(this.props.match.params.id).set({
                        players: [{id: randomId, name: "player1", hand: []}], 
                        master: randomId, 
                        deck: [...this.shuffle(cards)],
                        pile: [],
                        royalCount: null,
                        whoseRoyal: null,
                        whoseTurn: "",
                        phase: "idle"
                    })
                }
                this.props.firebase.findRoom(this.props.match.params.id)
                    .onSnapshot(snapshot => {
                        this.setState({
                            players: [...snapshot.data().players],
                            deck: [...snapshot.data().deck],
                            pile: [...snapshot.data().pile],
                            whoseTurn: snapshot.data().whoseTurn,
                            phase: snapshot.data().phase
                        })
                    })
            })
    }
    generateRandomId = () => {
        let randomId = localStorage.getItem("id") ? localStorage.getItem("id") : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return randomId
    }
    checkIfExists = (id, arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return true;
            }
        }
        return false;
    }
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    render() {
        return(
            <Game players={this.state.players} deck={this.state.deck} pile={this.state.pile} whoseTurn={this.state.whoseTurn} phase={this.state.phase} checkIfExists={this.checkIfExists}/>
        )
    }
}

export default withRouter(withFirebase(Room))