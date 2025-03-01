module.exports = (cpf) => {
  return (cpf.length !== 11) ? false : true;
};