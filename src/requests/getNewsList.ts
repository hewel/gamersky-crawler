import got from 'got'

interface NewsListParam {
    nodeIds?: number[]
    pageIndex?: number
    topicId?: number
    pageSize?: number
    cacheMinutes?: number
    order?: string
}

function getNewsList(data?: NewsListParam) {
    const {
        nodeIds = [],
        pageIndex,
        topicId,
        pageSize,
        cacheMinutes,
        order,
    } = data || {
        nodeIds: [],
        pageIndex: 1,
        topicId: 2,
        pageSize: 10,
        cacheMinutes: 3,
        order: 'timeDesc',
    }

    const bodyObj = {
        app: 'BIG_ASS',
        deviceType: 'iPhone12,5',
        appVersion: '5.8.10',
        os: 'ios',
        osVersion: '10',
        deviceId: null,
        request: {
            nodeIds: nodeIds.join(' '),
            pageIndex,
            topicIds: topicId,
            pageSize,
            cacheMinutes,
            order,
        },
    }

    return got.post('http://appapi2.gamersky.com/v5/getAppNewsList', {
        json: bodyObj,
    })
}

interface NewsItemRow {
    type: string
    contentType: string
    contentId: number
    title: string
    description: string
    thumbnailURLs: string[]
    authorName: string
    authorHeadImageURL: string
    badges: string[]
    readingCount: number
    commentsCount: number
    contentURL: string
    adId: number
    updateTime: number
    duration: string
    sourceName?: string
    childElements?: string
}

function parseNewsList(rowList: NewsItemRow[]) {}

export { getNewsList }
