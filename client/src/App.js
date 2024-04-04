import React from "react";
import ReactDOM from 'react-dom/client';
import './App.css';
import HomePage from "./HomePage";
import LibraryDisplay, {libraryLoader,libraryAction,} from "./library";
import {
  createBrowserRouter, 
  RouterProvider, 
  redirect,} from "react-router-dom";
  import axios from 'axios';
import BookDisplay, { bookDisplayAction, bookDisplayLoader } from "./bookDisplay";


  export default function App() {
   
    const router = createBrowserRouter([
      {
       path:"/", 
       element:<HomePage />,
       loader: async({params, request}) =>{
        return params;
      },
       action: async({params, request})=>{
          let formData = await request.formData();
          let user = formData.get("user");
         await axios.post("http://localhost:8080", {user}).then((data) => {
          let arr =JSON.parse(data.data);
        }).catch((err)=>{
          console.error("ops submitbook deu erro"+err);
        });
        return redirect("/"+user);
      }
      },
      {
        path:"/:user",
        element:<LibraryDisplay />, 
        loader: async({params, request}) =>{
          let url = new URL(request.url).search;
          if (url){
            return redirect("book"+url);
          }
          return libraryLoader({params});
          
        },

          action: async({params, request})=>{
            let formData = await request.formData();
            let url = `http://localhost:8080/${params.user}/createbook`;
            return libraryAction({formData, url});
        },  
      },
      {
        path: ":user/book",
        element: <BookDisplay />,
        loader:async({params, request})=>{
          let urlParams = new URL(request.url).search;
          return bookDisplayLoader({params, urlParams});
        },
        action: async({params, request})=>{
          if  (request.method==="PATCH"){
            let lastPage= await request.json();
            let urlParams = new URL(request.url).search;
            return bookDisplayAction({params, urlParams, lastPage});
          }
          else{
            return null;
          }
        
        }
      },
      ]);
  return (
    <div><header className="App-header" />
    <div >
      <RouterProvider
      router={router}
      />
    </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



