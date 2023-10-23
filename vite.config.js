import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'pages/index.html'),
                text: resolve(__dirname, 'pages/text.html'),
                solutions: resolve(__dirname, 'pages/solutions.html'),
                partner: resolve(__dirname, 'pages/partner.html'),
                clients: resolve(__dirname, 'pages/clients.html'),
            },
            // output: {
                // dir: 'dist'
            // }
        },
    },
    plugins: [
        handlebars({
            partialDirectory: [
                resolve(__dirname, 'components'),
            ],
        }),
        viteStaticCopy({
            targets: [
                {
                    src: [ 
                        './local/js',
                        './local/images'
                    ],
                    dest: './local/',
                },
                {
                    src: [ './script.js' ],
                    dest: './',
                },
            ]
        })
    ],
};