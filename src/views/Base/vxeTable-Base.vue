<template>
    <div class="contain">
        <!-- 增删改查，表头固定，列固定 -->
        <div class="base-table-contain">
            <vxe-toolbar ref="xToolbar" custom>
                <template #buttons>
                    <vxe-input placeholder="查询" prefix-icon="vxe-icon--search" clearable></vxe-input>
                    <vxe-button status="primary" content="查询"></vxe-button>
                    <vxe-button icon="vxe-icon--plus" status="danger" content="新增" @click="showDialog = !showDialog">
                    </vxe-button>
                </template>
                <template #tools>

                </template>
            </vxe-toolbar>
            <vxe-table ref="mytable" stripe :border="tableBorder" align="center" :loading="loading"
                :height="tableHeight" highlight-current-row highlight-hover-row :data="tableData" show-footer
                :footer-method="footerMethod"
                :tooltip-config="{showAll: true, enterable: true, contentMethod: showTooltipMethod}">
                <vxe-column type="seq" width="60" fixed="left"></vxe-column>
                <vxe-column field="account" title="account" width="140" :filters="conditions('account')"></vxe-column>
                <vxe-column field="product" title="product" width="240" :filters="conditions('product')"></vxe-column>
                <vxe-column field="SKU" title="SKU" width="180" :filters="conditions('SKU')"></vxe-column>
                <vxe-column field="ASIN" title="ASIN" width="140" :filters="conditions('ASIN')"></vxe-column>
                <vxe-column field="seller" title="seller" width="220" :filters="conditions('seller')"></vxe-column>
                <vxe-column field="developer" title="developer" width="200" :filters="conditions('developer')">
                </vxe-column>
                <vxe-colgroup field="all_sum" title="all_sum">
                    <vxe-column field="sale_amount" title="sale_amount" width="240" sortable
                        :filters="conditions('sale_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="order_amount" width="240" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                </vxe-colgroup>
                <vxe-column field="edit" title="edit" width="260" fixed="right">
                    <template custom>
                        <vxe-button icon="vxe-icon--minus" size="mini" content="删除" type="text"></vxe-button>
                        <vxe-button icon="el-icon-check" size="mini" content="修改" type="text"></vxe-button>
                    </template>
                </vxe-column>
            </vxe-table>
            <vxe-pager background :current-page.sync="page.currentPage" :page-size.sync="page.pageSize"
                :page-sizes="page.pageSizes" :total="page.totalResult" @page-change="handlePageChange"
                :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
            </vxe-pager>
        </div>
        <div class="table-data-dialog">
            <vxe-modal v-model="showDialog" title="新增数据" width="600" :position="{top: 200, left: 200}">
                <template #default>
                    <vxe-form :data="formData" @submit="searchEvent" @reset="resetEvent">
                        <vxe-form-item title="account" field="account" :item-render="{}">
                            <template #default="{ data }">
                                <vxe-input v-model="data.account" placeholder="请输入账号" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="product" field="product" :item-render="{}">
                            <template #default="{ data }">
                                <vxe-input v-model="data.product" placeholder="请输入产品" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="SKU" field="SKU" :item-render="{}">
                            <template #default="{ data }">
                                <vxe-input v-model="data.SKU" placeholder="请输入SKU" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="ASIN" field="ASIN" :item-render="{}">
                            <template #default="{ data }">
                                <vxe-input v-model="data.ASIN" placeholder="请输入ASIN" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="seller" field="seller" :item-render="{}" >
                            <template #default="{ data }">
                                <vxe-input v-model="data.seller" placeholder="请输入卖家" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="developer" field="developer" :item-render="{}" >
                            <template #default="{ data }">
                                <vxe-input v-model="data.developer" placeholder="请输入开发员" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="sale_amount" field="sale_amount" :item-render="{}" >
                            <template #default="{ data }">
                                <vxe-input v-model="data.sale_amount" placeholder="请输入销售额" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item title="order_amount" field="order_amount" :item-render="{}">
                            <template #default="{ data }">
                                <vxe-input v-model="data.order_amount" placeholder="请输入订单量" clearable></vxe-input>
                            </template>
                        </vxe-form-item>
                        <vxe-form-item>
                            <template #default>
                                <vxe-button type="submit" status="primary">添加</vxe-button>
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
                loading: true,
                tableData: [],
                tableHeight: 670,
                tableBorder: 'false',
                filters: [],
                showDialog: false,
                formData: {
                    id: 0,
                    account: '',
                    product: '',
                    SKU: '',
                    ASIN: '',
                    seller: '',
                    developer: '',
                    sale_amount: 0,
                    order_amount: 0
                },
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100, 150],
                    totalResult: 30
                },
                scrollHeight: 0,
                scrollWidth: 0
            };
        },
        watch: {},
        computed: {},
        created() {
            this.tableData = new Array(30).fill(0).map((e, i) => {
                return {
                    id: 1000 + i,
                    account: 'admin' + i,
                    product: 'product' + i,
                    SKU: 'SKU' + i,
                    ASIN: 'ASIN' + i,
                    seller: 'seller' + i,
                    developer: 'developer' + i,
                    sale_amount: (Math.random() * 1000).toFixed(2),
                    order_amount: (Math.random() * 100).toFixed(0),
                }
            })
            this.loading = false;
            this.$nextTick(function () {
                this.$refs.mytable.connect(this.$refs.xToolbar);
            })
        },
        mounted() {
            this.$nextTick(function () {
            })
        },
        methods: {
            showTooltipMethod({ type, column, row, items, _columnIndex }) {
                const { property } = column;
                // 重写默认的提示内容
                if (type === 'header') {
                    return column.title ? '自定义标题提示内容：' + column.title : ''
                } else if (type === 'footer') {
                    return items[_columnIndex] ? '自定义表尾提示内容，\n并且自定义换行：\n' + items[_columnIndex] : ''
                }
                return row[property] ? '自定义提示内容：' + row[property] : ''
                // 其余的单元格使用默认行为
                return null
            },
            conditions(field) {
                return [...new Set(this.tableData.map(e => e[field]))].map(e => {
                    return {
                        label: e,
                        value: e
                    }
                })
            },
            footerMethod({ columns }) {
                const footerData = [
                    columns.map((column, columnIndex) => {
                        if (columnIndex === 0) {
                            return '合计'
                        }
                        if (['sale_amount'].includes(column.property)) {
                            return this.tableData.map(e => {
                                return (e.sale_amount * 1)
                            }).reduce((total, curr) => {
                                // console.log((total || 0) *1 ,(curr || 0) *1,(total || 0) *1 + (curr || 0) *1)
                                return ((total || 0) * 1 + (curr || 0) * 1).toFixed(2);
                            })
                        }
                        if (['order_amount'].includes(column.property)) {
                            return this.tableData.map(e => {
                                return e.order_amount
                            }).reduce((total, curr) => {
                                // console.log((total || 0) *1 ,(curr || 0) *1,(total || 0) *1 + (curr || 0) *1)
                                return (total || 0) * 1 + (curr || 0) * 1;
                            })
                        }
                        return null
                    })
                ]
                return footerData
            },
            funnelEvent() {
                this.$message({
                    duration: 3000,
                    message: '点击事件'
                })
            },
            handlePageChange({ type, currentPage, pageSize }) {
                console.log(type)  //current ,size
            }
        },
    };
</script>
<style>
    .vxe-buttons--wrapper {
        text-align: left;
    }

    .vxe-body--x-space,
    .vxe-body--y-space {
        /* border-color: #ccc; */
    }

    table,
    table.vxe-table--header tr th {
        border: 1px solid #e8eaec;
        background: #fff;
    }

    table.vxe-table--body-wrapper {
        transition: all 1s ease;
    }

    table.vxe-table--body tr td:first-child {
        border: 1px solid #e8eaec;
    }

    table.vxe-table--body tr:nth-child(10n) td {
        border-bottom: 1px solid #000;
    }

    .vxe-cell button {
        height: 18px;
    }

    .vxe-form--item .vxe-form--item-title {
        width: 150px;
        text-align: right;
    }

    .vxe-form--item {
        /* display: block; */
        width: 100%;
        text-align: center;
    }

    .vxe-form--item-content .vxe-input {
        width: 80%;
    }
</style>