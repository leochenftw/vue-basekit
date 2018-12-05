<template>
<div id="app" :class="[class_name]">
    <Header />
    <router-view />
    <Footer />
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import slugify from 'slugify';

export default {
    name: 'App',
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
            // this.$bus.$emit('onPageChange');
            // NProgress.start();
        }
    }
}
</script>
<style>
/* @import '../node_modules/lightbox2/src/css/lightbox.css'; */
@import 'css/styles.css';
</style>
