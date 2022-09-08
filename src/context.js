import React, {useState, useContext, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';


const AppContext = React.createContext()

const getLocalStorage = () => {
  let list = localStorage.getItem("list")

  if(list){
    return JSON.parse(list)
  } else{
    return []
  }
}




const AppProvider = ({children}) =>{
    const [text, setText] = useState("")
    const [author, setAuthor]= useState("")
    const [list, setList] = useState(getLocalStorage())
    const [isEditing, setisEditing]= useState(false)
    const [editId, setEditId] = useState(null)
  
  
    
    
    const  handleSubmit = (e) =>{
        e.preventDefault()
  
        const newItem = {text: text, id:uuidv4(), author:author }
  
        if(!text || !author){
          alert("Please enter both values")
        } else if(isEditing){
  
          setList(list.map((item) => {
            if(item.id === editId){
              return {...list, author: author, text:text}
            }
            return list
          }))
          setText("")
          setAuthor("")
          setEditId(null)
          setisEditing(false)
  
  
        }else{
          setList(prevList => {
            return [...prevList, newItem]
          })
          setText("")
          setAuthor("")
     
        }
  
       
    }
  
    const handleDelete = (id) =>{
      setList(list.filter((item) =>{
        return item.id !== id
      }) )
    }
  
    const clearAll = () =>{
      setList("")
    }
  
    const handleEdit = (id) =>{
      const specificItem = list.find((item) =>{
        return item.id === id
      })
  
      setEditId(id)
      setText(specificItem.text)
      setAuthor(specificItem.author)
      setisEditing(true)
       
    }

    useEffect(() =>{
      localStorage.setItem("list", JSON.stringify(list))
    },[list])

    



    return <AppContext.Provider
    value={{
        text,
        author,
        list,
        handleDelete,
        handleEdit,
        handleSubmit,
        setAuthor,
        setText,
        clearAll

    }}
    
    >{children}</AppContext.Provider>
}


export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}