const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`);

        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        let dice1 = await rollDice();
        let dice2 = await rollDice();

        let totalScore1 = 0;
        let totalScore2 = 0;

        if (block === "RETA") {
            totalScore1 = dice1 + character1.VELOCIDADE;
            totalScore2 = dice2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", dice1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", dice2, character2.VELOCIDADE);
        };
        if (block === "CURVA") {
            totalScore1 = dice1 + character1.MANOBRABILIDADE;
            totalScore2 = dice2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", dice1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", dice2, character2.MANOBRABILIDADE);
        };
        if (block === "CONFRONTO") {
            let powerResult1 = dice1 + character1.PODER;
            let powerResult2 = dice2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!`);

            await logRollResult(character1.NOME, "poder", dice1, character1.PODER);
            await logRollResult(character2.NOME, "poder", dice2, character2.PODER);
            
            if (powerResult1 > powerResult2) {
                if (character2.PONTOS > 0) {
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perde 1 ponto.`);
                    character2.PONTOS--;
                } else {
                    console.log(`${character1.NOME} venceu o confronto, mas ${character2.NOME} não tem pontos para perder.`);
                }
            }
            if (powerResult2 > powerResult1) {
                if (character1.PONTOS > 0) {
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perde 1 ponto.`);
                    character1.PONTOS--;
                } else {
                    console.log(`${character2.NOME} venceu o confronto, mas ${character1.NOME} não tem pontos para perder.`);
                }
            }
            console.log(powerResult1 === powerResult2 ? "Empate no confronto! Nenhum personagem perde pontos." : "");
        };

        if (totalScore1 > totalScore2) {
            console.log(`${character1.NOME} venceu a rodada!`);
            character1.PONTOS++;
        } else if (totalScore2 > totalScore1) {
            console.log(`${character2.NOME} venceu a rodada!`);
            character2.PONTOS++;
        }
        console.log("==============================");
    };
};

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns!`);
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns!`);
    else
        console.log(`\nEmpate! Ambos os personagens são incríveis!`);
};

(async function main() {
    console.log(
        `Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();