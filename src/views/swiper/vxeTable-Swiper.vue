<template>
    <div class="contain">
        <vxe-table 
        stripe 
        :border="tableBorder" 
        align="center" 
        :loading="loading"
        highlight-current-row
        highlight-hover-row 
        :data="tableData">
            <vxe-column type="seq" width="60" ></vxe-column>
            <vxe-column field="account" title="account" ></vxe-column>
            <vxe-column field="product" title="product" ></vxe-column>
            <vxe-column field="SKU" title="SKU" ></vxe-column>
            <vxe-column field="ASIN" title="ASIN" ></vxe-column>
            <vxe-column field="seller" title="seller"></vxe-column>
            <vxe-column field="developer" title="developer" ></vxe-column>
            <vxe-colgroup field="all_sum" title="all_sum">
                <vxe-column field="sale_amount" title="sale_amount" sortable ></vxe-column>
                <vxe-column field="order_amount" title="order_amount" sortable ></vxe-column>
            </vxe-colgroup>
        </vxe-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                tableBorder: 'false',
                filters:[],
            };
        },
        watch: {},
        computed: {},
        created() {
            this.tableData = new Array(30).fill(0).map((e,i)=>{
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
            this.loading = false
        },
        mounted() { },
        methods: {
            showTooltipMethod({ type, column, row, items, _columnIndex }) {
                // const { property } = column;
                // // 重写默认的提示内容
                //     if (type === 'header') {
                //         return column.title ? '自定义标题提示内容：' + column.title : ''
                //     } else if (type === 'footer') {
                //         return items[_columnIndex] ? '自定义表尾提示内容，\n并且自定义换行：\n' + items[_columnIndex] : ''
                //     }
                //     return row[property] ? '自定义提示内容：' + row[property] : ''
                // // 其余的单元格使用默认行为
                // return null
            },
            conditions(field){
                // console.log(this.tableData.map(e=>{
                //     return e[field]
                // }))
                // return this.tableData.map(e=>{
                //     return e[field]
                // }).map(e=>{
                //     return {
                //         label: e,
                //         value: e
                //     }
                // })
            },
            footerMethod({ columns }) {
                // const footerData = [
                //     columns.map((column, columnIndex) => {
                //         if (columnIndex === 0) {
                //             return '合计'
                //         }
                //         if (['sale_amount'].includes(column.property)) {
                //             return this.tableData.map(e=>{
                //                 return (e.sale_amount*1)
                //             }).reduce((total, curr)=>{
                //                 // console.log((total || 0) *1 ,(curr || 0) *1,(total || 0) *1 + (curr || 0) *1)
                //                 return ((total || 0) *1 + (curr || 0) *1).toFixed(2);
                //             })
                //         }
                //         if (['order_amount'].includes(column.property)) {
                //             return this.tableData.map(e=>{
                //                 return e.order_amount
                //             }).reduce((total, curr)=>{
                //                 // console.log((total || 0) *1 ,(curr || 0) *1,(total || 0) *1 + (curr || 0) *1)
                //                 return (total || 0) *1 + (curr || 0) *1;
                //             })
                //         }
                //         return null
                //     })
                // ]
                // return footerData
            }
        },
    };
</script>
<style>
    .vxe-body--x-space,
    .vxe-body--y-space {
        /* border-color: #ccc; */
    }

    table,
    table.vxe-table--header tr th {
        border: 1px solid #e8eaec;
    }

    table.vxe-table--body tr td:first-child {
        border: 1px solid #e8eaec;
    }

    table.vxe-table--body tr:nth-child(10n) td {
        border-bottom: 1px solid #000;
    }
</style>