<template>
<div id="app">
    <Header />
    <router-view/>
    <Footer />
</div>
</template>

<script>

import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';

export default
{
    name            :   'App',
    components      :   {
                            Header,
                            Footer
                        },
}
</script>
<style>
@import 'css/styles.css';
</style>
