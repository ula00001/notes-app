<template>
  <div>
    <h1>Сервис по заметкам</h1>
    <el-row type="flex" justify="end">
      <el-button @click="handleAddNote" type="primary" size="small"
        >Добавить заметку
      </el-button>
    </el-row>
    <el-table
      v-loading="isLoading"
      :data="
        notes.filter(
          (data) =>
            !search ||
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.content.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      stripe
      :empty-text="'Пусто'"
      @row-click="handleRowClick"
      class="notes-table"
    >
      <el-table-column label="Заголовок" prop="title"></el-table-column>
      <el-table-column label="Содержание" prop="content"></el-table-column>
      <el-table-column
        label="Дата создания"
        prop="creationDate"
      ></el-table-column>
      <el-table-column label="Приоритет" prop="priority"></el-table-column>
      <el-table-column
        label="Дата напоминания"
        prop="reminderDate"
      ></el-table-column>
      <el-table-column
        label="Статус выполнения"
        prop="completionStatus"
      ></el-table-column>
      <el-table-column align="right">
        {{ /* eslint-disable-next-line vue/no-unused-vars */ }}
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="поиск" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click.stop="handleEdit(scope.$index, scope.row)"
            ><i class="el-icon-edit"></i>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddNote
      :dialogVisible="dialogVisible"
      :handleAddNote="this.handleAddNote"
    />
    <template v-if="note">
      <EditNote
        :note="note"
        :changeEditDialogVisible="changeEditDialogVisible"
        :editDialogVisible="editDialogVisible"
        :handleSaveEditedNote="handleSaveEditedNote"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddNote from "@/components/AddNote.vue";
import EditNote from "@/components/EditNote.vue";

export default {
  name: "NotesList",
  components: { AddNote, EditNote },
  data: () => ({
    search: "",
    dialogVisible: false,
    editDialogVisible: false,
    edit: false,
    note: null,
  }),
  computed: {
    ...mapGetters(["notes", "isLoading"]),
  },
  created() {
    // Инициируем загрузку данных
    this.loadNotes();
  },
  methods: {
    ...mapActions(["deleteNote", "loadNotes", "addNote", "editNote"]),
    handleEdit(index, row) {
      this.note = this.notes.find((note) => note.id === row.id);
      this.changeEditDialogVisible();
    },
    changeEditDialogVisible() {
      this.editDialogVisible = !this.editDialogVisible;
    },
    updateNote(notes, id, updatedProperties) {
      const newNotes = notes.map((note) => {
        if (note.id === id) {
          return { ...note, ...updatedProperties };
        }

        return note;
      });

      this.editNote(newNotes);
    },
    handleSaveEditedNote(note) {
      this.updateNote(this.notes, note.id, note);
    },
    handleDelete(index, row) {
      this.deleteNote(row.id);
    },
    handleRowClick(row) {
      this.$router.push({ name: "NoteDetail", params: { id: row.id } });
    },
    handleAddNote(ruleForm, operation = "") {
      this.dialogVisible = !this.dialogVisible;
      if (operation === "add") this.addNote(ruleForm);
    },
  },
};
</script>

<style>
.notes-table tr {
  cursor: pointer;
}
</style>
