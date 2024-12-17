<template>
    <div class="container mx-auto p-4">
        <div class="card bg-neutral text-neutral-content">
            <div class="card-body">
                <h2 class="card-title">Code Review Visualization</h2>
                <p>Load a code review json file</p>
                <input type="file" @change="loadFile" accept=".json" />
                <div v-if="jsonData && isProperJson" class="mt-4">
                    <h2>Title: {{ jsonData.title }}</h2>
                    <h2>Description</h2>
                    <p>{{ jsonData.description }}</p>
                </div>
            </div>
        </div>
        <div class="card bg-neutral text-neutral-content mt-4" v-if="jsonData && isProperJson" >
            <div class="card-body">
                <h2 class="card-title"> Title: {{ jsonData.title }} </h2>
                <h2 class="card-title"> Description: {{ jsonData.description }} </h2>
                <div v-for="(rule, index) in jsonData.rules" :key="index">
                    <div class="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="accordion" />
                        <div class="collapse-title text-xl font-medium">{{ rule.ruleName && rule.ruleSet }}</div>
                        <div class="collapse-content">
                            <h2>Code Visualization</h2>
                            <Diff class="border rounded" :mode="'split'" :theme="'light'" :language="'xml'" :prev="rule.oldCode" :current="rule.newCode" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";

const jsonData = ref(null);
const toast = useToast();
const isProperJson = ref(false);

const loadFile = (event) => {
    isProperJson.value = false;
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                jsonData.value = JSON.parse(e.target.result);
                let hasRequiredProperties = true;

                if (!Object.hasOwnProperty.call(jsonData.value, 'rules')) {
                    console.warn('JSON does not contain "rules" property.');
                    hasRequiredProperties = false;
                }

                if (!Object.hasOwnProperty.call(jsonData.value, 'title')) {
                    console.warn('JSON does not contain "title" property.');
                    hasRequiredProperties = false;
                }

                if (!Object.hasOwnProperty.call(jsonData.value, 'description')) {
                    console.warn('JSON does not contain "description" property.');
                    hasRequiredProperties = false;
                }

                if (!hasRequiredProperties) {
                    toast.error('JSON does not contain required properties.', { timeout: 2000 });
                } else {
                    isProperJson.value = true;
                }

            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    }
};
</script>