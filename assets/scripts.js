let canvas = document.getElementById("snake"); //Aqui chamamos o canvas para nosso arquivo JS.
let context  = canvas.getContext("2d"); //O contexta redenniriza o arquivo como 2D.
let box = 32; // Aqui definnimos o tamanho dos quadrados em 32pxls.
let snake = []; // Aqui criamos a snake, ela vai funcionar como uma array, pois para simular o seu movimento, vamos inserir um elemento e remover o último. 
snake[0] = { // Aqui passamos uma posição e tamanho para a snake.
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // Essa variavel vai definir o movimento da snake.
let food = { // Aqui criamos a variavel da comida, que é um array, onde definimos que ela já será randomica no mapa.
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() { //Essa função vai desenhar e definir nosso jogo.
    context.fillStyle = "lightgreen"; // Aqui definimos uma cor para o nosso context.
    context.fillRect(0, 0, 16*box, 16*box); // O fillRect vai desenhar o quadrado em que o jogo ocorre, ele trabalha com com 4 parâmetros x, y, altura e largura. 
}

function criarSnake() { // Aqui podemos pintar o corpo da snake de verde, aqui trabalhamos com for, pois ele vai pecorrer todo a array (snake) e acertar o seu tamanho.
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green"; // COR.
        context.fillRect(snake[i].x, snake[i].y, box, box); // TAMANHO de x e y, que foi informado em snake[0].
    }
}

function drawFood() { // Criando a comida.
    context.fillStyle = "red"; // Cor da comida.
    context.fillRect(food.x, food.y, box, box)
}
document.addEventListener('keydown', update); // Quando um evento acontece, detecta e chama uma função, por exemplo, com keydown criamos os cliques.

function update(event) { // Aqui definimos os controles e valores para que o programa consiga captar os nossos movimentos.
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() { // Aqui criamos uma função que atualiza o jogo de tempos em tempo, para quando a snake enconstrar em seu próprio corpo, o jogo se dar como encerrado.

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert ("Fim de jogo!");
        }
    }

    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x; // Aqui definimos onde a snake iniciar o jogo, coordeada 0 de x e y.
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; // Se a direção for igual a right, vai adicionar ou diminuir uma nova box, permitindo o movimento da snake, de acordo com as direções.
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop(); // Adicionamos o elemento pop para melhor simular a sua movimentação.
    } else { // Aqui terminamos de ajustar o tamanho da cobra, quando ela come e cresce, e a aleatoriedade do surgimento da food.
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = { // Aqui criamos a cabeça de snake.
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // Com o elemento unshift, vamos fazer que a nova box sempre seja acrescentada a frente, na cabeça de snake.
}

let jogo = setInterval(iniciarJogo, 100); //Aqui passamos o intervalo de 100 milisegundos, para iniciarJogo ser renovado sem ser travado.