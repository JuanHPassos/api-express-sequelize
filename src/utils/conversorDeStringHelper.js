module.exports = (objetoParams) => {
  for(let propriedade in objetoParams) {
    // Usa expressão regular para verificar existencia dessas strings
    if (/Id|id/.test(propriedade)) {
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
  }
  return objetoParams;
};