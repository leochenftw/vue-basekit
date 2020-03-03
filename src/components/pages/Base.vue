<template>
<main id="main" class="main" role="main">
    <Hero v-if="site_data.hero" />
    <component :is="site_data.pagetype" />
</main>
</template>

<script>
import Hero from '../blocks/Hero';
import * as components from './index.js';
export default {
    name        :   'Base',
    components: { Hero, ...components },
    computed    :   {
        site_data()
        {
            return this.$store.state.site_data;
        }
    }
}
</script>
