import { createContext, useContext, useEffect, useState } from "react"
import Draggable from 'react-draggable';
import { SelectedMeme, TextBox, TextImage } from "./App";
let key=0
const TextChange=createContext()

export default function Body() {
    let textChange=useState([])
    let [textImage,addTextImage]=useContext(TextImage)
    let [textBox,addTextBox]=useContext(TextBox)
    let [meme,]=useContext(SelectedMeme)
    const handleClick = () => {
        addTextImage(textImage.concat([<TextImageComponent id={key} key={key} />]))
        addTextBox(textBox.concat([<TextBoxComponent key={key} id={key} />]))
        textChange[1](textChange[0].concat([""]))
        key+=1
    }
    return (
        <TextChange.Provider value={textChange}>
        <div className="body">
            <div className="text-input">
                    <button onClick={handleClick} className='add-text btn btn-outline-primary'>Add another text</button>
                {textBox}
            </div>
            <div className="main-image">
                <img src={meme.url} alt={meme.name} />
                {textImage}
            </div>
        </div>
        </TextChange.Provider>
    )
}

function TextImageComponent(props) {
    let [textChange,changeTextChange]=useContext(TextChange)
    let [meme,]=useContext(SelectedMeme)
    console.log(meme.width)
    const handleChange = (event) => {
            changeTextChange(prev => prev.slice(0,props.id).concat([event.target.value]).concat(prev.slice(props.id+1)))
            console.log(textChange)
    }
    return (
        <Draggable bounds={{left: -((500/meme.height)*meme.width)/2, right: ((500/meme.height)*meme.width)/2, top: 0, bottom: 500 }}>
            <input style={{"left" : "50%"}} onChange={handleChange} value={textChange[props.id]} className="drag form-control-plaintext" />
        </Draggable>
    )
}

function TextBoxComponent(props) {
    let [textImage,addTextImage]=useContext(TextImage)
    let [textBox,addTextBox]=useContext(TextBox)
    let [textChange,changeTextChange]=useContext(TextChange)
    useEffect(()=>console.log(1),[textBox])
    const handleChange = (event) => {
            changeTextChange(prev => prev.slice(0,props.id).concat([event.target.value]).concat(prev.slice(props.id+1)))
            console.log(textChange)
        }
    const handleClose=()=> {
        let temp=[...textImage]
        temp.every((element,index) => {
            if (element.props.id===props.id) {
                addTextImage((prev) =>prev.slice(0,index).concat(prev.slice(index+1)))
                addTextBox(prev => prev.slice(0,index).concat(prev.slice(index+1))
                )
                return false
            }
            else return true
        });
    }
    return (
        <div className="items">
            <input value={textChange[props.id]} onChange={handleChange} className="form-control border-primary" placeholder="Enter text" />
            <button className=" btn btn-close" onClick={handleClose}></button>
        </div>
    )
}