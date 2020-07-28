import moment from 'moment';

const ONE_MINITUE = 60;
const ONE_HOUR = 3600;
// The number of milliseconds in one day
const ONE_DAY = 1000 * 60 * 60 * 24;

/**
 * 选择项：最近7天、昨天、今天
 */
export const getRecentTimeOpts = () => {
  const curTime = new Date().getTime();

  const today = moment(curTime).format('YYYY-MM-DD');
  const tomorrow = moment(curTime)
    .add(1, 'days')
    .format('YYYY-MM-DD');
  const lastWeek = moment(curTime)
    .subtract(6, 'days')
    .format('YYYY-MM-DD');
  const yesterday = moment(curTime)
    .subtract(1, 'days')
    .format('YYYY-MM-DD');

  return [
    {
      start: lastWeek,
      end: tomorrow,
      name: '最近7天',
    },
    {
      start: yesterday,
      end: today,
      name: '昨天',
    },
    {
      start: today,
      end: tomorrow,
      name: '今天',
    },
  ];
};

/**
 * 时间值两位格式化
 *
 * Input: 7
 * Output: 07
 */

export const formatTwoDigit = (value: number) => {
  return value > 10 ? value : `0${value}`;
};

/**
 * 将秒转化为时分秒格式
 *
 * Input: 70秒
 * Output:  00 时 01 分 10 秒
 */
export const formatSeconds = (seconds = 0) => {
  const hour = Math.floor(seconds / ONE_HOUR);
  let remains = seconds % ONE_HOUR;

  const minute = Math.floor(remains / ONE_MINITUE);
  remains = remains % ONE_MINITUE;

  return `${formatTwoDigit(hour)}:${formatTwoDigit(minute)}:${formatTwoDigit(remains)}`;
};

/**
 * 计算两个日期之间的时间差值
 *
 * @param startDate 格式：2020-04-30 开始时间
 * @param endDate 格式：2020-05-01 结束时间
 */
export const diffDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  if (startTime >= endTime) {
    return 0;
  } else {
    return Math.round(Math.abs((endTime - startTime) / ONE_DAY));
  }
};
