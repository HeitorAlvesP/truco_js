//Devido a problemas de compatibilidade da api tive q deixar tudo em só um arquivo 


const token = "aiqimfa9nym8";
let global_deck_id;
const cartasSelecionadas = ['JS', 'JD', 'JC', 'JH', 'QS', 'QD', 'QC', 'QH', 'KS', 'KD', 'KC', 'KH', 'AS', 'AD', 'AC', 'AH', '2S', '2D', '2C', '2H', '3S', '3D', '3C', '3H', '4S', '4D', '4C', '4H', '5S', '5D', '5C', '5H', '6S', '6D', '6C', '6H', '7S', '7D', '7C', '7H'];
let cartasUsadas = new Set();

// Função para gerar um novo baralho
async function deck_id() {
    async function embaralharBaralho() {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=${cartasSelecionadas.join(',')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json()
        return data.deck_id;
    }
    try {
        global_deck_id = await embaralharBaralho();
        await embaralharCartas(global_deck_id);
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function embaralharCartas(deck_id) {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/shuffle/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    (data.deck_id);

    cartasUsadas = new Set([...cartasUsadas, ...cartasSelecionadas]);
}

async function tira_3_cartas() {
    for (let i = 1; i <= 4; i++) {
        async function filtro_de_3_cartas(numeroDeCartas) {
            const retirada = await fetch(`https://www.deckofcardsapi.com/api/deck/${global_deck_id}/draw/?count=${numeroDeCartas}`)
            const dados = await retirada.json()
            const cartasFiltradas = dados.cards.map(carta => {
                return {
                    value: carta.value,
                    suit: carta.suit,
                    //image: carta.image
                };
            });
            console.log(cartasFiltradas)
            console.log('=======================================')
        }
        await filtro_de_3_cartas(3);
    }
}

async function iniciar() {
    await deck_id();
    await tira_3_cartas();
}

iniciar();
