module.exports = [
    {
        path: '/',
    },
    {
        path: '/posts/',
        frontmatter: {
            title: '全部博文',
            meta: [
                {
                    name: 'description',
                    content: '全部博文',
                },
                {
                    name: 'keywords',
                    content: '全部博文',
                },
            ],
        },
    },
    {
        path: '/tags/',
        frontmatter: {
            title: '全部标签',
            meta: [
                {
                    name: 'description',
                    content: '全部标签',
                },
                {
                    name: 'keywords',
                    content: '全部标签',
                },
            ],
        },
    },
    {
        path: '/timeline.html',
        frontmatter: {
            title: '时间线',
            meta: [
                {
                    name: 'description',
                    content: '时间线',
                },
                {
                    name: 'keywords',
                    content: '时间线',
                },
            ],
        },
    },
    {
        path: '/link.html',
        frontmatter: {
            title: '友人帐',
            meta: [
                {
                    name: 'description',
                    content: '友人帐',
                },
                {
                    name: 'keywords',
                    content: '友人帐',
                },
            ],
        },
    },
];