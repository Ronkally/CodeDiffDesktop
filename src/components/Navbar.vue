<template>
    <div class="navbar text-base-content shadow-lg">
        <div class="flex-1">
            <router-link to="/" class="btn btn-ghost text-xl">ProjectDiff</router-link>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><router-link to="create">Create CodeReview</router-link></li>
                <li><router-link to="view">View CodeReview</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<script setup>
import { RouterLink } from 'vue-router';
</script>