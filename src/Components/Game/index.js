import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { withFirebase } from "../Firebase"
import S from "./style"

class Game extends Component {
    unsubscribe = null
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
                let pile = this.props.deck
                updatedPlayers.forEach(player => {
                    player.hand = pile.splice(0, Math.floor(52/this.props.players.length))
                })
                console.log(pile)
                updatedPlayers[randomNum].hand = updatedPlayers[randomNum].hand.concat(pile)
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
                    let updatedTurn = null
                    let royalCount = null
                    let whoseRoyal = null
                    for(let i = 0; i < updatedPlayers.length; i++) {
                        if(updatedPlayers[i].id === playerId) {
                            let updatedHand = updatedPlayers[i].hand
                            let placedCard = updatedHand.pop()
                            placedCard.skew = (Math.random() * 100)-50
                            placedCard.translateX = (Math.random() * 30)-15
                            placedCard.translateY = (Math.random() * 30)-15
                            updatedPile.push(placedCard)
                            updatedPlayers[i].hand = updatedHand
                            royalCount = placedCard.rank === "jack" ? 1 : placedCard.rank === "queen" ? 2 : placedCard.rank === "king" ? 3 : placedCard.rank === "ace" ? 4 : null
                            whoseRoyal = royalCount > 0 ? playerId : snap.data().whoseRoyal
                            updatedTurn = i === updatedPlayers.length-1 ? updatedPlayers[0].id : updatedPlayers[i+1].id
                        }
                    }
                    if(snap.data().royalCount > 1 && !royalCount) {
                        console.log("i went first")
                        royalCount = snap.data().royalCount - 1
                        updatedTurn = localStorage.getItem("id")
                    } else if(snap.data().royalCount === 1 && !royalCount) {
                        console.log("i went 2nd")
                        this.unsubscribe = setTimeout(() => {
                            for(let i = 0; i < updatedPlayers.length; i++) {
                                if(updatedPlayers[i].id === snap.data().whoseRoyal) {
                                    const updatedHand = updatedPlayers[i].hand.reverse().concat(updatedPile)
                                    updatedPlayers[i].hand = updatedHand.reverse()
                                    updatedPile = []
                                    whoseRoyal = null
                                    royalCount = null
                                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, royalCount, whoseRoyal, whoseTurn: updatedTurn})
                                    return
                                }
                            }
                        }, 1000)
                    }
                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, royalCount, whoseRoyal, whoseTurn: updatedTurn})
                } else {
                    console.log("not your turn")
                }
            })
    }
    slap = () => {
        const playerId = localStorage.getItem("id")
        let pile = [...this.props.pile]
        if(pile.length <= 1 || pile[pile.length-1].rank !== pile[pile.length-2].rank) {
            this.burn()
            return
        }
        if(pile[pile.length-1].rank === pile[pile.length-2].rank || pile[pile.length-1].rank === pile[pile.length-3].rank) {
            clearTimeout(this.unsubscribe)
            this.props.firebase.findRoom(this.props.match.params.id).get()
                .then(snap => {
                    let updatedPlayers = snap.data().players
                    let whoseRoyal = null
                    let royalCount = null
                    for(let i = 0; i < updatedPlayers.length; i++) {
                        if(updatedPlayers[i].id === playerId) {
                            const updatedHand = updatedPlayers[i].hand.reverse().concat(pile)
                            updatedPlayers[i].hand = updatedHand.reverse()
                        }
                    }
                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: [], royalCount, whoseRoyal, whoseTurn: playerId})
                })
        } else {
            clearTimeout(this.unsubscribe)
            this.burn()
            // this.unsubscribe()
        }
    }
    burn = () => {
        const playerId = localStorage.getItem("id")
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                let updatedPlayers = snap.data().players
                let updatedPile = snap.data().pile
                for(let i = 0; i < updatedPlayers.length; i++) {
                    if(updatedPlayers[i].id === playerId) {
                        let updatedHand = updatedPlayers[i].hand
                        const burnedCard = updatedHand.pop()
                        burnedCard.skew = (Math.random() * 100)-50
                        burnedCard.translateX = (Math.random() * 30)-15
                        burnedCard.translateY = (Math.random() * 30)-15
                        updatedPile.unshift(burnedCard)
                        updatedPlayers[i].hand = updatedHand
                    }
                }
                this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile})
            })
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
        const players = this.rotateIds(localStorage.getItem("id"), this.props.players).map((player, i, arr) => {
            const cardBacks = player.hand.slice(0, 1).map((card, i) => {
                return(
                    <S.CardBack key={i} layer={i} src="images/back2.png"></S.CardBack>
                )
            })
            return(
                <S.PlayerContainer key={i} position={i === 0 ? "bottom" : i === 1 && arr.length === 2 ? "top" : i === 1 && arr.length === 3 ? "left" : i === 2 && arr.length === 3 ? "right" : i === 2 && arr.length === 4 ? "top" : "right"}>
                    <S.CardContainer>
                        {cardBacks}
                    </S.CardContainer>
                    <S.Name>{player.name}</S.Name>
                    <h1>{player.hand.length}</h1>
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