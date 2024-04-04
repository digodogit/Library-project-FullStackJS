
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class Library{
    constructor(user){
        this.user = user;
        this.books = new Map();
        this.idCounter = 0;
        this.active = null;
    }
    addBook(bookId) {
        let book = new DisplayBook(this.user, bookId);
        this.books.set(this.idCounter,{display:book});
        this.idCounter+=1;
    
    }
    delBook(idBook) {
        this.books.forEach((value, key)=>{
            if (value.book.id===idBook){
                this.idCounter-=1;
                this.active= null;
                this.books.delete(key);
                
            }
        })
    }
    setBook(idbook) {
        this.books.forEach((value, key)=>{
            if(idbook===value.display.book.id){
                this.active=value;
            }
        })
    }
    getActive(){
        let bookParams=JSON.stringify(this.active);
        return bookParams;
    }
    getParams(par) {
        if (this.books.size>0){
            
            let newAr = Array.from(this.books.entries());
            newAr.unshift(par);
            let str = JSON.stringify(newAr);
            return [str];
        }
        else{
            let str2 = JSON.stringify(par);
            return [str2];
        }
    }

}

class Book{
    constructor(id, name, authors, pages){
        this.id = id;
        this.name = name;
        this.authors= authors;
        this.pages = pages;
    }
    getBook(id=null,name=null){
        return this;
}
    getPage(page){
        return this.pages.get(page);
    }
}
class DisplayBook{
    constructor(idUser, book){
        this.idUser=idUser;
        this.book=book;
        this.lastPage= 1;
    }

    displayPage(){
        return this.book.getPage(this.lastpage);
    }
    nextPage(){
        this.lastpage+=1;
    }
    previousPage(){
        this.lastpage-=1;
    }
    
}
const page = new Map([[0,"ueurehu"],[1,"hufhufhu"],[2,"vvyvyvy"]])
const myBook = new Book(1, "belo livro","jose",page);
let books = [];

let mylibrary = null;

app.get('/', (req, res) => {
    res.send(req);
});

app.get(("/:user"), (req,res)=>{
    res.send(mylibrary.getParams(req.params));
});


app.get(("/:user/createbook"), (req,res)=>{
    res.send("legal");
})
app.get(("/:user/book?*"), (req,res)=>{
    mylibrary.setBook(req.query.active);
    res.send(mylibrary.getActive());
})

app.post("/", (req,res)=>{
    user= req.body.user;
    mylibrary = new Library(user);
    res.redirect("/"+user);
});

app.post("/:user/createbook", (req,res)=>{
    let arr = JSON.parse(req.body.pages);
    const pages = arr.flat().filter((ele)=>{
        return typeof(ele)==='object';
    });
    const newBook= new Book(req.body.bookId, req.body.bookName, req.body.author, pages)
    mylibrary.addBook(newBook);
    res.redirect("/"+user); 
});
app.post(("/:user/book?*"), (req,res)=>{
    mylibrary.active.display.lastPage = req.body.lastPage;
    res.send(mylibrary.getActive());
    
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
});