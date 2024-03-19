import Vue from "vue";
import Vuex from "vuex";
import { initialNotes } from "@/utils/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: initialNotes,
    isLoading: false,
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    ADD_NOTE(state, note) {
      state.notes.push(note);
    },
    DELETE_NOTE(state, noteId) {
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },
    EDIT_NOTE(state, notes) {
      state.notes = notes;
    },
  },
  actions: {
    // Имитация задержки загрузки
    loadNotes({ commit }) {
      commit("SET_LOADING", true);
      setTimeout(() => {
        commit("SET_LOADING", false);
      }, 700);
    },

    addNote({ commit }, note) {
      const data = { ...note, id: Date.now() };
      commit("ADD_NOTE", data);
    },
    deleteNote({ commit }, noteId) {
      commit("DELETE_NOTE", noteId);
    },
    editNote({ commit }, notes) {
      commit("EDIT_NOTE", notes);
    },
  },
  getters: {
    notes: (state) => state.notes,
    isLoading: (state) => state.isLoading,
  },
});
