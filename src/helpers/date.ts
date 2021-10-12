const getDate = (): string => {
  const fixedDate = (x: string) => {
    const y: string = '0' + x;
    return +x < 10 ? y : x;
  };
  const d = new Date();
  let date = fixedDate(`${d.getDate()}`);
  let month = fixedDate(`${1 + d.getMonth()}`);
  const year = d.getFullYear();
  let hour = fixedDate(`${d.getHours()}`);
  let minutes = fixedDate(`${d.getMinutes()}`);

  return `${hour}:${minutes} ${+date}.${+month}.${year}`;
};

export default getDate;
