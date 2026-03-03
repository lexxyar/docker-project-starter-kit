<script setup lang="ts">

import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {useDeleteProfile} from "@/services/Profile.ts"
import {toast} from "vue-sonner"
import {FieldGroup, FieldSet} from "@/components/ui/field"
import FormInput from "@/components/custom/form/FormInput.vue"

const profile = useDeleteProfile()

const handleDeleteProfile = async () => {
  try {
    await profile.submit()
    if (Object.keys(profile.form.errors.value).length === 0) {
      window.location.href = '/'
    }
  } catch (e: any) {
    console.error(e)
    toast.error(e.message)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h4>Delete account</h4>
      <p class="text-muted-foreground">
        Delete your account and all of its resources
      </p>
    </div>

    <div
        class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
    >
      <div class="relative space-y-0.5 text-destructive">
        <p class="font-medium">Warning</p>
        <p class="text-sm">
          Please proceed with caution, this cannot be undone.
        </p>
      </div>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="destructive" data-test="delete-user-button"
          >Delete account
          </Button
          >
        </DialogTrigger>
        <DialogContent>
          <form @submit.prevent="handleDeleteProfile">
            <DialogHeader class="space-y-3">
              <DialogTitle
              >Are you sure you want to delete your
                account?
              </DialogTitle
              >
              <DialogDescription>
                Once your account is deleted, all of its
                resources and data will also be permanently
                deleted. Please enter your password to confirm
                you would like to permanently delete your
                account.
              </DialogDescription>
            </DialogHeader>

            <div class="grid gap-2 mb-4">
              <FieldSet>

                <FieldGroup>
                  <FormInput name="password" label="Password" type="password"
                             :disabled="profile.form.isSubmitting.value"/>
                </FieldGroup>

              </FieldSet>
            </div>

            <DialogFooter class="gap-2">
              <DialogClose as-child>
                <Button variant="secondary">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                  type="submit"
                  variant="destructive"
                  :disabled="profile.form.isSubmitting.value"
                  data-test="confirm-delete-user-button"
              >
                Delete account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>

</style>