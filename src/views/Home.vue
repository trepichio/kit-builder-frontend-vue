<template>
  <div class="home">
    <RequestKitForm />
  </div>
</template>

<script>
// @ is an alias to /src
import RequestKitForm from "@/components/RequestKitForm.vue";

export default {
  name: "home",
  components: {
    RequestKitForm
  }
};
</script>
