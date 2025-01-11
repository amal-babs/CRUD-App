import React, { useState } from 'react'

function WithoutApi() {
    const[list,setList]=useState([
        {id:1,title:"John"},
        {id:2,title:"Anna"},
        {id:3,title:"Peter"},
    ])
    const [post,setPost]=useState("")
    const [editId,setEditId]=useState(null)
    const [editTitle,setEditTitle]=useState("")


    const handleChange=(event)=>{
        setPost(event.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const newpost={
            id:(list.length)+1,
            title:post};
    
    setList([newpost,...list])
    setPost("");
 }

 //delete
 const handleDelete=(ID)=>{
    setList(list.filter(item=>item.id!==ID))

 }

 //Edit
 const handleEdit=(ID,TITLE)=>{ 
    setEditId(ID)
    setEditTitle(TITLE)
 }
const handleEditChange=(event)=>{
    setEditTitle(event.target.value)
}

const handleSave=()=>{
    setList=(list.map(i=>i.id!==editId ? {...i,title:editTitle} :i))
}

  return (
    <div className='w-50'>
       <h1 className='text-center'>Todo App</h1>

       <form action="" onSubmit={handleSubmit} className='d-flex m-5'>
        <input type="text" placeholder="Enter your name" className="form-control ms-3 border-black" value={post} onChange={handleChange} />
        <button type='submit' className='btn btn-success ms-3'>Submit</button>
       </form>
       <ul className='list-group ms-3'>
        {list.map(i=> <li className='list-group-item border-dark d-flex justify-content-between' key={i.id}>{i.title}

        {editId===i.id? (
            <>
            <input type="text" value={editTitle}  className='form-control' onChange={handleEditChange }/>
            <button className='btn btn-success ms-2' onClick={handleSave}>save</button>
            <button className='btn btn-secondary ms-2'>cancel</button>


            </>
        ) :(
        <>
        {i.title}
        <div className='btn-group'>
        <button className='btn btn-primary' onClick={()=>handleEdit(i.id,i.title)}>Edit</button>
        <button className='btn btn-danger' onClick={()=>handleDelete(i.id)}>Delete</button>
    </div>
    </>)}
    </li>)}

    </ul>
    </div>
  )
}

export default WithoutApi
