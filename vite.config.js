import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
    server: {
        host: '0.0.0.0'
    },
    build: {
        rollupOptions: {
            input: {
                menu: resolve(__dirname, 'menu.html'),
                main: resolve(__dirname, 'index.html'),
                text: resolve(__dirname, 'text.html'),
                solutions: resolve(__dirname, 'solutions.html'),
                partner: resolve(__dirname, 'partner.html'),
                clients: resolve(__dirname, 'clients.html'),
                company: resolve(__dirname, 'company.html'),
                professionals: resolve(__dirname, 'professionals.html'),
                vms: resolve(__dirname, 'vms.html'),
                cms: resolve(__dirname, 'cms.html'),
                dvr: resolve(__dirname, 'dvr.html'),
                cameras: resolve(__dirname, 'cameras.html'),
                stocks: resolve(__dirname, 'stocks.html'),
                stocksItem: resolve(__dirname, 'stocks-item.html'),
                cases: resolve(__dirname, 'cases.html'),
                casesItem: resolve(__dirname, 'cases-item.html'),
                videoanalytics: resolve(__dirname, 'videoanalytics.html'),
                product: resolve(__dirname, 'product.html'),
                kpp: resolve(__dirname, 'kpp.html'),
            },
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