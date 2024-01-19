<template>
  <div class="d-flex flex-wrap justify-sm-space-between">
    <template v-for="(option, i) in options" :key="'item_' + i">
      <div class="option" :class="{ selected: (i + 1).toString() === localModel }" @click="selectTh(i + 1)">
        <v-img :src="option" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getThList } from '@/helpers/th-helper';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const localModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function selectTh(th: number) {
  localModel.value = th.toString();
}

const options = getThList();
</script>

<style scoped>
.option {
  border: #afafaf 1px solid;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}
.selected {
  background-color: white;
}
</style>
