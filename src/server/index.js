'use strict'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')


const app = express()

// Webpack
const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        color: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

// Serve static assets
app.use('/static', express.static(path.resolve(__dirname, '../client/static')))

// Redirect root request to index.html
app.get('/', (req, res) => { res.redirect('/static/index.html') })
//app.get('/', (req, res) => {
//    res.send('Hello World')
//})

// Listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is listening on ' + port)
})
