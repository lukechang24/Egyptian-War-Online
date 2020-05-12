import styled from "styled-components"

const S = {}

S.Container1 = styled.div`
    position: relative;
    width: 750px;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: hidden;
`

S.PlayerContainer = styled.div`
    position: absolute;
    top: ${props => props.position === "bottom" ? "calc(750px - 250px)" : props.position === "top" ? 0 : props.position === "left" || props.position === "right" ? "calc(calc((750px - 250px)/2))" : 0};
    left: ${props => props.position === "bottom" || props.position === "top" ? "calc((750px - 250px)/2)" : props.position === "left" ? 0 : props.position === "right" ? "calc(750px - 250px)" : 0};
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: ${props => props.position === "bottom" ? "column-reverse" : "column"};
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    border: 5px solid white;
    &.highlight {
        border: 5px solid greenyellow;
    }
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
    transition: ${props => props.speed === "slower" ? "5s linear" : "0.1s linear" };
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
    width: 200px;
    height: 200px;
    z-index: -1;
    background-color: red;
    border: 5px solid black;
    border-radius: 100px;
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

S.ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
`

S.Button = styled.button`
    width: 100px;
    height: 50px;
`

export default S