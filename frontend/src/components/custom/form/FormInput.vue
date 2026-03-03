<script setup lang="ts">
import {v4} from "uuid";
import {Input} from '@/components/ui/input';
import type {TInputProps, TLabelProps} from "@/types";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field"
import {Field as VeeField} from 'vee-validate'

const props = withDefaults(defineProps<TInputProps & TLabelProps & {
  label?: string,
  name: string,
  description?: string,
}>(), {
  id: () => v4(),
  type: 'text',
  required: false,
  disabled: false,
  hasError: false,
  autofocus: false,
})
</script>

<template>
  <VeeField v-slot="{ field, errors }" :name="props.name">
    <Field :data-invalid="!!errors.length">
      <FieldLabel v-if="props.label !== ''"
                  :for="props.id"
      >
        {{ props.label }}
      </FieldLabel>
      <FieldDescription v-if="props.description && props.description.length > 0">
        {{ props.description }}
      </FieldDescription>
      <Input :id="props.id"
             :type="props.type"
             :placeholder="props.placeholder"
             v-bind="field"
             :aria-invalid="!!errors.length"
             :required="props.required"
             :disabled="props.disabled"
             :autofocus="props.autofocus"
             :autocomplete="props.autocomplete"
             v-model="field.value"
      />
      <FieldError :errors="errors"/>
    </Field>
  </VeeField>

  <!--  <div>-->
  <!--    <Label v-if="props.label !== ''"-->
  <!--           :has-error="containErrors"-->
  <!--           :for-id="props.id"-->
  <!--    >-->
  <!--      {{ props.label }}-->
  <!--    </Label>-->
  <!--    <div class="mt-2">-->
  <!--      <Input v-model="model"-->
  <!--             :id="props.id"-->
  <!--             :type="props.type"-->
  <!--             :required="props.required"-->
  <!--             :disabled="props.disabled"-->
  <!--             :placeholder="props.placeholder"-->
  <!--             :class="props.class"-->
  <!--             :hasError="props.hasError"-->
  <!--             :autocomplete="props.autocomplete"-->
  <!--             :autofocus="props.autofocus"-->
  <!--      />-->
  <!--    </div>-->
  <!--    <InputError :errors="props.errors"/>-->
  <!--  </div>-->
</template>

<style scoped>

</style>
