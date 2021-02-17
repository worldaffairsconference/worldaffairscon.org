function importAll(r) {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('../img/staff', false, /\.(png|jpe?g|svg)$/)
);

export default images;
