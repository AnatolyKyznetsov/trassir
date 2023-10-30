document.addEventListener('DOMContentLoaded', () => {
    const media = { xxl: 1900, xl: 1790, lg: 1380, md: 992, sm: 576 };
    window.media = media;

    const headerSeachInit = () => {
        const search = document.querySelector('.js-headerSearch');
        
        if (!search) {
            return false;
        }

        const header = document.querySelector('.js-header');
        const btn = search.querySelector('.js-headerSearchBtn');
        const form = search.querySelector('.js-headerSearchForm');
        const input = search.querySelector('.js-headerSearchInput');
        const container = search.closest('.js-headerContainer');
        const logo = container ? container.querySelector('.js-headerLogo') : null;
        const formWidth = logo ? container.offsetWidth - logo.offsetWidth - search.offsetWidth - 64 : 0;

        const showSearch = () => {
            header.classList.add('search-open');
            btn.classList.add('is-active');
            form.style.width = `${formWidth}px`;
            input.focus();
        }

        const hideSearch = () => {
            header.classList.remove('search-open');
            btn.classList.remove('is-active');
            form.style.width = '';
            input.value = '';
        }

        if (search.classList.contains('is-active')) {
            showSearch();
            search.classList.remove('is-active');
        }

        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-active')) {
                if (input.value) {
                    form.submit();
                } else  {
                    hideSearch();
                }
            } else {
                showSearch();
            }
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('.js-headerSearch')) {
                hideSearch();
            }
        });
    }

    const initSalesSlider = () => {
        new Swiper('.js-salesSlider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.js-salesSliderPagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.js-salesSliderNext',
                prevEl: '.js-salesSliderPrev',
            },
            mousewheel: {
                forceToAxis: true,
                invert: false,
                thresholdDelta: 25,
            },
        });
    }

    const initDefaultSliders = () => {
        const sliders = document.querySelectorAll('.js-defaultSlider')
        
        sliders.forEach(slider => {
            const next = slider.querySelector('.js-defaultSliderNext');
            const prev = slider.querySelector('.js-defaultSliderPrev');
            const pagination = slider.querySelector('.js-deafultSliderPagination');

            new Swiper(slider, {
                slidesPerView: 'auto',
                spaceBetween: 24,
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                mousewheel: {
                    forceToAxis: true,
                    invert: false,
                    thresholdDelta: 25,
                },
            });
        });
    }

    const disableScroll = (hide, elems = []) => {
        const body = document.body;
        const html = document.documentElement;

        const scrollWidthCalc = () => {
            const div = document.createElement('div');
            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.position = 'absolute';
            div.style.opacity = '0';
            body.append(div);
            const width = div.offsetWidth - div.clientWidth;
            div.remove();

            return width;
        }

        const scrollWidth = scrollWidthCalc();

        elems.forEach(elem => {
            elem.style.maxWidth = hide ? '' : `calc(100% - ${scrollWidth}px`;
        });

        body.style.marginRight = hide ? '' : `${scrollWidth}px`;
        body.style.overflow =  hide ? '' : 'hidden';
        html.style.overflow =  hide ? '' : 'hidden';
    }

    const burgerMenuInit = () => {
        let needClone = true;
        const button = document.querySelector('.js-burger');
        const menu = document.querySelector('.js-headerMenuMob');

        if (!button || !menu) {
            return false;
        }

        const serchBtn = document.querySelector('.js-headerSearchMob');
        const header = document.querySelector('.js-header'); ;

        const cloneElems = () => {
            const elemsClassNames = [
                'js-headerSearchForm',
                'js-headerTools', 
                'js-headerNav',
            ]

            const elemInMenu = menu.querySelector(`.${elemsClassNames[0]}`);
        
            if (elemInMenu) {
                return false;
            }

            elemsClassNames.forEach(elem => {
                const node = document.querySelector(`.${elem}`);

                if (!node) {
                    return false;
                }

                const newElem = node.cloneNode(true);
                menu.append(newElem);
            });

            return true;
        }

        const toggleMenu = () => {
            if (needClone) {
                needClone = cloneElems();
            }

            const headerHeight = header ? header.offsetHeight : 0;

            menu.style.top = `${headerHeight}px`;
            menu.style.height = `calc(100vh - ${headerHeight}px)`;
            menu.classList.toggle('is-active');
            button.classList.toggle('is-active');
            disableScroll(!menu.classList.contains('is-active'), [ menu ]);

            const search = menu.querySelector('.js-headerSearchForm');

            if (search) {
                search.classList.remove('is-active');
            }
        }

        button.addEventListener('click', toggleMenu);

        serchBtn.addEventListener('click', () => {
            if (!menu.classList.contains('is-active')) {
                toggleMenu();
            }

            const search = menu.querySelector('.js-headerSearchForm');
            search.classList.toggle('is-active');
        });
    };

    const footerNavMobInit = () => {
        const blocks = document.querySelectorAll('.js-footerBlock');

        blocks.forEach(block => {
            const list = block.querySelector('.js-footerList');

            block.addEventListener('click', e => {
                if (window.innerWidth > media.md ||
                    e.target.closest('.js-footerList')) {
                    return false;
                }

                block.classList.toggle('is-active');
                const listHeight = block.classList.contains('is-active') ? list.scrollHeight : 0;
                list.style.maxHeight = `${listHeight}px`;
            });
        });
    }

    const initModals = () => {
        const modalOpener = document.querySelectorAll('[data-modal-open]');
    
        modalOpener.forEach(item => {
            item.addEventListener('click', () => {
                let modalName = item.dataset.modalOpen,
                    modal = document.querySelector(`.js-modal[data-modal="${modalName}"]`);
    
                    modal.addEventListener('click', e => {
                        if (e.target.classList.contains('js-modal') ||
                            e.target.classList.contains('js-modalClose') ) {
                            modal.classList.remove('is-active');
                        }
                    });
    
                    modal.classList.add('is-active');
            });
        });
    }

    const initTabs = () => {
        const tabs = document.querySelectorAll('.js-tabs');

        const toggleActive = (elems, target) => {
            elems.forEach((elem, index) => {
                elem.classList.remove('is-active');

                if (index === target) {
                    elem.classList.add('is-active');
                }
            });
        }

        const copyContent = (desktop, mobile) => {
            const isSmallScreen = window.innerWidth < media.md;
            const from = isSmallScreen ? desktop : mobile;
            const to = isSmallScreen ? mobile : desktop;

            if (!to || Array.from(to.children).length !== 0) {
                return false;
            }

            Array.from(from.children).forEach(node => {
                to.append(node);
            });
        }

        tabs.forEach((item, itemIndex) => {
            let activeIndex = 0;
            const btns = item.querySelectorAll('.js-tabsTab');
            const contents = item.querySelectorAll('.js-tabsContent');
            const contentsMob = item.querySelectorAll('.js-tabsContentMob');

            if (itemIndex === 0 && (contentsMob[0] && contents[0])) {
                copyContent(contents[0], contentsMob[0]);
            }

            btns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    if (contentsMob[index] && contents[index]) {
                        copyContent(contents[index], contentsMob[index]);
                    }
                    
                    activeIndex = index;
                    toggleActive(btns, index);
                    toggleActive(contents, index);               
                    toggleActive(contentsMob, index);
                });
            });

            window.addEventListener('resize', () => {
                copyContent(contents[activeIndex], contentsMob[activeIndex]);
            });
        });

    }

    const initTabSliders = () => {
        const sliders = document.querySelectorAll('.js-tabSlider');

        sliders.forEach(slider => {
            const next = slider.querySelector('.js-defaultSliderNext');
            const prev = slider.querySelector('.js-defaultSliderPrev')
            const pagination = slider.querySelector('.js-deafultSliderPagination');

            new Swiper(slider, {
                slidesPerView: 1,
                spaceBetween: 24,
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                mousewheel: {
                    forceToAxis: true,
                    invert: false,
                    thresholdDelta: 25,
                },
            });
        });
    }

    const fullScreenImagesInit = () => {
        const createImg = src => {
            const div = document.createElement('div');
            div.className = 'full-screen-img__block';
            const img = document.createElement('img');
            img.src = src;

            div.append(img);
            document.body.append(div);

            div.onclick = () => {
                div.classList.remove('is-active');
                setTimeout(() => {
                    div.remove();
                }, 300);
            }

            setTimeout(() => {
                div.classList.add('is-active');
            }, 10);
        }

        document.addEventListener('click', e => { 
            if (e.target.closest('.js-fullScreenImg')) {
                const block = e.target.closest('.js-fullScreenImg');
                const bigImg = block.dataset.big;
                const img = block.querySelector('img');
                const src = bigImg ? bigImg : img.src;                
                createImg(src);
            }
        });
    }

    fullScreenImagesInit();
    initTabSliders();
    initTabs();
    initModals();
    footerNavMobInit();
    burgerMenuInit();
    headerSeachInit();
    initSalesSlider();
    initDefaultSliders();
});