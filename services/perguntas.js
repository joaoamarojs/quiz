const fs = require('fs');
const path = require('path');

class Perguntas {
    constructor() {
        this.caminho = path.join(__dirname, '../perguntas.json');
        this.perguntas = [];
        this.carregarPerguntas();
    }

    carregarPerguntas() {
        try {
            const dados = fs.readFileSync(this.caminho, 'utf8');
            this.perguntas = JSON.parse(dados).perguntas;
        } catch (error) {
            console.error("Erro ao ler o arquivo de perguntas:", error);
        }
    }

    getPerguntaAleatoria(respondidas) {
        const perguntasDisponiveis = this.perguntas.filter(q => !respondidas.includes(q.id));
    
        if (perguntasDisponiveis.length === 0) {
            return null;
        }

        const index = Math.floor(Math.random() * perguntasDisponiveis.length);
            return perguntasDisponiveis[index];
        }

    getPergunta(id) {
        return this.perguntas.find(q => q.id === id) || null;
    }
}

module.exports = Perguntas;