import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kits: {
      SIAC: {
        name: "SIAC",
        kitVersions: [
          "18.04.20",
          "17.04.13",
          "17.09.29",
          "17.12.01",
          "18.09.20",
          "18.10.31"
        ],
        tabIcon: "mdi-cart-outline",
        apps: [
          {
            name: "Retaguarda",
            versions: [
              "18.10.31-5312",
              "18.10.31-5318",
              "18.10.31-5310",
              "18.10.31-5309",
              "18.10.31-5308",
              "18.10.31-5306",
              "18.10.31-5304",
              "18.10.31-5300",
              "18.10.31-5286",
              "18.10.31-5285",
              "18.10.31-5268",
              "18.10.31-5255",
              "18.10.31-5253",
              "18.10.31-5249",
              "18.10.31-5244",
              "18.04.20-5215",
              "18.04.20-5205",
              "18.04.20-5193",
              "18.04.20-5190",
              "18.04.20-5048",
              "18.03.16-4808"
            ]
          },
          {
            name: "Pre-Venda",
            versions: [
              "18.10.31-5301",
              "18.10.31-5281",
              "18.10.31-5273",
              "18.10.31-5254",
              "18.10.31-5243",
              "18.04.20-5203",
              "18.04.20-5194",
              "18.04.20-5171",
              "18.04.20-5068",
              "18.04.20-5043",
              "18.04.20-4895",
              "18.03.16-4785",
              "18.03.16-4748",
              "18.03.16-4680",
              "18.03.16-4665",
              "18.03.16-4661",
              "18.03.16-4589",
              "17.09.29-4292",
              "17.09.29-4080",
              "17.06.20-4344",
              "17.04.13-3658"
            ]
          },
          {
            name: "Frente",
            versions: [
              "18.10.31-5307",
              "18.10.31-5313",
              "18.10.31-5298",
              "18.10.31-5288",
              "18.10.31-5282",
              "18.10.31-5267",
              "18.10.31-5260",
              "18.10.31-5245",
              "18.04.20-5194",
              "18.04.20-5187",
              "18.04.20-5075",
              "18.04.20-5037",
              "18.04.20-4898",
              "18.03.16-4715",
              "17.12.01-4588"
            ]
          },
          {
            name: "SAT Gerenciador",
            versions: [
              "19.11.30-761",
              "18.10.31-751",
              "17.09.29-511",
              "17.12.01-562",
              "17.12.01-561",
              "17.06.20-477_EPSON",
              "17.04.13-449"
            ]
          }
        ]
      },
      CARDAPIO: {
        name: "CARDAPIO",
        kitVersions: [
          "19.11.30",
          "19.09.30",
          "19.09.30-4448",
          "19.05.31",
          "18.04.16-1",
          "18.04.16-2",
          "18.02.15",
          "17.06.28",
          "19.09.31",
          "18.08.13",
          "17.09.27"
        ],
        tabIcon: "mdi-silverware-fork-knife",
        apps: [
          {
            name: "Retaguarda",
            versions: [
              "19.09.30-4458",
              "19.09.30-4453",
              "19.09.30-4442",
              "19.05.31-4396",
              "19.01.31-4424",
              "19.01.31-4384",
              "19.01.31-4378",
              "19.01.31-4362",
              "18.10.31-4320",
              "18.10.31-4308",
              "18.04.16-4265",
              "18.04.16-4249",
              "18.04.16-4225",
              "18.04.16-4201",
              "18.04.16-4194",
              "18.04.16-4188",
              "18.04.16-4183",
              "18.02.15-4167",
              "18.02.15-4106",
              "18.02.15-4024",
              "18.02.15-4005",
              "18.02.15-4000",
              "18.02.15-3992",
              "18.02.15-3988",
              "17.09.27-3979",
              "17.09.27-3937",
              "17.09.27-3914",
              "17.09.27-3726",
              "17.09.27-3723",
              "17.09.27-3700",
              "17.09.27-3692",
              "17.06.28-3868",
              "17.06.28-3546",
              "19.11.30-4472"
            ]
          },
          {
            name: "Frente Touch",
            versions: [
              "19.11.30-4481",
              "19.11.30-4479",
              "19.11.30-4479",
              "19.09.30-4456",
              "19.09.30-4455",
              "19.09.30-4451",
              "19.09.30-4448",
              "19.05.31-4397",
              "19.01.31-4372",
              "18.10.31-4346",
              "18.10.31-4316",
              "18.10.31-4305",
              "18.04.16-4223",
              "18.04.16-4216"
            ]
          },
          {
            name: "Lança-Touch",
            versions: [
              "19.09.30-4466",
              "19.05.31-4414",
              "18.10.31-4303",
              "18.04.16-4217",
              "18.04.16-4162",
              "18.02.15-4110",
              "18.02.15-4073",
              "18.02.15-3985",
              "17.09.27-3911",
              "17.09.27-3591",
              "17.06.28-3872",
              "17.06.28-3504"
            ]
          },
          {
            name: "Frente",
            versions: [
              "19.10.31-4440", //TODO: filename @ftp is wrong, needs to be renamed over there
              "19.05.31-4391",
              "19.01.31-4424",
              "19.01.31-4384",
              "19.01.31-4376",
              "19.01.31-4373",
              "18.10.31-4309",
              "18.10.31-4307",
              "18.04.16-4324",
              "18.04.16-4292",
              "18.04.16-4264",
              "18.04.16-4235"
            ]
          },
          {
            name: "SAT Gerenciador",
            versions: [
              "19.11.30-761",
              "18.10.31-751",
              "18.10.31-736",
              "18.04.16-597",
              "18.02.15-566",
              "17.09.29-511",
              "17.09.27-552",
              "17.09.27-528",
              "17.06.28-477",
              "17.06.28-469"
            ]
          }
        ]
      }
    },
    selectedApps: {},
    selectedKitVersion: {
      SIAC: "",
      CARDAPIO: ""
    }
  },
  getters: {
    kitVersions: state => {
      return state.kitVersions;
    },
    selectedApps: state => {
      return state.selectedApps;
    },
    kits: state => {
      return state.kits;
    }
  },
  mutations: {
    updateSelectedApps(state, { apps, kit }) {
      for (const app in apps) {
        state.selectedApps[kit][app].selected = apps[app];
      }
    },
    loadSelectedApps(state, { apps, kit }) {
      state.selectedApps = Object.assign({}, state.selectedApps, {
        [kit]: apps
      });
    },
    updateSelectedAppsVersion(state, { apps, kit }) {
      for (const app in apps) {
        state.selectedApps[kit][app].version = apps[app];
      }
    },
    updateSelectedKitVersion(state, { kitVersion, kitName }) {
      state.selectedKitVersion[kitName] = kitVersion;
    }
  },
  actions: {
    setSelectedApp({ commit }, payload) {
      commit("updateSelectedApps", payload);
    },
    setSelectedAppVersion({ commit }, payload) {
      commit("updateSelectedAppsVersion", payload);
    },
    // eslint-disable-next-line no-unused-vars
    loadSelectedAppsObj({ commit }, kit) {
      let payload = {};

      for (const { name } of kit.apps) {
        payload[name] = { name, version: "", selected: false };
        // payload[name] = {};
      }
      commit("loadSelectedApps", { kit: kit.name, apps: payload });
    }
  },
  modules: {}
});
