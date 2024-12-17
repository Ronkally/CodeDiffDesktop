<template>
    <div class="container mx-auto p-4">
        <div class="card bg-neutral text-neutral-content">
            <div class="card-body">
                <h2 class="card-title">Code Review Creation</h2>
                <p>Fill the fields below and create a new code review.</p>
                <input type="text" v-model="title" placeholder="Code Review Title"
                    class="input input-bordered w-full" />
                <textarea placeholder="Code Review Description" class="textarea textarea-bordered textarea-md w-full"
                    v-model="description"></textarea>
                <div v-for="(rule, index) in rules" :key="index">
                    <div class="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="accordion" />
                        <div class="collapse-title text-xl font-medium">{{ rule.ruleName && rule.ruleSet ? rule.ruleSet
                            + ' - ' + rule.ruleName : 'Rule ' + (index + 1) }}</div>
                        <div class="collapse-content">
                            <input type="text" placeholder="Ruleset" v-model="rule.ruleSet"
                                class="input input-bordered w-full mb-2" />
                            <input type="text" placeholder="RuleName" v-model="rule.ruleName"
                                class="input input-bordered w-full mb-2" />
                            <textarea placeholder="Old Code" v-model="rule.oldCode"
                                class="textarea textarea-bordered textarea-md w-full mb-2"></textarea>
                            <textarea placeholder="New Code" v-model="rule.newCode"
                                class="textarea textarea-bordered textarea-md w-full mb-2"></textarea>
                            <h2 v-if="rule.oldCode && rule.newCode">Code Visualization</h2>
                            <Diff class="border rounded" v-if="rule.oldCode && rule.newCode" :mode="'split'"
                                :theme="'light'" :language="'xml'" :prev="rule.oldCode" :current="rule.newCode" />
                        </div>
                    </div>
                </div>
                <div class="card-actions justify-end mt-3">
                    <button class="btn btn-primary" @click="addRule">Add Code Changes</button>
                    <button class="btn btn-error" @click="removeRule">Remove Last Changes</button>
                    <button class="btn btn-primary" @click="createCodeReview">Create Code Review</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import router from "../router";

const toast = useToast();
const rules = ref([{ oldCode: '', newCode: '', ruleSet: '', ruleName: '' }]);
const description = ref('');
const title = ref('');

const addRule = () => {
    rules.value.push({ oldCode: '', newCode: '', ruleSet: '', ruleName: '' });
};

const removeRule = () => {
    if (rules.value.length === 1) {
        return;
    }
    rules.value.pop();
};

const createCodeReview = () => {

    if (!title.value || !description.value) {
        toast.error("Please fill all fields!", {
            timeout: 2000
        });
        return;
    }

    if (rules.value.some(rule => !rule.oldCode || !rule.newCode || !rule.ruleSet || !rule.ruleName)) {
        toast.error("Please fill all fields in the rules!", {
            timeout: 2000
        });
        return;
    }

    const codeReview = {
        title: title.value,
        description: description.value,
        rules: rules.value
    };

    try {
        downloadCodeReview(codeReview);
        toast.success("Code Review created successfully!", {
            timeout: 2000
        });
        router.push("/");

    } catch (error) {
        toast.error("Error creating code review!", {
            timeout: 2000
        });
    }
};

const downloadCodeReview = (codeReview) => {
    const fileContent = JSON.stringify(codeReview, null, 2);
    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "codeReview.json";
    element.click();
};

</script>