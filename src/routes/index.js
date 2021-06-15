
const { Router } = require('express');
const router = Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');

const json_books = fs.readFileSync('./src/books.json', 'utf-8');
// // console.log(json_books);
let books = JSON.parse(json_books);
let results = [];
let test = 'bbbbb';

// console.log(books);
// console.log(json_books);
// console.log(books);

router.get('/', (req, res) => {
    
    res.render('index.ejs', {
    books,
    test,
    results
        
　})
    // console.log('hello'); 
})

router.get('/new-entry', (req, res) => {
        res.render('new-entry');
})


router.post('/new-entry', (req, res) => {
           
// console.log('hello hello');

    let { tango, significado, uso, categoria, relation} = req.body;
    
        // if(!palabra||!significado||!uso||!categoria||!relacion){
        //     res.status(400).send('We need 5 data completely!');
        //     return;
        // }
    
            let newBook = {
                id: uuidv4(),
                tango,
                significado,
                uso,
                categoria,
                relation,
            };
        
        // console.log(newBook);
        books.push(newBook);
        // console.log(books);
        const json_books = JSON.stringify(books);
        
        fs.writeFileSync('./src/books.json', json_books, 'utf-8', (err, data)=> {
            if(err){
                console.log('error:', err);
            }else{
                console.log(data);
            }
        });
                
        res.redirect('/');
           
})

router.get('/delete/:id', (req, res) => {


        books = books.filter(book  => book.id != req.params.id);     

        const json_books = JSON.stringify(books);
        fs.writeFileSync('src/books.json', json_books, 'utf-8');
        res.redirect('/');
});


router.get('/editar/:id', (req,res)=>{

    const editar = books.find(book  => book.id = req.params.id);     

    console.log(book.id);
    console.log(editar);

    // input.disables = false;



        // console.log(typeof(id));    
        // console.log(id);    

        // const editar = books.find(book => )


        // const idEditor =  

        // editor = books.find()    
        // console.log(books);
        

        // let  = ;
        // input.disabled = false;
        
        // res.redirect('/');
});




router.post('/',(req,res)=>{
    // no se por que funciona...
    const searchinput = JSON.parse(JSON.stringify(req.body));
    
    // let datas =[];
   console.log(searchinput); 
   results = books.filter((book) => book.tango === searchinput.searchinput);
   console.log(searchinput.searchinput); 
   console.log(results); 
   console.log(books); 
   let test="aaaaaa";
   res.redirect('/search'); 
});

router.get('/search/delete/:id', (req, res) => {
    books = books.filter(book  => book.id != req.params.id);     
    results = results.filter(book  => book.id != req.params.id);     

    console.log(results);

    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/search');
});

router.get('/search', (req, res) => {
    
    res.render('search', {
    
        results
        
　})
    // console.log('hello'); 
})


module.exports = router;

