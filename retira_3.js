const {novo_deck} = require('./novo_deck');

function tira_3_cartas(){
    for(let i = 1; i <= 4; i++){
        
        async function filtro_de_3_cartas(numeroDeCartas){
            const retirada = await fetch(`https://www.deckofcardsapi.com/api/deck/p99rnhxkxj5x/draw/?count=${numeroDeCartas}`)
            const dados = await retirada.json()
            const cartasFiltradas = dados.cards.map(carta => {
                return {
                    value: carta.value,
                    suit: carta.suit,
                    image: carta.image
                };
            }); 
            console.log(cartasFiltradas)
            console.log('=======================================')
        }
        filtro_de_3_cartas(3);
    }
}
tira_3_cartas()