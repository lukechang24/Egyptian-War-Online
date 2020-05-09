import styled from "styled-components"

const S = {}

S.Container1 = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
`

S.PlayerContainer = styled.div`
    position: absolute;
    top: ${props => props.position === "bottom" ? "calc(100vh - 250px)" : props.position === "top" ? 0 : props.position === "left" || props.position === "right" ? "calc(calc((100vh - 250px)/2))" : 0};
    left: ${props => props.position === "bottom" || props.position === "top" ? "calc((100vw - 250px)/2)" : props.position === "left" ? 0 : props.position === "right" ? "calc(100vw - 250px)" : 0};
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: ${props => props.position === "bottom" ? "column-reverse" : "column"};
    justify-content: center;
    align-items: center;
    background-color: lightblue;
`

S.Container2 = styled.div`
    width: ${props => props.position === "left" || props.position === "right" ? "auto" : "100%"};
    height: ${props => props.position === "left" || props.position === "right" ? "100%" : "auto"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: ${props => props.position === "top" ? "rotate(180deg)" : props.position === "left" ? "rotate(90deg)" : props.position === "right" ? "rotate(270deg)" : 0};
`

S.Hand = styled.img`
    width: 100px;
    z-index: 100;
    transition: 0.1s linear;
    &.move {
        transform: translate(-50px, calc(-100vh/2 + 102.5px));
    }
`

S.CardContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 25px;
`

S.CardBack = styled.img`
    /* position: absolute; */
    /* bottom: 100%;
    left: 100%; */
    /* top: -${props => props.layer ? props.layer * 2 : 0}px; */
    width: 102.5px;
    transition: 0.2s linear;
    &.move {
        transform: translate(75px, calc(-100vh/2 + 102.5px));
    }
`
S.Pile = styled.div`
    position: relative;
    width: 250px;
    height: 250px;
`

S.Card = styled.img`
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100px;
    transform: ${props => `rotate(${props.skew}deg) translate(${props.translateX}px, ${props.translateY}px)`};
    border: 1px solid black;
    border-radius: 15px;
`

S.Name = styled.h1`

`

S.StartButton = styled.button`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 50px;
`

export default S