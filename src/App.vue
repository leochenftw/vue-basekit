<template>
<div id="app">
    <Header />
    <router-view />
    <Footer />
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';

export default {
    name: 'App',
    components: {
        Header,
        Footer
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
