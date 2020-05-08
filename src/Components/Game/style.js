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
    top: ${props => props.position === "bottom" ? "calc(100vh - 250px)" : props.position === "top" ? 0 : 0};
    left: ${props => props.position === "bottom" || props.position === "top" ? "calc((100vw - 250px)/2)" : 0};
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

S.CardContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 25px;
`

S.CardBack = styled.img`
    width: 102.5px;
    position: absolute;
    top: -${props => props.layer ? props.layer * 2 : 0}px;
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

S.DeleteThisOne = styled.button`
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100px;
    height: 50px
`

export default S