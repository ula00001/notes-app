<template>
  <div v-if="isLoading">Загрузка данных...</div>
  <div v-else-if="note !== null && note !== undefined" class="note-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Информация о заметке</span>
        <el-button @click="goBack" type="primary" size="small"
          >Назад
        </el-button>
      </div>
      <div class="text item">
        <h2>{{ note.title }}</h2>
        <p>{{ note.content }}</p>
        <p>Дата создания: {{ note.creationDate }}</p>
        <p>Приоритет: {{ note.priority }}</p>
        <p>Дата напоминания: {{ note.reminderDate }}</p>
        <p>Статус: {{ note.completionStatus }}</p>
      </div>
    </el-card>
  </div>
  <div v-else>Заметка не найдена.</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NoteDetail",
  data: () => ({
    note: null,
    isLoading: false,
  }),
  created() {
    this.fetchNote();
  },
  computed: {
    ...mapGetters(["notes"]),
  },
  methods: {
    ...mapActions(["loadNotes"]),
    fetchNote() {
      this.loading(true);
      const noteId = this.$route.params.id;
      this.note = this.notes.find(
        (note) => note.id.toString() === noteId.toString()
      );
      this.loading(false);
    },
    goBack() {
      this.$router.push({ name: "NotesPage" });
    },
    loading(status) {
      this.isLoading = status;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(232,232,232,0.7)",
      });
      if (!status) loading.close();
    },
  },
};
</script>

<style>
.note-detail .el-card {
  margin: 0 auto;
}

.el-card__header .clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-card__header .clearfix span {
  display: block;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
