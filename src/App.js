import Header from "./Header";
import Body from "./Body"
import "./index.css"
import { createContext, useEffect, useState } from "react"
export const Data=createContext()
export const TextBox=createContext()
export const TextImage=createContext()
export const HandleClose=createContext()
export const SelectedMeme=createContext()

function App() {
  let textBox=useState([])
  let textImage=useState([])
  let [data,changeData]=useState({})
  let meme=useState({})
  useEffect(() => {
      fetch("https://api.imgflip.com/get_memes")
      .then(item => item.json())
      .then(item => changeData(item.data))
  },[])
  return (
    <TextBox.Provider value={textBox}>
      <TextImage.Provider value={textImage}>
        <Data.Provider value={data} >
          <SelectedMeme.Provider value={meme} >
            <Header />
            <Body />
          </SelectedMeme.Provider>
        </Data.Provider>
      </TextImage.Provider>
    </TextBox.Provider>
  );
}

export default App;
