const prompt = require('prompt-sync')();

clienteNovo = {}
resultados = {}
sergipe = ['Sara']
entregas = [{ 
                nome:'Marcos',
                produto:'tomada',
                saida:'MG',
                chegada:'Pará', 
                preco: (Math.random() * (100 - 10) + 10).toFixed(2)
            },
            {
                nome:'Sara', 
                produto:'lenço',
                saida:'Sergipe',
                chegada:'Piauí', 
                preco: (Math.random() * (100 - 10) + 10).toFixed(2)
            },
            {
                nome:'Valéria', 
                produto:'chuveiro',
                saida:'Acre',
                chegada:'Paraíba', 
                preco: (Math.random() * (100 - 10) + 10).toFixed(2)
            }]

listaResultados = [{nome: 'Marcos',produto:'tomadas'},
                   {nome:'Sara', produto:'lenços'},
                   {nome:'Valéria', produto:'chuveiro'}]

function menu() {
    arrumacaoCadastro()
    console.log('O que você deseja fazer: \n [1]Cadastrar um envio \n [2]Excluir um envio \n [3]Pesquisar um envio \n [9]Sair')
    let opcao = Number(prompt('Digite um valor: '));

    /*Arrumar as opções*/
    if (opcao === 1) cadastrarEntrega()
    if (opcao === 2) excluirEntrega()
    if (opcao === 3) pesquisarEntrega()
    if (opcao === 9) console.log('Saindo...')
}

function linhas(frase) {
    console.log()
    console.log('-------------------------------------------')
    console.log(`           ${frase}`)
    console.log('-------------------------------------------')
}

function arrumacaoCadastro() {
    linhas('         <<< BEM VINDO AO SISTEMA DE  CORREIOS >>>')
} 

function cadastrarEntrega(){
    //let formatoClienteNovo = {}

    linhas('CADASTRO DE ENTREGAS')

    console.log()
    clienteNovo['nome'] = prompt('Nome: ')
    clienteNovo['produto'] = prompt('Produto: ')
    clienteNovo['saida'] = prompt('Estado de saida: ')
    clienteNovo['chegada'] = prompt('Estado de chegada: ')
    clienteNovo['preco'] = (Math.random() * (100 - 10) + 10).toFixed(2)
    
    /*
    formatoClienteNovo.nome = nomeRecebido

    formatoClienteNovo.produto = produtoRecebido

    formatoClienteNovo.saida = saidaRecebida

    formatoClienteNovo.chegada = chegadaRecebida

    formatoClienteNovo.preco = precoRecebido*/

    //Joga as informações dentro de clienteNovo
    //clienteNovo.push(formatoClienteNovo)
    console.log(`Seu Frete custara: ${clienteNovo.preco}`)

    if(clienteNovo.saida.toUpperCase() == 'SE' || clienteNovo.saida.toUpperCase() == 'SERGIPE'){
      sergipe.push(clienteNovo.nome)
    }

    //Geral recebe o clienteNovo com as informações
    entregas.push(clienteNovo)
    
    //resultados.push(clienteNovo[{nomeRecebido,produtoRecebido}])
    resultados['nome'] = clienteNovo.nome
    resultados['produto'] = clienteNovo.produto
    listaResultados.push(resultados)
    
    //Esvazia os dados novamente
    //clienteNovo = resultados
    clienteNovo = {}

    while(resp ='SN'){
        resp = prompt('Quer cadastrar mais algum produto? [S/N] ').toUpperCase()
        if (resp == 'N'){
            menu()
            break
        }else 
            return cadastrarEntrega()
    }
}

function excluirEntrega() {
    linhas('EXCLUSÃO DE ENTREGA')
    console.log('cod  nome  produto')
    num = 1
    for (i of entregas) {
        console.log(`${num}  | ${i.nome} | ${i.produto}`)
        num++
    }
    console.log()
    let opcao = Number(prompt('Digite o código da entrega que você quer excluir ou [0] para voltar ao Menu inicial: '))
    while(true) {
        /*-----------------Melhorar a busca--------------------*/
        if (opcao === 0) {
            menu()
            break
        } else if(opcao >= num || opcao < 1) {
            opcao = Number(prompt('Por favor digite uma opção válida ou [0] para voltar ao Menu: '))
        } else {
            entregas.splice(opcao - 1, 1)
            menu();
            break
        }
    }
}

function pesquisarEntrega() {
    linhas('PESQUISAR ENTREGA')
    console.log('[1] Todas as entregas \n[2] Pesquisar por nome do produto \n[0] Voltar ao menu inicial')
    let opcao = Number(prompt('Digite uma opção: '))
    while (true) {
        console.log()
        /*-----------------Melhorar a busca--------------------*/
        if (opcao === 0) {
            menu()
            break
        } else if (opcao > 2 || opcao < 1) {
            opcao = Number(prompt('Digite uma opção válida: '))
        } 
        else if (opcao === 1){
            /*Tem que arrumar esse console.log() aqui*/
            console.log('nome  | produto | saída | chegada | preço')
            console.log()
            for (i of entregas){
                console.log(`${i.nome} | ${i.produto} | ${i.saida} | ${i.chegada} | ${i.preco}`)
            }
            menu()
            break
        } else {
            let nome = prompt('Digite o nome de um produto ou [0] para sair: ')
            const filtraNome = entregas.filter(elem => elem.produto.toUpperCase() === nome.toUpperCase())
            console.log()
            if (nome === '0') {
                menu()
                break
            }
            if (filtraNome.length >= 1) {
                num = 1
                for (i of filtraNome) {
                    console.log('cod | nome  | produto | saída | chegada | preço')
                    console.log(`${num} | ${i.nome} | ${i.produto} | ${i.saida} | ${i.chegada} | ${i.preco}`)
                    num++
                }
            }
            else {
                console.log('Não há resultados com sua pesquisa!')
            }
        }
    }
}

menu()