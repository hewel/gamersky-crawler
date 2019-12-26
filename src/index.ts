import got from 'got'
import * as Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
    ctx.body = await got
        .post('http://appapi2.gamersky.com/v5/getAppNewsList', {
            body: JSON.stringify({
                app: 'GSAPP',
                deviceType: 'GM1910',
                appVersion: '5.2.23',
                os: '',
                osVersion: '10',
                deviceId: null,
                request: {
                    nodeIds: '',
                    pageIndex: 1,
                    topicIds: '2',
                    pageSize: 10,
                    cacheMinutes: '2',
                    order: 'timeDesc',
                },
            }),
        })
        .json()
})

app.listen('5555', () => {
    console.log('Server ready at http://localhost:5555')
})
