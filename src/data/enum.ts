import state from '@/store/state';

const enumData = {
  getEnumname(code: any, type: string, defaultname: string = '') {
    // console.log('t', type);
    // if (code) {
    let list = (this as any)[type];
    // if (type === 'sourceCode') {
    //取日志查询在vuex中的来源
    // console.log('sssssssssss', state.source);
    // list = state.source;
    // }
    // console.log(list);

    for (let i = 0; i < list.length; i++) {
      if (list[i].code == code) {
        return list[i].name;
      }
      // }
    }
    return code;
    // return defaultname;
  },
  // 生产状态
  statusProduct: [
    { name: '待生产', code: 0 },
    { name: '生产完成', code: 1 },
    { name: '生产中', code: 2 },
    { name: '生产失败', code: 3 }
  ],
  // 分发状态
  statusDist: [
    { name: '待分发', code: 0 },
    { name: '分发成功', code: 1 },
    { name: '分发中', code: 2 },
    { name: '分发失败', code: 3 }
  ],
  // 来源
  sourceCode: [
    { name: '用户上传', code: 1 },
    { name: '赛事直播拆条', code: 2 },
    { name: '开路直播拆条', code: 3 },
    { name: '点播拆条', code: 4 }
  ],
  //
  GkStatus: [
    { name: '注入媒资失败', code: 1 },
    { name: '注入媒资成功（预审核中）', code: 2 },
    { name: '预审核失败', code: 3 },
    { name: '预审核通过（转码中）', code: 4 },
    { name: '转码失败', code: 5 },
    { name: '转码成功', code: 6 },
    { name: '播控审核失败', code: 7 },
    { name: '播控审核通过', code: 8 },
    { name: '已下线', code: 9 },
    { name: '已发布', code: 10 },
    { name: '下载图片失败', code: 11 }
  ]
  // 工作组-code待定 输入下拉查询并选择或直接下拉选择
  // groups: [
  //   { name: '这是默认工作组1', code: 0 },
  //   { name: '这是默认工作组2', code: 1 }
  // ],
  // 任务名称-code待定 下拉选择，与工作组联动
  // taskName: [
  //   { name: '我和工作组联动1', code: 0 },
  //   { name: '我和工作组联动2', code: 1 }
  // { name: '现场直播拆条', code: 1 },
  // { name: '开路直播拆条', code: 1 }
  // ]
};
export default enumData;
