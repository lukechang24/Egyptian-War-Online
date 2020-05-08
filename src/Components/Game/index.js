import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { withFirebase } from "../Firebase"
import S from "./style"

class Game extends Component {
    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            if(this.props.phase === "playing" && e.which === 38) {
                this.placeCard()
            } else if(this.props.phase === "playing" && e.which === 32) {
                this.slap()
            }
        })
    }
    startGame = () => {
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                let updatedPlayers = snap.data().players
                let randomNum = Math.floor(Math.random() * updatedPlayers.length)
                let whoseTurn = updatedPlayers[randomNum].id
                updatedPlayers.forEach(player => {
                    let pile = this.props.deck.splice(0, 52/this.props.players.length)
                    player.hand = pile
                })
                this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, whoseTurn, phase: "playing"})
            })
    }
    placeCard = () => {
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                const playerId = localStorage.getItem("id")
                if(playerId === snap.data().whoseTurn) {
                    let updatedPlayers = snap.data().players
                    let updatedPile = snap.data().pile
                    let turnIndex = null
                    let updatedTurn = null
                    for(let i = 0; i < updatedPlayers.length; i++) {
                        if(updatedPlayers[i].id === playerId) {
                            let updatedHand = updatedPlayers[i].hand
                            let placedCard = updatedHand.pop()
                            placedCard.skew = (Math.random() * 100)-50
                            placedCard.translateX = (Math.random() * 30)-15
                            placedCard.translateY = (Math.random() * 30)-15
                            updatedPile.push(placedCard)
                            updatedPlayers[i].hand = updatedHand
                            turnIndex = i
                        }
                    }
                    updatedTurn = turnIndex === updatedPlayers.length-1 ? updatedPlayers[0].id : updatedPlayers[turnIndex+1].id
                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, whoseTurn: updatedTurn})
                } else {
                    console.log("not your turn")
                }
            })
    }
    slap = () => {
        const playerId = localStorage.getItem("id")
        let pile = [...this.props.pile]
        if(pile[pile.length-1].rank === pile[pile.length-2].rank || pile[pile.length-1].rank === pile[pile.length-3].rank) {
            this.props.firebase.findRoom(this.props.match.params.id).get()
                .then(snap => {
                    let updatedPlayers = snap.data().players
                    for(let i = 0; i < updatedPlayers.length; i++) {
                        if(updatedPlayers[i].id === playerId) {
                            const updatedHand = updatedPlayers[i].hand.reverse().concat(pile)
                            updatedPlayers[i].hand = updatedHand.reverse()
                        }
                    }
                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: [], whoseTurn: playerId})
                })
        } else {
            console.log("WRONG")
        }
    }
    rotateIds = (id, arr) => {
        let updatedArr = [...arr]
        if(this.props.checkIfExists(id, updatedArr)) {
            while(updatedArr[0].id !== id) {
                updatedArr.unshift(updatedArr.pop())
            }
        } else {
            console.log("id not found")
        }
        return updatedArr
    }
    render() {
        const players = this.rotateIds(localStorage.getItem("id"), this.props.players).map((player, i) => {
            const cardBacks = player.hand.slice(0, 1).map((card, i) => {
                return(
                    <S.CardBack key={i} layer={i} src="images/back2.png"></S.CardBack>
                )
            })
            return(
                <S.PlayerContainer key={i} position={i === 0 ? "bottom" : i === 1 ? "top" : "right"}>
                    <S.CardContainer>
                        {cardBacks}
                    </S.CardContainer>
                    <S.Name>{player.name}</S.Name>
                </S.PlayerContainer>
            )
        })
        const pile = this.props.pile.map(card => {
            return(
                    <S.Card skew={card.skew} translateX={card.translateX} translateY={card.translateY} src={card.imgUrl}></S.Card>
            )
        })
        return(
            <S.Container1>
                <S.StartButton onClick={() => this.startGame()}>Start</S.StartButton>
                {players}
                <S.DeleteThisOne onClick={() => this.placeCard()}>place card</S.DeleteThisOne>
                <S.Pile>
                    {pile}
                </S.Pile>
            </S.Container1>
        )
    }
}

export default withRouter(withFirebase(Game))