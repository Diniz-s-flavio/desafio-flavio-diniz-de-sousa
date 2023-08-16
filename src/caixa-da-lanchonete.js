//Constante do Cardapio
class Menu{
    static CAFE = new Menu("cafe","Cáfe",3.00);
    static CHANTILY = new Menu("chantily","Chantily (extra do Café)",1.50,this.CAFE);
    static SUCO = new Menu("suco","Suco Natural",6.20);
    static SANDUICHE = new Menu("sanduiche","Sanduíche",6.50);
    static QUEIJO = new Menu("queijo","Queijo (extra do Sanduíche)",2.00,this.SANDUICHE);
    static SALGADO = new Menu("salgado","Salgado",7.25);
    static COMBO1 = new Menu("combo1","1 Suco e 1 Sanduíche",9.50);
    static COMBO2 = new Menu("combo2","1 Café e 1 Sanduíche",7.50);

    constructor(code,description,value,mainItem = null){
        this.code = code;
        this.description = description;
        this.value = value;
        this.mainItem = mainItem;
    }
}
//Constante dos metodos de pagamento
class PaymentMethod {
    static CASH = new PaymentMethod('dinheiro');
    static CREDIT = new PaymentMethod('credito');
    static DEBT = new PaymentMethod('debito');

    constructor(description){
        this.description = description;
    }
}

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        //Verifica se há algum item
        if(itens==""){
            return "Não há itens no carrinho de compra!";
        }else{
            let totalValue = 0.00;
            for(const item of itens){
                let itemAndAmount = this.splitProductAmount(item);
                if(typeof(itemAndAmount)==="string"){
                    return 'Item inválido!';
                }

                let itemType = itemAndAmount[0];
                let itemAmount = parseInt(itemAndAmount[1]);
                if(itemAmount<1 || isNaN(itemAmount)){
                    return "Quantidade inválida!";
                }

                let itemCalculatedValue = this.calcItemValue(itemType,itemAmount,itens);
                
                if(typeof(itemCalculatedValue )=="string"){
                    return itemCalculatedValue;
                }
                totalValue += itemCalculatedValue;
                
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
    calcFeeOrDiscount(paymentMethod, totalValue) {
        switch (paymentMethod) {
            case PaymentMethod.CASH.description:
                return totalValue * 0.95;
            case PaymentMethod.CREDIT.description:
                return totalValue * 1.03;
            case PaymentMethod.DEBT.description:
                return totalValue;
            default:
                return "Forma de pagamento inválida!";
        }
    }
    //Método para Calcular o valor por tipo de item, e verifia se a item principal caso o item seja um extra 
    calcItemValue(itemType,amount,itens){
        let itemTotalValue = 0;
        if(itemType===Menu.CAFE.code){
            itemTotalValue = Menu.CAFE.value*amount;
            }else if(itemType===Menu.CHANTILY.code){
                if(this.hasMainItem(itens,Menu.CHANTILY.mainItem.code)){
                    itemTotalValue = Menu.CHANTILY.value*amount;
                }else{
                    return 'Item extra não pode ser pedido sem o principal';
                }

            }else if(itemType===Menu.SUCO.code){
                itemTotalValue = Menu.SUCO.value*amount;

            }else if(itemType===Menu.SANDUICHE.code){
                itemTotalValue = Menu.SANDUICHE.value*amount;

            }else if(itemType===Menu.QUEIJO.code){
                if(this.hasMainItem(itens,Menu.QUEIJO.mainItem.code)){
                    itemTotalValue = Menu.QUEIJO.value*amount;
                }else{
                    return 'Item extra não pode ser pedido sem o principal';
                }
                

            }else if(itemType===Menu.SALGADO.code){
                itemTotalValue = Menu.SALGADO.value*amount;

            }else if(itemType===Menu.COMBO1.code){
                itemTotalValue = Menu.COMBO1.value*amount;

            }else if(itemType===Menu.COMBO2.code){
                itemTotalValue = Menu.COMBO2.value*amount;

            }else{
                return "Item inválido!";
            }

        return itemTotalValue;
    }
    //Verificação se há o item principal referente ao item extra no pedido
    hasMainItem(itens,mainItem){
        for(const item of itens){
            let itemType = this.splitProductAmount(item)[0];

            if(mainItem===itemType){
                return true;
            }
        };
        
        return false;
    }
}

export { CaixaDaLanchonete };
