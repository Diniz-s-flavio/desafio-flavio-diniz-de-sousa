const cafe= {
        code: "cafe",
        description: "Cáfe",
        value: 3.00
    }
const chantily= {
        code: "chantily",
        description: "Chantily (extra do Café)",
        value: 1.50,
        mainItem: cafe
    }
const suco= {
        code: "suco",
        description: "Suco Natural",
        value: 6.20
    }
const sanduiche= {
        code: "sanduiche",
        description: "Sanduíche",
        value: 6.50
    }
const queijo= {
        code: "queijo",
        description: "Queijo (extra do Sanduíche)",
        value: 2.00,
        mainItem: sanduiche
    }
const salgado= {
        code: "salgado",
        description: "Salgado",
        value: 7.25
    }
const combo1= {
        code: "combo1",
        description: "1 Suco e 1 Sanduíche",
        value: 9.50
    }
const combo2= {
        code: "combo2",
        description: "1 Café e 1 Sanduíche",
        value: 7.50
    }


const paymentMethods = {cash:'dinheiro', credit:'credito',debt: 'debito'}


class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        //Verifica se há algum item
        if(itens==""){
            return "Não há itens no carrinho de compra!";
        }else{
            let totalValue = 0.00;
            for(let i=0; i< itens.length;i++){
                let itemAndAmount = this.splitProductAmount(itens[i]);
                if(itemAndAmount===String){
                    return 'Item inválido!';
                }

                let itemType = itemAndAmount[0];
                let itemAmount = parseInt(itemAndAmount[1]);
                if(itemAmount<1){
                    return "Quantidade inválida!";
                }if(itemAmount==NaN){
                    return 'Item inválido!';
                }

                let itemCalculatedValue = this.calcItemValue(itemType,itemAmount,itens);
                
                if(typeof(itemCalculatedValue )=="string"){
                    return itemCalculatedValue;
                }
                totalValue = totalValue+ itemCalculatedValue;
                
            }
            totalValue = this.calcFeeOrDiscount(metodoDePagamento,totalValue);
            if (typeof(totalValue)=='string') {
                return totalValue;
            }
            
            
           return `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
        }
    }

    
    //Método para separar o tipo do produto da quantidade, com validação se o item foi corretamente separado
    splitProductAmount(item){
        let splitedItem = item.split(",");

        if(splitedItem.length!=2){
            return "Item inválido!";
        }
        return splitedItem;
    }
    //Método para Calcular a taxa do credito, ou o desconto no dinheiro 
    calcFeeOrDiscount(paymentMethod,totalValue){
        let newTotalValue = totalValue;
        if(paymentMethod===paymentMethods.cash){
                newTotalValue = totalValue*0.95;
            }else if(paymentMethod===paymentMethods.credit){
                newTotalValue = totalValue*1.03;
            }else if(paymentMethod===paymentMethods.debt){
                newTotalValue = totalValue;
            }else{
                return "Forma de pagamento inválida!";
            }

        return newTotalValue;
    }
    //Método para Calcular o valor por tipo de item, e verifia se a item principal caso o item seja um extra 
    calcItemValue(itemType,amount,itens){
        let itemTotalValue = 0;
        if(itemType===cafe.code){
            itemTotalValue = cafe.value*amount;
            }else if(itemType===chantily.code){
                if(this.hasMainItem(itens,chantily.mainItem.code)){
                    itemTotalValue = chantily.value*amount;
                }else{
                    return 'Item extra não pode ser pedido sem o principal';
                }

            }else if(itemType===suco.code){
                itemTotalValue = suco.value*amount;

            }else if(itemType===sanduiche.code){
                itemTotalValue = sanduiche.value*amount;

            }else if(itemType===queijo.code){
                if(this.hasMainItem(itens,queijo.mainItem.code)){
                    itemTotalValue = queijo.value*amount;
                }else{
                    return 'Item extra não pode ser pedido sem o principal';
                }
                

            }else if(itemType===salgado.code){
                itemTotalValue = salgado.value*amount;

            }else if(itemType===combo1.code){
                itemTotalValue = combo1.value*amount;

            }else if(itemType===combo2.code){
                itemTotalValue = combo2.value*amount;

            }else{
                return "Item inválido!";
            }

        return itemTotalValue;
    }
    //Verificação se há o item principal referente ao item extra no pedido
    hasMainItem(itens,mainItem){
        for(let i=0; i< itens.length;i++){
            let itemType = this.splitProductAmount(itens[i])[0];

            if(mainItem===itemType){
                
                return true;
            }
        };
        
        return false;
    }
}

export { CaixaDaLanchonete };
