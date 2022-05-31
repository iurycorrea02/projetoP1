const prompt = require('prompt-sync')();
clienteNovo = {}
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

function menu() {
    linhas('BEM-VINDO AO SISTEMA DOS CORREIOS ')
    console.log('O que você deseja fazer: \n [1]Cadastrar um envio \n [2]Excluir um envio \n [3]Pesquisar um envio \n [9]Sair')
    console.log()
    let numero = Number(prompt('Escolha uma opção: '));
    i = true
    while(i){
        switch(numero) {
            case 1:
                cadastrarEntrega()
                break
            case 2: 
                excluirEntrega()
                break
            case 3:
                pesquisarEntrega()
                break
            case 9:
                console.log()
                console.log('Saindo....')
                i = false
                break
            default: numero = Number(prompt('Opção inválida, por favor digite uma opção válida: '))
        }
    }
}

function linhas(frase) {
    console.log()
    console.log('----------------------------------------------')
    console.log(`           ${frase}`)
    console.log('----------------------------------------------')
}

function cadastrarEntrega(){
    console.clear()
    linhas('CADASTRO DE ENTREGAS')
    console.log()

    clienteNovo['nome'] = prompt('Nome: ')
    clienteNovo['produto'] = prompt('Produto: ')
    clienteNovo['saida'] = prompt('Estado de saida: ')
    clienteNovo['chegada'] = prompt('Estado de chegada: ')
    clienteNovo['preco'] = (Math.random() * (100 - 10) + 10).toFixed(2)    
    console.log(`Seu Frete custara: ${clienteNovo.preco}`)

    if(clienteNovo.saida.toUpperCase() === 'SE' || clienteNovo.saida.toUpperCase() === 'SERGIPE'){
      sergipe.push(clienteNovo.nome)
    }
    entregas.push(clienteNovo)
    clienteNovo = {}

    while(resp ='SN'){
        resp = prompt('Quer cadastrar mais algum produto? [S/N] ').toUpperCase()
        if (resp == 'N') {
            console.clear()
            menu()
        }
        else cadastrarEntrega()
        return
    }
}

function syncDelay(milliseconds,mensagem){
    var start = new Date().getTime();
    var end=0;
    console.log(mensagem)
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    
    }
   }


function excluirEntrega() {
    console.clear()
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
            console.clear()
            syncDelay(1000,'Redirecionando...')
            console.clear()
            return menu()
        } else if(opcao >= num || opcao < 1) {
            opcao = Number(prompt('Por favor digite uma opção válida ou [0] para voltar ao Menu: '))
        } else {
            entregas.splice(opcao - 1, 1)
            console.clear()
            syncDelay(1000,'Redirecionando...')
            console.clear()
            return menu();
        }
    }
}

function pesquisarEntrega() {
    console.clear()
    linhas('PESQUISAR ENTREGA')
    console.log('[1] Todas as entregas \n[2] Pesquisar por nome do produto \n[3] Entregas do estado de Sergipe \n[0] Voltar ao menu inicial')
    let op = Number(prompt('Digite uma opção: '))
    
    while (true) {
        console.log()
        if (op === 0) {
            console.clear()
            return menu();
        }
        else if (op > 3 || op < 1) {
            op = Number(prompt('Digite uma opção válida: '))
        }
        else if (op === 1){
            syncDelay(1000,'Checando...')
            console.clear()
            console.log('nome | produto | saída | chegada | preço')
            console.log()
            
            for (i of entregas){
                console.log(`${i.nome}   |   ${i.produto}   |   ${i.saida}   |   ${i.chegada}   |   ${i.preco}`)
            }
            return menu()
        } 
        else if (op === 3) {
            syncDelay(1000,'Checando...')
            console.clear()
            console.log('Pessoas que tem entrega de Sergipe: ')

            for (i of sergipe) {
                console.log(`[${i}]`)
            }
            return menu()
        }
        else {
            let nome = prompt('Digite o nome de um produto ou [0] para sair: ')
            const filtraNome = entregas.filter(elem => elem.produto.toUpperCase() === nome.toUpperCase())
            console.log()
            
            if (nome === '0') {
                console.clear()
                return menu()
            }
            else if (filtraNome.length >= 1) {
                num = 1
                console.clear()
                console.log('cod | nome  | produto | saída | chegada | preço')
                for (i of filtraNome) {
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