const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const packageConfig = require(path.resolve(__dirname, './package.json'))
const port = packageConfig.config.port
const basePath = require('./project.config.js').serverPrefix
app.use(bodyParser.json())
app.set('port', port)

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './build'))

// 映射static目录
app.use(express.static(path.join(__dirname, './build')))

// 页面路由
const router = express.Router()
// const aresBuild = require('../config.js').aresBuild;

// const getAresHost = require('../utils/utils.js')

// const preloadChunks = ['manifest.bundle', 'vendor.bundle', 'app.bundle'];

// const prefetchChunks = ['index',];

// router.get('/static/:asset', (req, res, next) => {
//     next()
// })

// router.get(`${basePath}/:controller`, (req, res) => {
//     // const aresHost = getAresHost(req.headers.host);
//     res.render('index', {
//         // path: `${basePath}/`,
//         PUBLIC_URL: `${basePath}`,
//         TITLE: packageConfig.name,
//         // path: `${aresHost}/ares2/car.dcs/custom/${aresBuild}/default/`,
//         // preloadChunks: preloadChunks,
//         // prefetchChunks: prefetchChunks
//     })
// })

// router.get('/:controller', function(req, res) {
//     res.sendFile(path.join(__dirname, '*.html'))
//     // res.render('./build/index', {
//     //     PUBLIC_URL: `${basePath}`,
//     // })
// })

router.get(`${basePath}/*`, function(req, res) {
    if (fs.existsSync(path.join(__dirname, req.params[0]))) {
        res.sendFile(path.join(__dirname, req.params[0]))
    } else if (fs.existsSync(path.join(__dirname, 'build', req.params[0]))) {
        res.sendFile(path.join(__dirname, 'build', req.params[0]))
    } else {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    }
})

app.use(basePath, router)

const server = app.listen(app.get('port'), () => {
    const host = server.address().address
    const port = server.address().port
    console.log('express server listening on %s %s', host, port)
})
