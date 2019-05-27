<template>
<div class="section">
    <div class="container">
        <h1 class="title is-1">{{site_data.title}}</h1>
    </div>
</div>
</template>

<script>
export default {
    name        :   'Homepage',
    props       :   ['site_data']
}
</script>
