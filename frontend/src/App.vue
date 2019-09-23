<template lang="pug">
  div
    v-app#inspire(dark)
      notifications(group="notify" position="top left")
      router-view
</template>

<script>
export default {
  name: "App"
};
</script>
