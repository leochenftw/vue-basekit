<template>
<section class="hero">
    <div class="container">
        <div :class="['hero-body', {'has-card': has_card}]" :style="'background-image: url(' + bg + ');'">
            <div class="hero-body__card" v-if="has_card">
                <h2 class="title is-4">{{site_data.title}}</h2>
                <div class="content" v-html="site_data.content"></div>
                <p class="action">
                    <router-link class="button is-primary" v-if="site_data.link.is_internal" :to="site_data.link.url">{{site_data.link.title}}</router-link>
                    <a class="button is-primary" v-else :target="site_data.link.open_in_blank ? '_blank' : '_self'">{{site_data.link.title}}</a>
                </p>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name    :   'Hero',
    props   :   ['site_data'],
    computed    :   {
        bg()
        {
            if (this.site_data) {
                return this.site_data.hero.url;
            }

            return null;
        },
        has_card()
        {
            if (this.site_data) {
                return this.site_data.title || this.site_data.content || this.site_data.link;
            }

            return false;
        }
    }
}
</script>
