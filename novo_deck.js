function novo_deck(){
    const token = "aiqimfa9nym8";

    let global_deck_id;

    // Função para gerar um novo baralho
    async function deck_id(){
        async function embaralharBaralho() {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {
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
            console.log(global_deck_id);
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    deck_id()

}
module.exports = {novo_deck}
