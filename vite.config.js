import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                text: resolve(__dirname, 'text.html'),
                solutions: resolve(__dirname, 'solutions.html'),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: [
                resolve(__dirname, 'components'),
            ]
        }),
    ],
};