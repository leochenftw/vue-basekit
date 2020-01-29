<template>
<main id="main" class="main" role="main">
    <Hero :site_data="site_data.hero" />
    <component :is="site_data.pagetype" :site_data="site_data" :is_mobile="is_mobile" />
</main>
</template>

<script>
import Hero from '../blocks/Hero';
import * as components from './index.js';
export default {
    name    :   'Base',
    props   :   ['site_data', 'is_mobile'],
    components: { Hero, ...components }
}
</script>
