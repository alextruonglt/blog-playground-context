import React from 'react'
import {useGlobalContext} from "./context"

export const Item = () => {

    const {list, handleDelete, handleEdit}= useGlobalContext()
    
    
    const BlogEl = list.map((item) =>{
        const {id, text, author} = item
        return( 
        <div className='indivdualItem' key={id}>
            <div className="blog-container">
                <p className='blogText'>{text}</p>
                <div className="authorconatiner">
                     <p className='authorText'>By: {author} </p>
                    <p><span className='delete-btn fake-btn'
                    onClick={() =>handleDelete(id)}>Delete</span> <span
                    onClick={()=> handleEdit(id)}
                    className='edit-btn fake-btn'>Edit</span></p>
                </div>
               
            </div>
         
        </div>
        )
    })

  return (
    <>
        {BlogEl}
    </>
  )
}
