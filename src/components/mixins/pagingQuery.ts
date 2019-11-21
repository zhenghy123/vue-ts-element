import { Vue, Component, Provide } from 'vue-property-decorator';

// declare module 'vue/types/vue' {
//   interface Vue {
//     form: Object;
//     handleSubmit(name: any): Promise<any>;
//     handleReset(name: any): void;
//   }
// }

/**
 * 表格，分页查询，单行选择，checkBox选择，sort等
 * mixins
 */
@Component
export default class pagingQuery extends Vue {
  @Provide()
  selectRow: object | null = null; //表格当前选中行
  selectData: Array<any> = []; //表格checkBox勾选数组

  form: Object = {};
  handleSubmit(name: any): Promise<any> {
    return new Promise(resolve => {
      resolve();
    });
  }
  handleReset(name: any): void {
    window.alert(`${name}`);
  }
  /**
   * 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
   */
  currentChange(currentRow: any, oldCurrentRow: any) {}
  /**
   * 当用户手动勾选数据行的 Checkbox 时触发的事件
   */
  select(selection: any, row: Object) {
    this.selectData = selection;
  }
  /**
   * 当用户手动勾选全选 Checkbox 时触发的事件
   */
  selectAll(selection: any) {
    this.selectData = selection;
  }
  /**
   * 当选择项发生变化时会触发该事件
   */
  selectionChange(selection: any) {}
  /**
   * 当某个单元格被点击时会触发该事件
   */
  cellClick(row: any, column: any, cell: any, event: any) {}
  /**
   * 当某一行被点击时会触发该事件
   */
  rowClick(row: any, column: any, event: any) {
    this.selectRow = row;
  }
}
