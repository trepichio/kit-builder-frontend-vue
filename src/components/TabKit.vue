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
            :rules="installPathRules"
            label="Caminho da instalação"
            :placeholder="installPathDefault"
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
            <v-radio label="Hostname" :value="true"></v-radio>
            <v-radio label="IP" :value="false"></v-radio>
          </v-radio-group>

          <v-text-field
            v-if="local"
            v-model="hostname"
            label="Hostname da máquina Servidor"
            outlined
            clearable
            hint="Insira um Hostname válido. Será utilizado para parametrizar o Kit."
            :rules="hostnameRules"
            :hide-details="!local"
          >
          </v-text-field>

          <v-text-field
            v-if="!local"
            v-model="ip"
            label="Ip da máquina Servidor"
            outlined
            clearable
            hint="Insira um IP válido. Será utilizado para parametrizar o Kit."
            :rules="ipRules"
            placeholder="127.0.0.1"
            :autofocus="!local"
          >
            <template v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon @click="whatIsMyIP" v-on="on">mdi-ip</v-icon>
                </template>
                No Chrome, talvez precise DESABILITAR a flag em
                chrome://flags/#enable-webrtc-hide-local-ips-with-mdns
              </v-tooltip>
            </template>
          </v-text-field>

          <v-container fluid>
            <v-row align="center" v-for="{ name } in kit.apps" :key="name">
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="selectedAppName[name]"
                  inset
                  :label="name"
                  @change="setLatest(name)"
                  :disabled="selectedKitVersion === '0.0.0.0'"
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

          <v-radio-group v-model="searchCNPJ" row>
            <v-radio
              label="Sem informações do Cliente"
              :value="false"
            ></v-radio>
            <v-radio label="Com informações do Cliente" :value="true"></v-radio>
          </v-radio-group>

          <v-card color="blue darken-1 mb-4" dark v-if="!searchCNPJ">
            <v-card-title class="headline orange lighten-1">
              Entrada de dados do Cliente
            </v-card-title>
            <v-card-text>
              Insira manualmente os dados para o cadastro da empresa nos
              sistemas a implantar
            </v-card-text>
            <v-divider></v-divider>
            <v-col cols="12" class="light-blue lighten-3">
              <v-row align="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="CNPJ"
                    :counter="20"
                    :rules="cnpjRules"
                    label="CNPJ"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="razaoSocial"
                    :counter="60"
                    :rules="razaoSocialRules"
                    label="Razão Social"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="fantasia"
                    :counter="60"
                    :rules="fantasiaRules"
                    label="Fantasia"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="ie"
                    :counter="14"
                    :rules="ieRules"
                    label="I.E."
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="2">
                  <v-text-field
                    v-model="cep"
                    :rules="cepRules"
                    label="CEP"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-select
                    v-model="uf"
                    :items="estados"
                    :rules="[v => !!v || 'UF is required']"
                    label="UF"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="IBGE"
                    :rules="ibgeRules"
                    label="IBGE"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="cidade"
                    :counter="60"
                    :rules="cidadeRules"
                    label="Cidade"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="endereco"
                    :counter="60"
                    :rules="enderecoRules"
                    label="Endereço"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="numero"
                    :counter="5"
                    :rules="numeroRules"
                    label="Número"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="complemento"
                    :counter="22"
                    :rules="complementoRules"
                    label="Complemento"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="bairro"
                    :counter="60"
                    :rules="bairroRules"
                    label="Bairro"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="telefone"
                    :counter="12"
                    :rules="telefoneRules"
                    label="Telefone"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="fax"
                    :counter="10"
                    :rules="telefoneRules"
                    label="FAX"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="4">
                  <v-text-field
                    v-model="contato"
                    :counter="28"
                    :rules="contatoRules"
                    label="Contato"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="email"
                    :counter="60"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card>

          <v-card color="blue darken-1 mb-4" dark v-else>
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
    selectedValidas: [],
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
    searchCNPJ: false,
    selectedEquips: [],
    selectedKitVersion: "0.0.0.0",
    equipamentos: ["Bematech", "Epson", "Argox"],
    installPath: "",
    installPathDefault: "C:\\MBD",
    hostname: "",
    ip: "",
    local: true,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    customerInfo: null,
    search: null,
    valid: null,
    CNPJ: "",
    razaoSocial: "",
    fantasia: "",
    ie: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    IBGE: "",
    cep: "",
    telefone: "",
    fax: "",
    contato: "",
    suframa: "",
    im: "",
    email1: "",
    email2: "",
    email3: "",
    site: "",
    serie_certificado: "",
    ie_tipo: "",
    estados: [
      { value: "AC", text: "AC - Acre" },
      { value: "AL", text: "AL - Alagoas" },
      { value: "AP", text: "AP - Amapá" },
      { value: "AM", text: "AM - Amazonas" },
      { value: "BA", text: "BA - Bahia" },
      { value: "CE", text: "CE - Ceará" },
      { value: "DF", text: "DF - Distrito Federal" },
      { value: "ES", text: "ES - Espírito Santo" },
      { value: "GO", text: "GO - Goiás" },
      { value: "MA", text: "MA - Maranhão" },
      { value: "MT", text: "MT - Mato Grosso" },
      { value: "MS", text: "MS - Mato Grosso do Sul" },
      { value: "MG", text: "MG - Minas Gerais" },
      { value: "PA", text: "PA - Pará" },
      { value: "PB", text: "PB - Paraíba" },
      { value: "PR", text: "PR - Paraná" },
      { value: "PE", text: "PE - Pernambuco" },
      { value: "PI", text: "PI - Piauí" },
      { value: "RJ", text: "RJ - Rio de Janeiro" },
      { value: "RN", text: "RN - Rio Grande do Norte" },
      { value: "RS", text: "RS - Rio Grande do Sul" },
      { value: "RO", text: "RO - Rondônia" },
      { value: "RR", text: "RR - Roraima" },
      { value: "SC", text: "SC - Santa Catarina" },
      { value: "SP", text: "SP - São Paulo" },
      { value: "SE", text: "SE - Sergipe" },
      { value: "TO", text: "TO - Tocantins" }
    ],
    installPathRules: [
      value =>
        value.match(
          /^[A-Za-z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$/g
        ) ||
        value === "" ||
        "Not a valid path"
    ],
    hostnameRules: [
      value =>
        value.match(
          /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/g
        ) ||
        value === "" ||
        "Not a valid Hostname"
    ],
    ipRules: [
      value =>
        value.match(
          /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g
        ) ||
        value === "" ||
        "Not a valid IP"
    ]
  }),
  computed: {
    selectedApps() {
      return this.$store.getters.selectedApps[this.kit.name];
    },
    sortedKitVersions() {
      const kitVersions = this.kit.kitVersions.map(v =>
        this.$semver.valid(this.$semver.coerce(v, true))
      );
      console.log("TCL: sortedKitVersions -> kitVersions", kitVersions);
      let sorted = {};
      sorted = kitVersions.sort(this.$compareVersions).reverse();
      // return kitVersions;
      return sorted;
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
    async whatIsMyIP() {
      const ipv4 = await this.$getIPv4();
      console.log("TCL: whatIsMyIP -> ipv4", ipv4);
      if ((!ipv4 || ipv4 === "") && this.$browserDetect.isChrome)
        this.ip =
          "Acesse chrome://flags/#enable-webrtc-hide-local-ips-with-mdns E DESABILITE!";
      else this.ip = ipv4;
    },
    validate() {
      if (this.$refs["form-" + this.kit.name].validate()) {
        this.valid = true;
        const iPath =
          this.installPath === "" ? this.installPathDefault : this.installPath;

        // eslint-disable-next-line no-unused-vars
        const [fullPath, driverLetter, path] = iPath.match(
          /(^[A-Za-z]:)\\((?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$)/
        );

        let doKit = {};

        if (this.searchCNPJ) {
          doKit = {
            CNPJ: this.customerInfo.CNPJ,
            kitVersion: this.selectedKitVersion,
            kitName: this.kit.name,
            customerName: this.customerInfo["RAZAO SOCIAL"],
            rootDir: path,
            driverLetter: driverLetter,
            server: this.hostname !== "" ? this.hostname : this.ip,
            CustomerRegistration: this.customerInfo,
            validas: this.selectedValidas
            // test: true
          };
        } else {
          doKit = {
            CNPJ: this.CNPJ,
            kitVersion: this.selectedKitVersion,
            kitName: this.kit.name,
            customerName: this.razaoSocial,
            rootDir: path,
            driverLetter: driverLetter,
            server:
              !this.iporhost || this.iporhost === ""
                ? "127.0.0.1"
                : this.iporhost,
            CustomerRegistration: {
              CNPJ: this.CNPJ,
              ["RAZAO SOCIAL"]: this.razaoSocial,
              CONTATO: this.contato,
              FANTASIA: this.fantasia,
              IE: this.ie,
              ENDERECO: this.endereco,
              N: this.numero,
              COMPLEMENTO: this.complemento,
              BAIRRO: this.bairro,
              CIDADE: this.cidade,
              UF: this.uf,
              CEP: this.cep,
              TELEFONE: this.telefone,
              FAX: this.fax,
              IBGE: this.IBGE,
              IE_TIPO: this.ie_tipo,
              SUFRAMA: this.suframa,
              IM: this.im,
              EMAIL1: this.email1,
              EMAIL2: this.email2,
              EMAIL3: this.email3,
              SITE: this.site,
              SERIE_CERTIFICADO: this.serie_certificado,
              Descricao: this.CNPJ + " - " + this["RAZAO SOCIAL"]
            },
            validas: this.selectedValidas
            // test: true
          };
        }

        this.$store.dispatch("sendKitRequest", doKit);
      }
    },
    reset() {
      this.$refs["form-" + this.kit.name].reset();
    },
    resetValidation() {
      this.$refs["form-" + this.kit.name].resetValidation();
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
