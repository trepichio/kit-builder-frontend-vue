<template>
  <v-card flat>
    <v-card-text>
      <v-row align="center">
        <v-form
          :ref="'form-' + kit.name"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <template>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="5">
                  <v-subheader>Versão do Banco de Dados: </v-subheader>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="selectedKitVersion"
                    :items="sortedKitVersions"
                    append-outer-icon="mdi-database"
                    menu-props="auto"
                    hide-details
                    label="Selecione"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <v-text-field
            v-model="installPath"
            :rules="nameRules"
            label="Caminho da instalação"
            placeholder="C:\"
            outlined
            clearable
            hint="Indique o caminho onde irá descompactar/instalar o Kit. Deixe em branco para utilizar o padrão."
            append-icon="mdi-folder"
          ></v-text-field>

          <template>
            <v-container fluid>
              <v-row justify="space-around">
                <v-checkbox
                  v-model="selectedValidas"
                  label="Vai emitir NFe? (VALIDAXML3)"
                  value="VALIDAXML3"
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedValidas"
                  label="Vai emitir Manifesto? (ValidaMDFe)"
                  value="ValidaMDFe"
                ></v-checkbox>
              </v-row>
            </v-container>
          </template>

          <v-radio-group v-model="local" row>
            <v-radio label="Servidor" :value="true"></v-radio>
            <v-radio label="Terminal" :value="false"></v-radio>
          </v-radio-group>

          <v-text-field
            v-if="!local"
            v-model="iporhost"
            label="Ip ou Hostname da máquina Servidor"
            outlined
            clearable
            hint="Insira um IP ou Hostname válido. Será utilizado para parametrizar o Kit."
            append-icon="mdi-ip"
            @click:append="whatIsMyIP"
          ></v-text-field>

          <v-container fluid>
            <v-row align="center" v-for="{ name } in kit.apps" :key="name">
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="selectedAppName[name]"
                  inset
                  :label="name"
                  @change="setLatest(name)"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedAppVersion[name]"
                  :items="sortedVersions[name]"
                  label="Versão"
                  chips
                  :hint="`Qual versão do ${name}?`"
                  no-data-text="Sem dados disponíveis."
                  :disabled="!selectedAppName[name]"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid>
            <v-select
              v-model="selectedEquips"
              :items="equipamentos"
              label="Equipamentos"
              multiple
            >
              <template v-slot:prepend-item>
                <v-list-item ripple @click="toggle">
                  <v-list-item-action>
                    <v-icon
                      :color="
                        selectedEquips.length > 0 ? 'indigo darken-4' : ''
                      "
                      >{{ icon }}</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Selecionar Todos</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:append-item>
                <v-divider class="mb-2"></v-divider>
                <v-list-item disabled>
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon>mdi-printer</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content v-if="selectAllEquip">
                    <v-list-item-title
                      >É recomendado selecionar apenas o
                      necessário.</v-list-item-title
                    >
                  </v-list-item-content>

                  <v-list-item-content v-else-if="selectSomeEquip">
                    <v-list-item-title>Quantidade: </v-list-item-title>
                    <v-list-item-subtitle>{{
                      selectedEquips.length
                    }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content v-else>
                    <v-list-item-title>
                      Vai instalar um SAT, impressora, leitor ou outro
                      equipamento?
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Vá em frente e selecione o instaladores que desejar acima!
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
          </v-container>

          <v-radio-group v-model="showCNPJ" row>
            <v-radio
              label="Sem informações do Cliente"
              :value="false"
            ></v-radio>
            <v-radio label="Com informações do Cliente" :value="true"></v-radio>
          </v-radio-group>

          <v-card color="blue darken-1 mb-4" dark v-if="showCNPJ === true">
            <v-card-title class="headline orange lighten-1">
              Busca por CNPJ
            </v-card-title>
            <v-card-text>
              Busque aqui os dados necessários para o cadastro da empresa nos
              sistemas a implantar
            </v-card-text>
            <v-card-text>
              <v-autocomplete
                v-model="model"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                color="white"
                hide-no-data
                hide-selected
                item-text="Description"
                item-value="CNPJ"
                label="Clientes cadastrados"
                placeholder="Começe a digitar um CNPJ para buscar"
                prepend-icon="mdi-database-search"
                return-object
                hint="Insira um CNPJ válido. Será verificado a existência na nossa base de dados."
              ></v-autocomplete>
            </v-card-text>
            <v-divider></v-divider>
            <v-expand-transition>
              <v-list v-if="model" align="justify" class="light-blue lighten-3">
                <v-list-item v-for="(field, i) in fields" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="field.value"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="field.key"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expand-transition>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!model"
                color="grey darken-3"
                @click="model = null"
              >
                Limpar
                <v-icon right>mdi-close-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >Baixar Kit</v-btn
          >

          <v-btn :disabled="!valid" color="blue" class="mr-4" @click="validate"
            >Instalar Kit</v-btn
          >

          <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

          <v-btn color="warning" @click="resetValidation"
            >Reset Validation</v-btn
          >
        </v-form>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TabKit",
  props: {
    kit: Object
  },
  data: () => ({
    selectedAppName: {},
    selectedAppVersion: {},
    // selectedApps: {
    //   Retaguarda: {
    //     name: "Retaguarda",
    //     version: null,
    //     selected: false
    //   },
    //   "Pré-Venda": {
    //     name: "Pré-Venda",
    //     version: null,
    //     selected: false
    //   },
    //   "Frente Caixa": {
    //     name: "Frente Caixa",
    //     version: null,
    //     selected: false
    //   },
    //   "SAT Gerenciador": {
    //     name: "SAT Gerenciador",
    //     version: null,
    //     selected: false
    //   }
    // },
    showCNPJ: false,
    selectedEquips: [],
    equipamentos: ["Bematech", "Epson", "Argox"],
    installPath: "",
    iporhost: "",
    local: true,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),
  computed: {
    selectedApps() {
      return this.$store.getters.selectedApps[this.kit.name];
    },
    sortedVersions() {
      let sorted = {};
      for (const { name, versions } of this.kit.apps) {
        sorted[name] = versions;
        sorted[name].sort(this.$compareVersions).reverse();
      }
      return sorted;
    },
    selectAllEquip() {
      return this.selectedEquips.length === this.equipamentos.length;
    },
    selectSomeEquip() {
      return this.selectedEquips.length > 0 && !this.selectAllEquip;
    },
    icon() {
      if (this.selectAllEquip) return "mdi-close-box";
      if (this.selectSomeEquip) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    }
  },
  methods: {
    setLatest(name) {
      // this.selectedApp.map(obj =>
      //   obj.version ? obj : (obj.version = this.sortedVersions[name][0])
      // )
      this.$set(this.selectedAppVersion, name, this.sortedVersions[name][0]);

      // this.selectedAppVersion[name] = this.sortedVersions[name][0];

      // this.selectedVersion = this.sortedVersions[name][0]

      this.$store.dispatch("setSelectedAppVersion", {
        apps: { [name]: this.sortedVersions[name][0] },
        kit: this.kit.name
      });
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllEquip) {
          this.selectedEquips = [];
        } else {
          this.selectedEquips = this.equipamentos.slice();
        }
      });
    },
    whatIsMyIP() {
      this.iporhost = "ip_teste";
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      // fetch("https://api.publicapis.org/entries")
      fetch("http://192.168.87.131:3000/entries")
        .then(res => res.json())
        .then(res => {
          // const { count, entries } = res;
          // this.count = count;
          // this.entries = entries;
          this.count = 1;
          this.entries = res;
        })
        .catch(err => {
          //TODO: MAKE AN ALERT
          console.warn(err);
        })
        .finally(() => (this.isLoading = false));
    },
    selectedAppVersion: {
      handler(values) {
        this.$store.dispatch("setSelectedAppVersion", {
          apps: { ...values },
          kit: this.kit.name
        });
        return values;
      },
      deep: true
    },
    selectedAppName: {
      handler(values) {
        this.$store.dispatch("setSelectedApp", {
          apps: { ...values },
          kit: this.kit.name
        });
      },
      deep: true
    }
  },
  created() {
    this.$store.dispatch("loadSelectedAppsObj", this.kit);
  }
};
</script>

<style lang="scss" scoped></style>
