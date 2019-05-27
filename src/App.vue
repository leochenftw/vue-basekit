<template>
<div id="app" :class="[class_name]" v-if="site_data">
    <Header :site_data="site_data" />
    <router-view :site_data="site_data" />
    <Footer :site_data="site_data" />
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import slugify from 'slugify';
import './css/styles.css';

export default {
    name: 'App',
    data() {
        return {
            site_data   :   null
        }
    },
    components: {
        Header,
        Footer
    },
    computed: {
        class_name() {
            return slugify(this.$route.name, {lower: true});
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
        // let me  =   this;
        // $(window).on('scroll', function(e) {
        //     me.$bus.$emit('onWindowScroll', $(window).scrollTop());
        // }).on('resize', function(e) {
        //     me.$bus.$emit('onWindowSize', $(window).width());
        // });

        this.get_page_data(this.$route.fullPath);
    },
    mounted() {
        // this.$nextTick().then(() => {
        //     $(window).resize();
        // });
    },
    methods :   {
        get_page_data(path, seamless) {
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

            document.title  =   resp.data.title;
            this.site_data  =   resp.data;
        }
    }
}
</script>
