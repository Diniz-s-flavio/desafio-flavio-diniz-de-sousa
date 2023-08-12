const cafe= {
        code: "cafe",
        description: "Cáfe",
        value: 3.00,
        isMainIten: true
    }
const chantily= {
        code: "chantily",
        description: "Chantily (extra do Café)",
        value: 3.00,
        isMainIten: false,
        mainItem: cafe
    
    }
const suco= {
        code: "suco",
        description: "Suco Natural",
        value: 3.00,
        isMainIten: true
    }
const sanduiche= {
        code: "sanduiche",
        description: "Sanduíche",
        value: 3.00,
        isMainIten: true
    }
const queijo= {
        code: "queijo",
        description: "Queijo (extra do Sanduíche)",
        value: 3.00,
        isMainIten: false,
        mainItem: sanduiche
    }
const salgado= {
        code: "salgado",
        description: "Salgado",
        value: 3.00,
        isMainIten: true
    }
const combo1= {
        code: "combo1",
        description: "1 Suco e 1 Sanduíche",
        value: 3.00,
        isMainIten: false
    }
const combo2= {
        code: "combo2",
        description: "1 Café e 1 Sanduíche",
        value: 3.00,
        isMainIten: false
    }


const paymentMethods = {cash:'dinheiro', credit:'credito',debt: 'debito'}


class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        //Verifica se há algum item
        if(itens==""){
            console.log("entrou");
            return "Não há itens no carrinho de compra!";
        }else{
            let totalValue = 0.00;
            for(let i=0; i< itens.length;i++){
                let itemAndAmount = this.splitProductAmount(itens[i]);
                let item = itemAndAmount[0];
                let itemAmount = parseInt(itemAndAmount[1]);
                console.log("tamanho itens: " + itens.length)
                console.log("quantidade: "+ itemAmount)

                totalValue = totalValue+(cafe.value*itemAmount);
            }
            totalValue = this.calcFeeOrDiscount(metodoDePagamento,totalValue);
            
            console.log(`R$ ${totalValue.toFixed(2).replace('.',',')}`);
           return `R$ ${totalValue.toFixed(2).replace('.',',')}`; 
        }
    }

    //Método para Calcilar a taxa do credito, ou o desconto no dinheiro 
    calcFeeOrDiscount(paymentMethod,totalValue){
        let newTotalValue = totalValue;
        if(paymentMethod===paymentMethods.cash){
                newTotalValue = totalValue*0.95;
            }else if(paymentMethod===paymentMethods.credit){
                newTotalValue = totalValue*1.03;
            }

        return newTotalValue;
    }
    //Método para separar o tipo do produto da quantidade
    splitProductAmount(item){
        return item.split(",");
    }
}

export { CaixaDaLanchonete };
