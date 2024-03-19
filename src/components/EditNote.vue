<template>
  <el-dialog
    title="Shipping address"
    :visible="editDialogVisible"
    :show-close="false"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Заголовок" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="Содержание" prop="content">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="Дата создания" required>
        <el-form-item prop="creationDate">
          <el-date-picker
            type="date"
            placeholder="выберите"
            v-model="ruleForm.creationDate"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="Приоритет" prop="priority">
        <el-input v-model="ruleForm.priority"></el-input>
      </el-form-item>
      <el-form-item label="Дата напоминания" required>
        <el-form-item prop="reminderDate">
          <el-date-picker
            type="date"
            placeholder="выберите"
            v-model="ruleForm.reminderDate"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="Статус выполнения" prop="completionStatus">
        <el-input v-model="ruleForm.completionStatus"></el-input>
      </el-form-item>
      <div>
        <el-button type="danger" size="small" @click="changeEditDialogVisible()"
          >Отмена
        </el-button>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')"
          >Сохранить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "EditNote",
  props: {
    note: Object,
    changeEditDialogVisible: Function,
    handleSaveEditedNote: Function,
    editDialogVisible: Boolean,
  },
  watch: {
    note: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.ruleForm = { ...newVal };
        }
      },
    },
  },
  data: () => ({
    ruleForm: {
      id: "",
      title: "",
      content: "",
      creationDate: "",
      priority: "",
      reminderDate: "",
      completionStatus: "",
    },
    rules: {
      title: [
        {
          required: true,
          message: "Поле не должен быть пустым",
          trigger: "blur",
        },
      ],
      content: [
        {
          required: true,
          message: "Поле не должен быть пустым",
          trigger: "change",
        },
      ],
      creationDate: [
        {
          required: true,
          message: "Поле не должен быть пустым",
          trigger: "change",
        },
      ],
      priority: [
        {
          required: true,
          message: "Поле не должен быть пустым",
          trigger: "blur",
        },
      ],
      reminderDate: [
        {
          required: true,
          message: "Поле не должен быть пустым",
          trigger: "change",
        },
      ],
      completionStatus: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
    },
  }),
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.reminderDate = dayjs(this.ruleForm.reminderDate).format(
            "YYYY-MM-DD"
          );
          this.ruleForm.creationDate = dayjs(this.ruleForm.creationDate).format(
            "YYYY-MM-DD"
          );
          this.handleSaveEditedNote(this.ruleForm, "edit");
          this.changeEditDialogVisible();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.ruleForm = {
        id: "",
        title: "",
        content: "",
        creationDate: "",
        priority: "",
        reminderDate: "",
        completionStatus: "",
      };
    },
  },
};
</script>

<style scoped></style>
