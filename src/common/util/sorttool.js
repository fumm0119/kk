
import $ from 'jquery';
const SORT_UP = 'UP';
const SORT_DOWN = 'DOWN';

export default {

  /**
   * 对象排序
   * @param obj 字段 升降序
   * */
  sortByStr(obj, columnStr, except, derc) {
    let tempArr = [];
    let results = {};
    //对象放入数组
    $.map(obj, (item, key) => {
      tempArr.push(item);
    });

    tempArr = insertSortStr(tempArr, columnStr, derc);

    //排除以下币种，不排序
    if (_.isArray(except)) {
      except.forEach(coin => {
        results[coin] = obj[coin];
      });
    }
    //放回对象
    tempArr.forEach(item => {
      results[item[columnStr]] = item;
    });
    return results;


    //依据字符串排序
    function insertSortStr(array, key, sortBy) {
      /*start根据已排列好的项数决定*/
      let start = 0;
      /*按顺序，每一项检查已排列好的序列*/
      for (let i = start; i < array.length; start++, i++) {
        /*跟已排好序的序列做对比，并插入到合适的位置*/
        for (let j = 0; j < start; j++) {
          /*小于或者等于时（我们是升序）插入到该项前面*/
          if (array[i][key] <= array[j][key]) {
            array.splice(j, 0, array[i]);
            /*删除原有项*/
            array.splice(i + 1, 1);
            break;
          }
        }

      }
      if (sortBy === SORT_DOWN) {
        array = array.reverse();
      }
      return array;
    }

    function log(list) {
      $.map(list, (item, index) => {
        console.log(JSON.stringify(item));
      });
    }
  }
}
