import { BASEURL_STATIC } from "@/service/service";

export function formateDate(d: string) {
  const date = new Date(d);
  const year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonth() 返回的月份是从 0 开始的，所以我们需要加 1
  let day = date.getDate();

  // 如果月份或日期是一位数，我们需要在前面加上 0，以满足 YYYY-MM-DD 的格式
  if (month < 10) {
    month = Number("0" + month);
  }
  if (day < 10) {
    day = Number("0" + day);
  }

  return year + "-" + month + "-" + day;
}

export function getPicUrl(url: string) {
  return BASEURL_STATIC+url.split('\\').pop();
}
