import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { withFirebase } from "../Firebase"
import S from "./style"

class Game extends Component {
    unsubscribe = null
    componentDidMount() {
        const playerId = localStorage.getItem("id")
        document.addEventListener("keydown", (e) => {
            if(this.props.phase === "idle" && e.which === 38 && playerId === this.props.whoseTurn) {
                this.prepareCard()
            } else if(e.which === 32 && this.props.pile.length > 0 && this.props.whoseSlapping.indexOf(playerId) < 0) {
                // const slapSound = new Audio("audio/slap.mp3")
                // slapSound.play()
                // slapSound.volume = 0.2
                this.prepareSlap()
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
                this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, whoseTurn, phase: "idle"})
            })
    }
    prepareCard = () => {
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                this.props.firebase.findRoom(snap.id).update({phase: "playing"})
                setTimeout(() => {
                    // this.props.firebase.findRoom(snap.id).update({phase: "idle"})
                    this.placeCard()
                }, 100)
            })
    }
    placeCard = () => {
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                const playerId = localStorage.getItem("id")
                // if(playerId === snap.data().whoseTurn) {
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
                        updatedTurn = playerId
                    } else if(snap.data().royalCount === 1 && !royalCount) {
                        this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, phase: "finished"})
                        this.unsubscribe = setTimeout(() => {
                            for(let i = 0; i < updatedPlayers.length; i++) {
                                if(updatedPlayers[i].id === snap.data().whoseRoyal) {
                                    const updatedHand = updatedPlayers[i].hand.reverse().concat(updatedPile)
                                    updatedPlayers[i].hand = updatedHand.reverse()
                                    updatedPile = []
                                    whoseRoyal = null
                                    royalCount = null
                                    updatedTurn = updatedPlayers[i].id
                                    console.log(updatedTurn, "updated")
                                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, royalCount, whoseRoyal, whoseTurn: updatedTurn, phase: "idle"})
                                }
                            }
                        }, 3000)
                        return
                    }
                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, royalCount, whoseRoyal, whoseTurn: updatedTurn, phase: "idle"})
                // } else {
                //     console.log("not your turn")
                // }
            })
    }
    prepareSlap = () => {
        const playerId = localStorage.getItem("id")
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                this.props.firebase.findRoom(snap.id).update({phase: "slapping", whoseSlapping: [...snap.data().whoseSlapping, playerId]})
                setTimeout(() => {
                    this.slap()
                }, 1500)
            })
    }
    slap = () => {
        const playerId = localStorage.getItem("id")
        let pile = [...this.props.pile]
        if(pile.length <= 1 || (pile[pile.length-1].rank !== pile[pile.length-2].rank && pile.length === 2)) {
            if(pile.length === 0) {
                return
            }
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
                    let updatedTurn = snap.data().whoseTurn
                    let phase = "idle"
                    for(let i = 0; i < updatedPlayers.length; i++) {
                        if(updatedPlayers[i].id === playerId && this.props.whoseSlapping[0] === updatedPlayers[i].id) {
                            const updatedHand = updatedPlayers[i].hand.reverse().concat(pile)
                            updatedPlayers[i].hand = updatedHand.reverse()
                            updatedTurn = updatedPlayers[i].id
                        }
                    }
                    this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: [], royalCount, whoseRoyal, whoseTurn: updatedTurn, phase, whoseSlapping: []})
                })
        } else {
            if(playerId === this.props.whoseSlapping[0]) {
                this.burn()
            }
        }
    }
    burn = () => {
        const playerId = localStorage.getItem("id")
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                let updatedPlayers = snap.data().players
                let updatedPile = snap.data().pile
                let phase = "idle"
                for(let i = 0; i < updatedPlayers.length; i++) {
                    if(updatedPlayers[i].id === playerId) {
                        let updatedHand = updatedPlayers[i].hand
                        const burnedCard = updatedHand.pop()
                        burnedCard.skew = (Math.random() * 360)-180
                        burnedCard.translateX = (Math.random() * 30)-15
                        burnedCard.translateY = (Math.random() * 30)-15
                        updatedPile.unshift(burnedCard)
                        updatedPlayers[i].hand = updatedHand
                    }
                }
                this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, phase, whoseSlapping: []})
            })
    }
    createDelay = () => {
        this.props.firebase.findRoom(this.props.match.params.id).get()
            .then(snap => {
                let updatedPlayers = snap.data().players
                let updatedPile = snap.data().pile
                let royalCount = null
                let whoseRoyal = null
                let phase = "idle"
                this.unsubscribe = setTimeout(() => {
                    for(let i = 0; i < updatedPlayers.length; i++) {
                        if(updatedPlayers[i].id === snap.data().whoseRoyal) {
                            const updatedHand = updatedPlayers[i].hand.reverse().concat(updatedPile)
                            updatedPlayers[i].hand = updatedHand.reverse()
                            updatedPile = []
                            whoseRoyal = null
                            royalCount = null
                            this.props.firebase.findRoom(snap.id).update({players: updatedPlayers, pile: updatedPile, royalCount, whoseRoyal, phase})
                            return
                        }
                    }
                }, 1000)
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
    fixGame = () => {
        this.props.firebase.findRoom(this.props.match.params.id).update({phase: "idle", whoseSlapping: []})
    }
    restart = () => {
        this.props.firebase.findRoom(this.props.match.params.id).update({
            deck: this.props.shuffle(this.props.deck), 
            phase: "idle", 
            pile: [], 
            royalCount: null, 
            whoseRoyal: null, 
            whoseSlapping: []
        }).then(() => {
            this.startGame()
        })
    }
    render() {
        const playerId = localStorage.getItem("id")
        const players = this.rotateIds(playerId, this.props.players).map((player, i, arr) => {
            const cardBacks = player.hand.slice(0, 1).map((card, i) => {
                return(
                    <S.CardBack className={this.props.phase === "playing" && this.props.whoseTurn === player.id && i === 0 ? "move" : ""} key={i} layer={i} src="images/back2.png"></S.CardBack>
                )
            })
            return(
                <S.PlayerContainer key={i} className={this.props.whoseTurn === player.id ? "highlight" : ""} position={i === 0 ? "bottom" : i === 1 && arr.length === 2 ? "top" : i === 1 && arr.length === 3 || i === 1 && arr.length === 4 ? "left" : i === 2 && arr.length === 3 ? "right" : i === 2 && arr.length === 4 ? "top" : "right"}>
                    <S.Container2 position={i === 0 ? "bottom" : i === 1 && arr.length === 2 ? "top" : i === 1 && arr.length === 3 || i === 1 && arr.length === 4 ? "left" : i === 2 && arr.length === 3 ? "right" : i === 2 && arr.length === 4 ? "top" : "right"}>
                        <S.CardContainer>
                            {cardBacks}
                        </S.CardContainer>
                        <S.Hand src="images/hand.png" className={this.props.phase === "slapping" && this.props.whoseSlapping.indexOf(player.id) >= 0 ? "move" : ""} ></S.Hand>
                    </S.Container2>
                    <S.Name>{player.name}</S.Name>
                    <h1>{player.hand.length}</h1>
                </S.PlayerContainer>
            )
        })
        const pile = this.props.pile.map((card, i) => {
            return(
                    <S.Card key={i} skew={card.skew} translateX={card.translateX} translateY={card.translateY} src={card.imgUrl}></S.Card>
            )
        })
        const audio = this.props.players.map(player => {
            return(
                <audio src="audio/slap.mp3" type="audio/mpeg" autoPlay={this.props.phase === "slapping" && this.props.whoseSlapping.indexOf(player.id) >= 0 ? true : false}></audio>
            )
        })
        return(
            <S.Container1>
                <S.ButtonContainer>
                    {
                        this.props.phase === "waiting"
                            ?
                                <S.Button disabled={this.props.phase === "idle" || this.props.phase === "playing" ? true : false} onClick={() => this.startGame()}>Start</S.Button>
                            :
                                <S.Button onClick={() => this.restart()}>Restart</S.Button>
                    }
                    {
                        this.props.phase !== "waiting"
                            ?
                                <S.Button onClick={() => this.fixGame()}>Fix Game</S.Button>
                            :
                                null

                    } 
                </S.ButtonContainer>
                {players}
                <S.Pile>
                    {pile}
                </S.Pile>
                {
                    this.props.phase === "slapping"
                        ?
                            <>
                                {audio}
                            </>
                        :
                            null
                }
            </S.Container1>
        )
    }
}

export default withRouter(withFirebase(Game))