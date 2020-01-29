<template>
<div id="app" :class="[class_name]">
    <div v-if="not_supported" class="ie-go-home has-text-centered">
        <p class="subtitle is-4"><router-link :to="{ name: 'Homepage' }"><img width="120" src="@/assets/logo.png" /></router-link></p>
        <h1 class="title is-4">Your browser is not supported</h1>
        <div class="content">
            <p class="subtitle is-5">Please use one of the recommended browsers below:</p>
            <p>
                <a target="_blank" href="https://www.google.com/chrome/">Chrome</a> -
                <a target="_blank" href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> -
                <a target="_blank" href="https://www.microsoft.com/en-nz/windows/microsoft-edge">Edge</a> -
                <a target="_blank" href="https://support.apple.com/downloads/safari">Safari</a> -
                <a target="_blank" href="https://www.opera.com/download">Opera</a>
            </p>
        </div>
    </div>
    <template v-else-if="site_data">
        <Header :site_data="site_data" :is_mobile="is_mobile" />
        <router-view :site_data="site_data" :is_mobile="is_mobile" />
        <Footer :site_data="site_data" />
    </template>
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import slugify from 'slugify';
import './css/styles.css';

export default {
    name: 'App',
    metaInfo() {
        return {
            // Children can override the title.
            title: this.pagetitle,
            // Result: My Page Title ← My Site
            // If a child changes the title to "My Other Page Title",
            // it will become: My Other Page Title ← My Site
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk}` : 'LEOCHENFTW!';
            },
            // Define meta tags here.
            htmlAttrs: {
                lang: 'en'
            },
            link: this.meta_links,
            meta: this.meta_items
        }
    },
    data() {
        return {
            pagetitle   :   null,
            site_data   :   null,
            is_mobile   :   false
        }
    },
    components: {
        Header,
        Footer
    },
    computed: {
        class_name() {
            return slugify(this.$route.name, {lower: true});
        },
        not_supported() {
            if (!window.localStorage) return true;

            let ua      =   window.navigator.userAgent,
                msie    =   ua.indexOf('MSIE '),
                trident =   ua.indexOf('Trident/'); //IE 11

            return msie > 0 || trident > 0;
        },
        meta_links() {
            let links   =   [];
            if (this.site_data && this.site_data.meta && this.site_data.meta.canonical) {
                links.push({rel: 'canonical', href: this.site_data.meta.canonical});
            }
            return links;
        },
        meta_items() {
            let meta    =   [
                {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
            ];
            if (this.site_data && this.site_data.meta) {
                if (this.site_data.meta.description) {
                    meta.push({
                        name    :   'description',
                        content :   this.site_data.meta.description
                    });
                }
                if (this.site_data.meta.keywords) {
                    meta.push({
                        name    :   'keywords',
                        content :   this.site_data.meta.keywords
                    });
                }
                if (this.site_data.meta.robots) {
                    meta.push({
                        name    :   'robots',
                        content :   this.site_data.meta.robots
                    });
                }
                if (this.site_data.meta.social) {
                    this.site_data.meta.social.forEach((o) => {
                        if (o.content) {
                            meta.push(o);
                        }
                    });
                }
            }

            return meta;
        }
    },
    watch: {
        $route(to, from) {
            this.site_data  =   null;
            this.get_page_data(to.fullPath);
            // this.$bus.$emit('onPageChange');
            // NProgress.start();
        }
    },
    created() {
        let me  =   this;
        $(window).on('scroll', function(e) {
            me.$bus.$emit('onWindowScroll', $(window).scrollTop());
        }).on('resize', function(e) {
            me.resize_handler($(window).width());
        });

        this.get_page_data(this.$route.fullPath);
    },
    mounted() {
        // this.$nextTick().then(() => {
        //     $(window).resize();
        // });
    },
    methods :   {
        resize_handler(width)
        {
            this.is_mobile  =   width <= 480;
            this.$bus.$emit('onWindowSize', width);
        },
        get_page_data(path, seamless) {
            if (this.not_supported) return false;

            let me  =   this;
            axios.get(
                base_url + me.get_endpath(path)
            ).then((resp) => {
                me.handle_page_data(resp);
            }).catch((error) => {
                // if (error && error.response && error.response.status) {
                //     me.$router.push('/' + error.response.status);
                // }
            });
        },
        get_endpath(path) {
            path    =   path.ltrim('/');
            return path;
        },
        handle_page_data(resp) {
            if (!resp.data) {
                return this.$router.replace('/403');
            }

            this.pagetitle  =   resp.data.title;
            this.site_data  =   resp.data;
            this.$nextTick().then(() => {
                $(window).resize();
            });
        }
    }
}
</script>
