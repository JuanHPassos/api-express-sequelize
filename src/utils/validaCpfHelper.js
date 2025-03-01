module.exports = (cpf) => {
  // Verifica se é string, o tamanho e se só possui letras/numeros.
  if (typeof cpf !== 'string' || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
    return false;
  }

  // Verifica se todos os números são iguais (ex: "11111111111")
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let verificacao = 0;
  // Calcula soma para verificação do primeiro digito
  for(let i = 10; i >= 2; i--) {
    verificacao += Number(cpf[10 - i]) * i;
  }
  
  // Primeira verificação
  if(((verificacao*10)%11)%10 !== Number(cpf[9])) return false;
  
  verificacao = 0;
  // Calcula soma para verificação do segundo digito
  for(let i = 11; i >= 2; i--) {
    verificacao += Number(cpf[11 - i]) * i;
  }

  // Segunda verificação
  if(((verificacao*10)%11)%10 !== Number(cpf[10])) return false;
  
  return true;
};