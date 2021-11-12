<template>
    <div class="contain">
        <div class="sale_board">
            <vxe-toolbar ref="xToolbar" custom>
                <template #buttons></template>
                <template #tools>
                    <vxe-button icon="vxe-icon--zoomin" class="fullscreen-btn"
                        @click="isSaleBoardFullScreen = !isSaleBoardFullScreen" circle></vxe-button>
                </template>
            </vxe-toolbar>
            <vxe-table ref="xtable" resizable stripe show-overflow :border="tableBorder" align="center"
                :loading="loading" :height="tableHeight" :data="tableData"
                show-footer :footer-method="footerMethod"
                :tooltip-config="{ showAll: true, enterable: true, contentMethod: showTooltipMethod, }">
                <vxe-column type="seq" title="序号排名" width="15%" fixed="left"></vxe-column>
                <vxe-column field="account" title="账号" width="20%" :filters="conditions('account')"></vxe-column>
                <vxe-column field="product" title="产品名" width="20%" :filters="conditions('product')"></vxe-column>
                <vxe-column field="SKU" title="Seller SKU" width="20%" :filters="conditions('SKU')"></vxe-column>
                <vxe-column field="ASIN" title="ASIN" width="20%" :filters="conditions('ASIN')"></vxe-column>
                <vxe-column field="seller" title="销售人员" width="20%" :filters="conditions('seller')"></vxe-column>
                <vxe-column field="developer" title="开发人员" width="20%" :filters="conditions('developer')">
                </vxe-column>
                <vxe-colgroup field="all_sum" title="整体合计">
                    <vxe-column field="sale_amount" title="销售量" width="20%" sortable
                        :filters="conditions('sale_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="订单金额" width="20%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                </vxe-colgroup>
            </vxe-table>
        </div>
        <div class="sale_goal">
            <vxe-toolbar ref="myToolbar" custom>
                <template #buttons></template>
                <template #tools>
                    <vxe-button icon="vxe-icon--zoomin" class="fullscreen-btn"
                        @click="isSaleGoalFullScreen = !isSaleGoalFullScreen" circle>
                    </vxe-button>
                </template>
            </vxe-toolbar>
            <vxe-table ref="mytable" resizable stripe show-overflow :border="tableBorder" show-footer
                :footer-method="footerMethod" align="center"
                :loading="loading" :height="tableHeight" :data="tableData"
                :tooltip-config="{ showAll: true, enterable: true, contentMethod: showTooltipMethod, }">
                <!-- <vxe-column type="seq" width="60" fixed="left"></vxe-column> -->
                <vxe-column field="account" title="销售" width="100" :filters="conditions('account')"></vxe-column>
                <vxe-colgroup field="goal" title="目标">
                    <vxe-column field="sale_amount" title="销售金额" width="15%" sortable
                        :filters="conditions('sale_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利额" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利率" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                </vxe-colgroup>
                <vxe-colgroup field="goal" title="累计运营数据（时间进度xx%）">
                    <vxe-column field="sale_amount" title="销售金额（完成进度）" width="15%" sortable
                        :filters="conditions('sale_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利额" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利率" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利率差异" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                </vxe-colgroup>
                <vxe-colgroup field="goal" title="当天运营数据">
                    <vxe-column field="sale_amount" title="销售金额" width="15%" sortable
                        :filters="conditions('sale_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利额" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利率" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                    <vxe-column field="order_amount" title="毛利率差异" width="15%" sortable
                        :filters="conditions('order_amount')"></vxe-column>
                </vxe-colgroup>
            </vxe-table>
            <vxe-pager background :current-page.sync="page.currentPage" :page-size.sync="page.pageSize"
                :page-sizes="page.pageSizes" :total="page.totalResult" @page-change="handlePageChange" 
                :layouts="['PrevJump','PrevPage','JumpNumber','NextPage','NextJump','Sizes','FullJump','Total',]">
            </vxe-pager>
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
                tableBorder: "false",
                isSaleBoardFullScreen: false,
                isSaleGoalFullScreen: false,
                filters: [],
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100, 150],
                    totalResult: 30,
                },
                scrollHeight: 0,
                scrollWidth: 0,
                animateId: 0,
            };
        },
        watch: {
            isSaleBoardFullScreen(newV, oldV) {
                this.$nextTick(() => {
                    let el = document.querySelector(".sale_board");
                    if (newV) {
                        this.fullscreen(el);
                        document.querySelector(".fullscreen-btn i").setAttribute("class", "vxe-button--icon vxe-icon--zoomout");
                        el.setAttribute("class", el.getAttribute("class") + " contain-fullscreen");
                    } else {
                        this.notFullscreen(document);
                        document.querySelector(".fullscreen-btn i").setAttribute("class", "vxe-button--icon vxe-icon--zoomin");
                        el.setAttribute("class", el.getAttribute("class").split(" ").slice(0, -1).join(" "));
                    }
                });
            },
            isSaleGoalFullScreen(newV, oldV) {
                this.$nextTick(() => {
                    let el = document.querySelector(".sale_goal");
                    if (newV) {
                        this.fullscreen(el);
                        document.querySelector(".fullscreen-btn i").setAttribute("class", "vxe-button--icon vxe-icon--zoomout");
                        el.setAttribute("class", el.getAttribute("class") + " contain-fullscreen");
                    } else {
                        this.notFullscreen(document);
                        document.querySelector(".fullscreen-btn i").setAttribute("class", "vxe-button--icon vxe-icon--zoomin");
                        el.setAttribute("class", el.getAttribute("class").split(" ").slice(0, -1).join(" "));
                    }
                });
            },
        },
        computed: {},
        created() {
            this.tableData = new Array(30).fill(0).map((e, i) => {
                return {
                    id: 1000 + i,
                    account: "admin" + i,
                    product: "product" + i,
                    SKU: "SKU" + i,
                    ASIN: "ASIN" + i,
                    seller: "seller" + i,
                    developer: "developer" + i,
                    sale_amount: (Math.random() * 1000).toFixed(2),
                    order_amount: (Math.random() * 100).toFixed(0),
                };
            });
            this.loading = false;
            this.$nextTick(function () {
                this.$refs.mytable.connect(this.$refs.myToolbar);
                this.$refs.xtable.connect(this.$refs.xToolbar);
            });
        },
        mounted() {
            this.$nextTick(function () {
                setTimeout(() => {
                    this.autoRoll();
                }, 7000);
            });
        },
        beforeDestory() {
            cancelAnimationFrame(this.animateId);
            this.animateId = 0;
        },
        methods: {
            // 全屏
            fullscreen(el) {
                if (el.requestFullscreen) {
                    console.log("full");
                    el.requestFullscreen();
                } else if (el.msRequestFullscreen) {
                    el.msRequestFullscreen();
                } else if (el.mozRequestFullscreen) {
                    el.mozRequestFullscreen();
                } else if (el.webkitRequestFullscreen) {
                    el.webkitRequestFullscreen();
                }
            },
            // 非全屏
            notFullscreen(el) {
                console.log("exit");
                if (el.exitFullscreen) {
                    el.exitFullscreen();
                } else if (el.msExitFullscreen) {
                    el.msExitFullscreen();
                } else if (el.mozCancelFullScreen) {
                    el.mozCancelFullScreen();
                } else if (el.webkitExitFullscreen) {
                    el.webkitExitFullscreen();
                }
            },

            initRollData() {
                this.scrollHeight = this.$refs.mytable.getScroll().scrollTop;
                this.scrollWidth = this.$refs.mytable.getScroll().scrollLeft;
            },
            // 自动滚动
            autoRoll() {
                const rowHeight = document.querySelector(".vxe-body--row").offsetHeight; //50
                const pageHeight = rowHeight * this.page.pageSize;
                this.initRollData();
                const lastPageTop =
                    pageHeight *
                    (Math.ceil(this.page.totalResult / this.page.pageSize) - 1);

                let lineScroll = () => {
                    this.initRollData();
                    if (this.scrollHeight.toFixed(0) == lastPageTop)
                        setTimeout(() => {
                            requestAnimationFrame(lineScroll);
                        }, 7000);
                    // Do whatever
                    this.scrollHeight =
                        Math.ceil(this.scrollHeight / rowHeight) < this.page.totalResult - 10
                            ? (Math.floor(this.scrollHeight / rowHeight) + 1) * rowHeight
                            : 0;
                    //scrollToRow(row, fieldOrColumn)
                    document
                        .querySelector(".vxe-table--body-wrapper")
                        .scrollTo(this.scrollWidth, this.scrollHeight);
                    if (this.scrollHeight.toFixed(0) % pageHeight == 0)
                        setTimeout(() => {
                            this.animateId = requestAnimationFrame(lineScroll);
                        }, 7000);
                    else
                        setTimeout(() => {
                            this.animateId = requestAnimationFrame(lineScroll);
                        }, 1000);
                };

                let pageScroll = () => {
                    this.initRollData();
                    // Do whatever
                    this.scrollHeight =
                        Math.ceil(this.scrollHeight / pageHeight) < 2
                            ? (Math.floor(this.scrollHeight / pageHeight) + 1) * pageHeight
                            : 0;
                    document
                        .querySelector(".vxe-table--body-wrapper")
                        .scrollTo(this.scrollWidth, this.scrollHeight);
                    if (this.scrollHeight.toFixed(0) % pageHeight == 0)
                        setTimeout(() => {
                            this.animateId = requestAnimationFrame(pageScroll);
                        }, 5000);
                    else this.animateId = requestAnimationFrame(pageScroll);
                };

                // this.animateId = requestAnimationFrame(lineScroll);

                this.animateId = requestAnimationFrame(pageScroll);
            },
            showTooltipMethod({ type, column, row, items, _columnIndex }) {
                const { property } = column;
                // 重写默认的提示内容
                if (type === "header") {
                    return column.title ? "自定义标题提示内容：" + column.title : "";
                } else if (type === "footer") {
                    return items[_columnIndex]
                        ? "自定义表尾提示内容，\n并且自定义换行：\n" + items[_columnIndex]
                        : "";
                }
                return row[property] ? "自定义提示内容：" + row[property] : "";
                // 其余的单元格使用默认行为
                return null;
            },
            conditions(field) {
                return [...new Set(this.tableData.map((e) => e[field]))].map((e) => {
                    return {
                        label: e,
                        value: e,
                    };
                });
            },
            footerMethod({ columns }) {
                const footerData = [
                    columns.map((column, columnIndex) => {
                        if (columnIndex === 0) {
                            return "合计";
                        }
                        if (["sale_amount"].includes(column.property)) {
                            return this.tableData
                                .map((e) => {
                                    return e.sale_amount * 1;
                                })
                                .reduce((total, curr) => {
                                    return ((total || 0) * 1 + (curr || 0) * 1).toFixed(2);
                                });
                        }
                        if (["order_amount"].includes(column.property)) {
                            return this.tableData
                                .map((e) => {
                                    return e.order_amount;
                                })
                                .reduce((total, curr) => {
                                    return (total || 0) * 1 + (curr || 0) * 1;
                                });
                        }
                        return null;
                    }),
                ];
                return footerData;
            },
        },
    };
</script>
<style>
    :root {
        --dark-table-th-color: #0d2d3c;
        --dark-table-row1-color: #215a76;
        --dark-table-row2-color: #79aec8;
        --font-base-size: 14px;
        --table-line-color: #e8eaec;
        --page-line-color: #fff;
    }

    * {
        font-size: var(--font-base-size);
        padding: 0;
        margin: 0;
    }

    .contain {
        background-color: #fff;
        width: 100%;
        display: grid;
        grid-template-columns: 40% 60%;
        grid-column-gap: 14px;
    }

    .contain * {
        /* width: 50%; */
    }

    .contain-fullscreen {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .vxe-buttons--wrapper {
        text-align: left;
    }

    .vxe-body--x-space,
    .vxe-body--y-space {
        /* border-color: #ccc; */
    }

    .sale_board .vxe-table--body-wrapper.body--wrapper {
        /* overflow-y: hidden ; */
    }

    table,
    table.vxe-table--header tr th {
        /* border: 1px solid var(--table-line-color); */
        background: var(--dark-table-th-color);
        color: #fff;
    }

    table.vxe-table--body tr {
        /* background-color: var(--dark-table-row1-color); */
        color: #fff;
    }

    table.vxe-table--body tr.row--stripe {
        background: var(--dark-table-row1-color) !important;
    }


    table.vxe-table--body-wrapper {
        transition: all 1s ease;
    }

    table.vxe-table--body tr td {
        border: 0px;
        outline: none;
    }

    table.vxe-table--body tr td:first-child {
        /* border: 1px solid var(--table-line-color); */
    }

    table.vxe-table--body tr:nth-child(10n) td {
        border-bottom: 1px solid var(--page-line-color);
    }
</style>