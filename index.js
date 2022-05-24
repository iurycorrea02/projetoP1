const prompt = require('prompt-sync')();

num2 = Math.random() * (10 - 1) + 1

clienteNovo = [{nome:'' ,produto:'' ,saida:'' ,chegada:'',preco:'' }]
resultados = []
sergipe = ['Sara']
entregas = { 
                nome:'Marcos',
                produto:'tomadas',
                saida:'MG',
                chegada:'Pará', 
                preco: num2
            },
            {
                nome:'Sara', 
                produto:'lenços',
                saida:'Sergipe',
                chegada:'Piauí', 
                preco: num2
            },
            {
                nome:'Valéria', 
                produto:'chuveiro',
                saida:'Acre',
                chegada:'Paraíba', 
                preco: num2.toFixed(2)
            }


listaResultados = [{nome: 'Marcos',produto:'tomadas'},
                   {nome:'Sara', produto:'lenços'},
                   {nome:'Valéria', produto:'chuveiro'}]

function arrumacao() {
    
    console.log('         <<< BEM VINDO AOS CORREIOS >>>')
    
} 

function cadastro(){
    let formatoClienteNovo = Object.create(null)

    let nomeRecebido = prompt('Nome:')
    let produtoRecebido = prompt('Produto:')
    let saidaRecebida = prompt('Estado de saida:')
    let chegadaRecebida = prompt('Estado de chegada:')
    let precoRecebido = num2.toFixed(2) 

    formatoClienteNovo.nome = nomeRecebido

    formatoClienteNovo.produto = produtoRecebido

    formatoClienteNovo.saida = saidaRecebida

    formatoClienteNovo.chegada = chegadaRecebida

    formatoClienteNovo.preco = precoRecebido

    clienteNovo.push(formatoClienteNovo)
    console.log(`Seu Frete custara: ${precoRecebido}`)
    
    

    if(clienteNovo[saidaRecebida] == 'SE'){
      sergipe.append(clienteNovo[nomeRecebido])
    }
    entregas = clienteNovo
    entregas.concat(clienteNovo)

    clienteNovo = resultados
    clienteNovo[{nomeRecebido,produtoRecebido}].push(resultados.copy())
    console.log(resultados)
    
        
    while(resp ='SN'){
        resp = prompt('Quer cadastrar mais algum produto? [S/N] ').toUpperCase()
        if (resp == 'N'){
            break
        }else 
            return cadastro()
    }
}

arrumacao()
cadastro()
