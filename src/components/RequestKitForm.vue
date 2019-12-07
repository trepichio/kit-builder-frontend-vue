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
                  class="my-3"
                  contain
                  height="100"
                ></v-img>
              </v-flex>
              <v-toolbar-title>Escolha o sistema</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical slider-size="10" slider-color="blue">
              <v-tab> <v-icon left>mdi-cart-outline</v-icon>SIAC</v-tab>
              <v-tab>
                <v-icon left>mdi-silverware-fork-knife</v-icon>CARDAPIO
              </v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <p>
                      Formulario do SIAC
                    </p>

                    <p class="mb-0">
                      Cras sagittis. Phasellus nec sem in justo pellentesque
                      facilisis. Proin sapien ipsum, porta a, auctor quis,
                      euismod ut, mi. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nam at tortor in
                      tellus interdum sagittis.
                    </p>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <p>
                      Formulario do Cardapio
                    </p>

                    <p class="mb-0">
                      Cras sagittis. Phasellus nec sem in justo pellentesque
                      facilisis. Proin sapien ipsum, porta a, auctor quis,
                      euismod ut, mi. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nam at tortor in
                      tellus interdum sagittis.
                    </p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "RequestKitForm",
  components: {}
};
</script>
