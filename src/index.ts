import got from 'got'
import * as Koa from 'koa'

import { getNewsList } from './requests/getNewsList'

const app = new Koa()

app.use(async ctx => {
    ctx.body = await getNewsList().json()
})

app.listen('5555', () => {
    console.log('Server ready at http://localhost:5555')
})
