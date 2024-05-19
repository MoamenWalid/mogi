
const getCurrentTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return `${ year }/${ month }/${ day } in ${ hours }:${ minutes }:${ seconds }`;
}

export { getCurrentTime };