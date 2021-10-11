const getDate = (): string => {
  const d = new Date();
  let date = `${1 + d.getDate()}`;
  let month = `${1 + d.getMonth()}`;
  const year = d.getFullYear();
  let hour = `${d.getHours()}`;
  let minutes = `${d.getMinutes()}`;

  if (+date < 10) {
    date = '0' + date;
  }
  if (+month < 10) {
    month = '0' + month;
  }
  if (+hour < 10) {
    hour = '0' + hour;
  }
  if (+minutes < 10) {
    minutes = '0' + minutes;
  }
  return `${hour}:${minutes} ${+date}:${+month}:${year}`;
};

export default getDate;
