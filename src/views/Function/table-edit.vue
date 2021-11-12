<template>
    <div class="contain">
        <div class="base-table-contain">
            <vxe-toolbar ref="xToolbar" custom>
                <template #buttons>
                    <vxe-button @click="showEdit = !showEdit">Add</vxe-button>
                    <!-- getCheckboxRecords()获取选中的行 -->
                    <vxe-button @click="editRowEvent($refs.xTable.getCheckboxRecords()[0])">Edit</vxe-button>
                    <vxe-button @click="deleteRowEvent">Delete</vxe-button>
                    <vxe-button>Edit All</vxe-button>
                    <vxe-button @click="deleteRowEvent(null)">Delete All</vxe-button>
                </template>
                <template #tools></template>
            </vxe-toolbar>
            <vxe-table ref="xTable" stripe :border="tableConfig.border" align="center" :loading="tableConfig.loading"
                :height="tableConfig.height" highlight-current-row highlight-hover-row :data="tableData" keep-source
                :edit-config="{ trigger: 'click', mode: 'row' ,autoClear: false,showUpdateStatus: true, showInsertStatus: true}">
                <vxe-column type="seq" width="160" fixed="left"></vxe-column>
                <vxe-column type="checkbox" width="160" fixed="left"></vxe-column>
                <div v-for="(col,i) in tableConfig.column" :key="i">
                    <vxe-column :field="col.field" :title="col.title" :width="col.width" :edit-render="col.editConfig">
                    </vxe-column>
                </div>
                <vxe-column field="options" title="edit" width="260" fixed="right">
                    <template #default="{ row }">
                        <template v-if="$refs.xTable.isActiveByRow(row)">
                            <vxe-button type="text" icon="el-icon-circle-check" @click="saveRowEvent(row)"></vxe-button>
                            <vxe-button type="text" icon="el-icon-circle-close" @click="cancelRowEvent(row)">
                            </vxe-button>
                        </template>
                        <template v-else>
                            <vxe-button type="text" icon="el-icon-edit-outline" @click="editRowEvent(row)"></vxe-button>
                            <vxe-button type="text" icon="el-icon-delete" @click="deleteRowEvent(row)"></vxe-button>
                        </template>
                    </template>
                </vxe-column>
            </vxe-table>
        </div>
        <div class="base-form-contain">
            <vxe-modal ref="xModal" v-model="showEdit" title="新增数据" width="800" resize destroy-on-close>
                <template #default>
                    <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100"
                        @submit="submitEvent">
                        <div v-for="(formItem,i) in tableConfig.column" :key="i">
                            <vxe-form-item :title="formItem.title" field="formItem.field" span="12"
                                :item-render="formItem.editConfig"></vxe-form-item>
                        </div>
                        <vxe-form-item align="center" span="24">
                            <template #default>
                                <vxe-button type="submit" status="primary">保存</vxe-button>
                                <vxe-button type="reset">重置</vxe-button>
                                <vxe-button @click="$refs.xModal.close()">取消</vxe-button>
                            </template>
                        </vxe-form-item>
                    </vxe-form>
                </template>
            </vxe-modal>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableConfig: {
                    loading: true,
                    border: "false",
                    height: 660,
                    column: [
                        { field: 'name', title: 'name', width: '250', editConfig: { name: 'input', attrs: { type: 'text', placeholder: '请输入昵称' } } },
                        { field: 'age', title: 'age', width: '250', editConfig: { name: 'input', attrs: { type: 'number', placeholder: '请输入年龄' } } },
                        { field: 'sex', title: 'sex', width: '250', editConfig: { name: '$select', options: [{ label: '男', value: '1' }, { label: '女', value: '0' }] } },
                        { field: 'birthday', title: 'birthday', width: '250', editConfig: { name: '$input', props: { type: 'date', placeholder: '请选择日期' } } },
                        { field: 'deposit', title: 'deposit', width: '250', editConfig: { name: '$input', props: { type: 'float', digits: 2 } } },
                        { field: 'introduce', title: 'introduce', width: '250', editConfig: { name: 'textarea', attrs: { placeholder: '请输入个人简介', default: '本人很懒，暂无简介' } } }
                    ]
                },
                tableData: [],
                showEdit: false,
            };
        },
        watch: {},
        computed: {},
        created() {
            this.tableData = new Array(10).fill(0).map((e, i) => {
                let index = i + 1;
                return {
                    id: index,
                    name: 'user' + index,
                    age: 18,
                    sex: Math.round(Math.random()),
                    birthday: Number((Math.random() * 40).toFixed(0)) + 1970 + '-' + (Math.random() * 13).toFixed(0) + '-' + (Math.random() * 29).toFixed(0),
                    deposit: Number((Math.random() * 1000000).toFixed(2)),
                    introduce: '本人很懒，暂无简介'
                };
            });
            this.tableData.map(e => {
                // new Date(e.birthday).getFullYear() : 月份12时会错误
                e.age = Number(new Date().getFullYear() - Number(e.birthday.split('-')[0]))
            })
            this.tableConfig.loading = false;
            this.$nextTick(() => {
                this.$refs.xTable.connect(this.$refs.xToolbar);
            });
        },
        mounted() { },
        methods: {
            optMessage() {
                const $table = this.$refs.xTable
                //getRecordset():{insertRecords[],removeRecords[],updateRecords[]}
                const { insertRecords, removeRecords, updateRecords } = $table.getRecordset();
                const msg = '新增' + insertRecords.length + '条数据，删除了' + removeRecords.filter(e => !e.$event).length + '条数据，更改了' + updateRecords.length + '条数据'
                // console.log(insertRecords)
                // updateRecords.map(e=>{
                //     console.log(e.$event)
                // })
                this.$message({
                    message: msg
                })
            },
            // delete
            deleteRowEvent(row) {
                console.log(row)
                const $table = this.$refs.xTable
                // 删除当前行或者删除选中行或者清空数据
                // getCheckboxRecords(isFull) 
                $table.removeCheckboxRow() && $table.remove(row)
                // this.$message({
                //     // 获取删除的数据
                //     message: '删除数据:--'+JSON.stringify($table.getRemoveRecords())
                // })
                this.optMessage()
            },
            // edit active
            editRowEvent(row) {
                console.log(row)
                const $table = this.$refs.xTable;
                $table.setActiveRow(row);
            },
            // save edit
            saveRowEvent() {
                const $table = this.$refs.xTable;
                $table.clearActived().then(() => {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        // this.$XModal.message({ content: '保存成功！', status: 'success' })
                    }, 300);
                });
                // this.$message({
                //     // 获取修改的数据 ，只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据
                //     message: '修改数据:--'+JSON.stringify($table.getUpdateRecords())
                // })
                this.optMessage();
            },
            // cancel edit
            cancelRowEvent(row) {
                const $table = this.$refs.xTable;
                $table.clearActived().then(() => {
                    // 还原行数据 ，只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据
                    $table.revertData(row);
                });
            },
        },
    };
</script>
<style>
    .contain {
        background-color: #fff;
    }

    .contain-fullscreen {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .vxe-buttons--wrapper {
        text-align: left;
    }

    table,
    table.vxe-table--header tr th {
        border: 1px solid #e8eaec;
        background: #fff;
    }

    table.vxe-table--body-wrapper {
        transition: all 1s ease;
    }

    table.vxe-table--body tr td:first-child,
    table.vxe-table--body tr td:nth-child(2) {
        border: 1px solid #e8eaec;
    }

    table.vxe-table--body tr:nth-child(10n) td {
        border-bottom: 1px solid #000;
    }

    .vxe-cell button {
        height: 18px;
    }
</style>