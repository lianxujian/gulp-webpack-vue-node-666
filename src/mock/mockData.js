/**
 * Created by juntingliu2 on 2017/4/5.
 */

import Mock from 'mockjs'
if (process.env.NODE_ENV === 'development') {
    //文章
    let showArt = Mock.mock(
        '/showArt', {
            "path": "F:\\gulp-webpack-vue-node\\server\\static\\article/article0.txt",
            "content": "mock的"
        }
    )
//列表
    let showArtList = Mock.mock(
        '/showArtList', {
            '|1-50': [
                {
                    'size|1-100': 1,
                    'name|1-10': 1,
                    'path': "F:\gulp-webpack-vue-node\server\static\article\article1.txt"
                }
            ]
        }
    )
}


