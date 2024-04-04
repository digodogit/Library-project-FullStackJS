import React, { useState,} from "react";
import axios from 'axios';
import { useSubmit, useLoaderData,Form, useNavigate,} from "react-router-dom";


export default function BookDisplay(){
    const {data} = useLoaderData();
    let submit = useSubmit();
    let navigate = useNavigate();
    let bookActive = data.display.book;
    let [indexPage, setIndexPage]= useState({
        actualPage: data.display.lastPage,
        pastPage: data.display.lasPage -1,
        nextPage: data.display.lastPage +1,
    })
    let actualBookPage = bookActive.pages.filter(({text, page})=>{return page ===indexPage.actualPage}).pop();
    
    function handleNextPage(){
        if(indexPage.nextPage <=data.display.book.pages.length){
        setIndexPage((prevState)=>{
            return{
                actualPage: prevState.actualPage+1,
                pastPage: prevState.actualPage,
                nextPage: prevState.actualPage +2,
            }
        })}
        else{
            console.log("ultima pagina ja");
        }

    }
    function handlePrevPage(){
        if(indexPage.actualPage > 1){
            setIndexPage((prevState)=>{
                return{
                    actualPage: prevState.actualPage-1,
                    pastPage: prevState.actualPage -2,
                    nextPage: prevState.actualPage,
                }
            })}
        else{
            console.log("primeira pagina ja");
        }

    }
    return(
        <div className="book-display">
        <button  className="book-button" onClick={()=>{navigate(-1)}}>voltar</button>
        <div className="book-configs">
            <div className="title-pages">
            <h1>{bookActive.name}</h1>
            <p>{indexPage.actualPage+"/"+bookActive.pages.length}</p>
            </div>
            <div className="page-display">
            
            <p>{actualBookPage.text}</p>
            </div>
            <Form onSubmit={(event)=>{
                submit(indexPage.actualPage,{method:"patch",encType:"application/json"});
                event.preventDefault();
                }}>
            <button type="submit" className="page-button" onClick={handlePrevPage}>previous page</button>
            <button type="submit" className="page-button" onClick={handleNextPage}>next page</button>
            </Form>
        </div>
        </div>
    )
}



export async function bookDisplayLoader({params,urlParams}){

    const url = `http://localhost:8080/${params.user}/book${urlParams}`;
    const data = await axios.get(url); 
          return data;
}
export async function bookDisplayAction({params,urlParams, lastPage}){

const url = `http://localhost:8080/${params.user}/book${urlParams}`;
    await axios.post(url, {lastPage},{
    headers: {
    'Content-Type': 'application/json'
    }}
  ).then((data) => {
    return data;
    
  }).catch((err)=>{
    console.error("ops submitbook deu erro"+err);
  });
  return null;
}