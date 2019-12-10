<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          src="../assets/images/logo.png"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-6>
        <h1 class="display-2 font-weight-bold mb-3 mt-2">Prepare seu Kit</h1>
        <p class="subheading font-weight-regular">
          Prepare e baixe seu Kit, ou utilize o instalador automático para
          implantação.
          <br />Se houver dúvidas, nos contate em
          <a href="http://mbd.com.br/suporte" target="_blank">Suporte MBD</a>
        </p>
      </v-flex>

      <v-flex mb-5 xs12 lg8 offset-lg2 justify-center>
        <template>
          <v-card>
            <v-toolbar flat color="blue darken-1" dark>
              <v-flex xs1>
                <v-img
                  src="../assets/images/Sistemasicone-trans.fw_.png"
                  class="mb-5"
                  contain
                  height="100"
                ></v-img>
              </v-flex>
              <v-toolbar-title>Escolha o sistema</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical slider-size="10" slider-color="blue">
              <v-tab v-for="kit in kits" :key="kit.name">
                <v-icon left>{{ kit.tabIcon }}</v-icon
                >{{ kit.name }}</v-tab
              >
              <v-tab-item v-for="kit in kits" :key="kit.name">
                <TabKit :kit="kit"></TabKit>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TabKit from "@/components/TabKit.vue";

export default {
  name: "RequestKitForm",
  components: {
    TabKit
  },
  data() {
    return {};
  },
  computed: {
    kits() {
      return this.$store.state.kits;
    }
  }
};
</script>
