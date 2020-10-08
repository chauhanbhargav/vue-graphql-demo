// apollo.config.js
module.exports = {
    client: {
        service: {
            name: 'Vue-Demo-App',
            url: 'https://graphqlzero.almansi.me/api',
        },
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
        ],
    },
}