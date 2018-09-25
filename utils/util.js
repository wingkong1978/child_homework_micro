const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const o2s = function (o) { try { return JSON.stringify(o); } catch (ex) { } };
const s2o = function (s) { try { return JSON.parse(s); } catch (ex) { } };

module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  o2s:o2s,
  s2o:s2o,
}
