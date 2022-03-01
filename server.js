const express = require('express')
const moongose = require('mongoose')
const app = express()
const Article =  require('./models/article')
const methodOverride = require('method-override')

const articleRouter = require('./routes/articles')

moongose.connect('mongodb://localhost/blog'
,{
    useNewUrlParser:true,
    useUnifiedTopology:false }
    
)

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res)=>{
    const article= await Article.find().sort({
        createdAt:'desc'
    })
    res.render("articles/index",{articles:article})
})

app.use('/articles',articleRouter)

app.listen(5000)