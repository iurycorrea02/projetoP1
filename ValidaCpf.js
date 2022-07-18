module.exports = class ValidaCpf {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: false,
      configurable: false,
      //Retirando os caracteres especiais a partir de uma expressão regular
      value: cpfEnviado.replace(/\D+/g, '')
    })
  }

  eSequencia() {
    return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
  }

  //Concatena tudo
  geraNovoCpf() {
    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito01 = ValidaCpf.geraDigito(cpfParcial)
    const digito02 = ValidaCpf.geraDigito(cpfParcial + digito01)
    this.novoCPF = cpfParcial + digito01 + digito02
  }

  //Gera os digitos para validação 2 ultimos -> Utilizando um método estático
  static geraDigito(cpfSemDigitos) {
    let total = 0
    let reverso = cpfSemDigitos.length + 1

    for (let numerico of cpfSemDigitos) {
      total += reverso * Number(numerico)
      reverso--
    }
    const digito = 11 - (total % 11)
    return digito <= '9' ? String(digito) : '0'
  }

  valida() {
    if (!this.cpfLimpo) return false
    if (typeof this.cpfLimpo !== 'string') return false
    if (this.cpfLimpo.length !== 11) return false
    if (this.eSequencia()) return false

    this.geraNovoCpf()

    return this.novoCPF === this.cpfLimpo
  }
}
