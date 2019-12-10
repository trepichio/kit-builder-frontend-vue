import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kits: {
      SIAC: {
        name: "SIAC",
        tabIcon: "mdi-cart-outline",
        apps: [
          {
            name: "Retaguarda",
            versions: [
              "18.0.2-1209",
              "13.2.1-2588",
              "13.5.9-0001",
              "10.4.4-5877",
              "10.5.12-1478",
              "6.5.12-8888",
              "18.01.30-2591"
            ]
          },
          {
            name: "Pré-Venda",
            versions: [
              "10.12.6-4444",
              "12.1.3-1212",
              "10.13.1-1244",
              "14.5.12-6471",
              "10.12.05-6887",
              "18.6.12-0021",
              "18.05.45-1101"
            ]
          },
          {
            name: "Frente Caixa",
            versions: ["1", "2", "3", "4", "5", "6", "18.00.03-2802"]
          },
          {
            name: "SAT Gerenciador",
            versions: ["1", "2", "3", "4", "5", "6", "18.15.10-0241"]
          }
        ]
      },
      CARDAPIO: {
        name: "CARDAPIO",
        tabIcon: "mdi-silverware-fork-knife",
        apps: [
          {
            name: "Retaguarda",
            versions: ["18.0.2-1209", "13.2.1-2588"]
          },
          {
            name: "Frente Touch",
            versions: ["10.12.6-4444", "12.1.3-1212"]
          },
          {
            name: "Lança Touch",
            versions: ["1", "2", "3", "4", "5", "6", "18.00.03-2802"]
          },
          {
            name: "Frente Caixa",
            versions: ["1", "2", "3", "4", "5", "6", "18.00.03-2802"]
          },
          {
            name: "SAT Gerenciador",
            versions: ["1", "2", "3", "4", "5", "6", "18.15.10-0241"]
          }
        ]
      }
    },
    selectedApps: {}
  },
  getters: {
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
