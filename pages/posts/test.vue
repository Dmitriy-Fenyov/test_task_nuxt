<template>
    <div>
        <p>Count: {{ $store.state.count }}</p>
        <button @click="$store.commit('increment')">Increment</button>
    </div>
</template>
<script></script>