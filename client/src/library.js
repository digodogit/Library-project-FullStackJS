import React, { useState } from "react";
import axios from 'axios';
import CreateBooks from "./books";
import { useLoaderData, useSearchParams,} from "react-router-dom";


export default function LibraryDisplay(){
    const {user, books} = useLoaderData();
    let [searchParams, setSearchParams] = useSearchParams();
    const [library, setLibrary] = useState({
        user: user,
        books: books,
        active: '',
        idCounter: 0,
        lastPage: 1,
      });

    function RenderBooksDisplay(){
        function handleClickBook(book){
            setLibrary((prevState)=>
                {
                    return{
                        ...prevState,
                        active:book,
                }})
            setSearchParams({active:book.id});
        }
        return (
            <div>
             {books.map((book, index)=>{

                let bookDisplay = book.filter((ele)=>{ return typeof(ele)==='object';}).find((bookDisplay)=>{
                    return bookDisplay;
                });
                return(
    
                    <div key={index} className="library-display book " >
                    <p>{bookDisplay.display.book.name}</p>
                    <p>{bookDisplay.display.lastPage+"/"+bookDisplay.display.book.pages.length}</p>
                    <button className="book-button" onClick={()=>{handleClickBook(bookDisplay.display.book)}}>selecionar livro</button>                  
                    </div>
                )
            })} 
            </div>

        )
    }
    return (
        <div className="app">
        <div className="library-background">
        {books && (<RenderBooksDisplay />)}
        </div>
        <CreateBooks />
        </div>
    )
};



export async function libraryLoader({params}){
    const url = `http://localhost:8080/${params.user}`;
    const data = await axios.get(url); 
        let arr =JSON.parse(data.data);
        if(!Array.isArray(arr)){
            return arr;
        }
        else{
            let bookArray = arr.slice(1).map((ele)=>{
                return ele;
            })
            let newSchema ={
                ...arr[0],
                books: bookArray
            }
            return newSchema;
        }
}

export async function libraryAction({formData, url}){
    await axios.post(url, {
        bookId: formData.get("bookId"),
        bookName: formData.get("bookName"),
        author: formData.get("author"),
        pages: formData.get("pageMap"),
        },  
        {
        headers: {
        'Content-Type': 'application/json'
        }}
    ).then((data) => {
        let arr =JSON.parse(data.data);
        
    }).catch((err)=>{
        console.error("ops submitbook deu erro"+err);
    });
    return null;
}

