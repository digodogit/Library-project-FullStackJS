import React, { useState } from "react";
import { Form,useSubmit, } from "react-router-dom";

export default function CreateBooks(){
    const [showCreate,setShowCreate]=useState(false);
    const [book, setBooks]= useState({
        bookId: "",
        bookName: "",
        author: "",
    });
    const [pages, setPages]= useState({

        pageText: "",
        pageCount: 1,

    })
    const [pageMap, setPageMap]= useState(new Map());
    function handleChangeBook(event) {
        const {name, value} = event.target;
        setBooks((prevState) => {
            return {
                ...prevState,
                [name]:value
            };
        
        });
    };
    function handleChangePages(event){
        const {name, value} = event.target;
        
        setPages((prevState)=>{
            return{
                ...prevState,
                pageText: value
            }

        });
    }
    function handleSubmitPages(event) {
        event.preventDefault(); 
        let pagesSchema = {
            page: pages.pageCount,
            text: pages.pageText
        };
        setPageMap(pageMap.set(pageMap.size,pagesSchema,));

        setPages({
            pageText: '',
            pageCount: pages.pageCount+1,

        }); 

    };
    
    const str = JSON.stringify(Array.from(pageMap.entries()));
    return (
    <div className="create-book">
        <div className="create-book display">
        {showCreate?
        (<Form   className="form-page" method="post" onSubmit={()=>{ setShowCreate(false); setPages({pageText:'',pageCount:1,})}} >
            <div>
            <button className="create-button recolher" onClick={()=>setShowCreate(false)}>recolher</button>
            </div>
            <div>
            <input
                    name="bookId"
                    placeholder="Id do livro..."
                    onChange={handleChangeBook}
                    value={book.bookId}
                    />
            </div>
            
            <div>
                <input
                    name="bookName"
                    placeholder="Nome do livro..."
                    onChange={handleChangeBook}
                    value={book.bookName}
                    />
            </div>
            <div>
                <input
                    name="author"
                    placeholder="Autor(a)..."
                    onChange={handleChangeBook}
                    value={book.author}
                    />
            </div>
            <div>
                <textarea
                    name="pageText"
                    placeholder="texto da pagina..."
                    onChange={handleChangePages}
                    value={pages.pageText}
                    rows="5"
                    />
            </div>
            <div>
                <button className="user-button" onClick={handleSubmitPages}>adicionar pagina</button>
                <button type="submit" name="pageMap" className="user-button" value={str}>criar livro</button>
            </div>
        </Form>):
        (<button className="create-button" onClick={()=>setShowCreate(true)}>criar novo livro </button>)}

        </div>
    </div>

    )
}


        
    

