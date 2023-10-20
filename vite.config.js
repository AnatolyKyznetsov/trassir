import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                text: resolve(__dirname, 'text.html'),
                solutions: resolve(__dirname, 'solutions.html'),
                solutions: resolve(__dirname, 'partner.html'),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: [
                resolve(__dirname, 'components'),
            ]
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