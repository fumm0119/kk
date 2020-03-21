

export default function (url) {
  if (!url) {
    url = window.location.href;
  }

  let temp = url.split('#');

  if (temp[0].indexOf('?') >= 0) {
    temp[0] = temp[0].split('?');
  } else if (temp[1] && temp[1].indexOf('?') >= 0) {
    temp[0] = temp[1].split('?');
  } else {
    temp[0] = temp[0].split('?');
  }

  let query = {};
  let queryStr = temp[0][1];

  if (queryStr) {
    queryStr = queryStr.split('&');
    $(queryStr).each(function (index, item) {
      let _temp = item.split('=');
      query[_temp[0]] = decodeURIComponent(_temp[1]);
    });
  }

  return query;
}