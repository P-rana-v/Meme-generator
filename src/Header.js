import { createContext, useContext, useState } from "react"
import { Data, SelectedMeme, TextBox, TextImage } from "./App"
import troll from "./TrollFace.png"
const CloseButton=createContext()

export default function Header() {
    let [showList,changeShowList]=useState(false)
    const handleClick = () => {
        changeShowList(true)
    }
    return (
        <>
            <header className="head bg-primary bg-gradient">
                <img src={troll} alt="Troll Face" />
                <h1 className="title">Meme Generator</h1>
                <button onClick={handleClick} className="btn btn-outline-light">Choose Template</button>
            </header>
            <CloseButton.Provider value={changeShowList}>
                {showList && <List />}
            </CloseButton.Provider>
        </>
    )
}

const List = () => {
    const changeShowList=useContext(CloseButton)
    let data=useContext(Data)
    let items=data.memes.map((item,index) => <ListItem key={index} id={index} url={item.url} name={item.name} />)
    const handleClose = () => {
        changeShowList(false)
    }
    return (
        <div className="list">
            <button className="btn btn-close" onClick={handleClose}></button>
            {items}
        </div>
    )
}

const ListItem = (props) => {
    const changeShowList=useContext(CloseButton)
    let data=useContext(Data)
    let [,setMeme]=useContext(SelectedMeme)
    let [,addTextImage]=useContext(TextImage)
    let [,addTextBox]=useContext(TextBox)
    const handleClick = () => {
        setMeme(data.memes[props.id])
        changeShowList(false)
        addTextBox([])
        addTextImage([])
    }
    return (
        <div className="list-item">
            <img onClick={handleClick} className="list-img" src={props.url} alt={props.name} />
            <label>{props.name}</label>
        </div>
    )
}