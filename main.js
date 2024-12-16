const startGameButton = document.querySelector('.start-game')
const title = document.querySelector('h1')
const questionContainer = document.querySelector('.question-container')
const questionText = document.querySelector('.question')
const answersContainer = document.querySelector('.answers-container')
const nextQuestionButton = document.querySelector('.next-question')

startGameButton.addEventListener('click', startGame)
nextQuestionButton.addEventListener('click', displayNextQuestion)

let currentQuestionIndex = 0 // contador das questões
let totalCorrect = 0

function startGame() {
    startGameButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    title.classList.add('hide')
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions_page_3.length === currentQuestionIndex) {
        return finishGame()
    }

    questionText.textContent = questions_page_3[currentQuestionIndex].question
    questions_page_3[currentQuestionIndex].answer.forEach(answer => {
        const newAnswer = document.createElement('button')

        newAnswer.classList.add('button', 'answer')
        newAnswer.textContent = answer.text

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener('click', selectAnswer)
    })
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }

    document.body.removeAttribute('class')
    nextQuestionButton.classList.add('hide')
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add('correct')
        document.body.classList.remove('incorrect')
        totalCorrect++
    } else {
        document.body.classList.add('incorrect')
        document.body.classList.remove('correct')
    }

    document.querySelectorAll('.answer').forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct')
        } else {
            button.classList.add('incorrect')
        }
        button.disabled = true
    })

    nextQuestionButton.classList.remove('hide')
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions_page_3.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ''

    switch (true) {
        case (performance >= 90):
            message = 'Execelente :D'
            break
        case (performance >= 70):
            message = 'Muito Bom :)'
            break
        case (performance >= 50):
            message = 'Bom :|'
            break
        case (performance >= 30):
            message = 'Precisa Melhorar :('
            break
        default:
            message = 'Precisa Melhorar MUITO D:'
    }

    questionContainer.innerHTML =
        `
            <p class="final-message">
                Você acertou ${totalCorrect} de ${totalQuestion} questôes!
                <span>Resultado: ${message}</span>
            </p>
        
            <button onclick="window.location.reload()" class="button">Refazer teste</button>

        `
}

const questions_page_3 = [
    {
        question: 'Como o comportamento de um mentor pode impactar positivamente a motivação e o desempenho da equipe?',
        answer: [
            { text: 'Um mentor deve focar apenas no desempenho individual e ignorar a equipe.', correct: false },
            { text: 'Um mentor deve manter distância para evitar influência direta no desempenho.', correct: false },
            { text: 'Um mentor entusiasmado inspira a equipe a se envolver da mesma forma.', correct: true },
            { text: 'Um mentor deve se preocupar apenas com os resultados, não com a motivação.', correct: false },
        ]
    },
    {
        question: 'Como podemos honrar o compromisso de cumprir as expectativas do cliente?',
        answer: [
            { text: 'Focando apenas em atender pedidos rapidamente, sem se preocupar com a qualidade.', correct: false },
            { text: 'Criando o máximo de momentos deliciosos e de bem-estar que conseguirmos.', correct: true },
            { text: 'Ignorando expectativas do cliente e priorizando a produtividade.', correct: false },
            { text: 'Apenas atendendo as reclamações quando forem feitas diretamente ao gerente.', correct: false },
        ]
    },
    {
        question: 'Como posso identificar oportunidades de criar bons momentos?',
        answer: [
            { text: 'Ignorando as reações dos clientes e focando apenas no processo', correct: false },
            { text: 'Estando atento a tudo que acontece e observando as reações dos clientes durante o seu momento no restaurante', correct: true },
            { text: 'Concentrando-se exclusivamente em atender o maior número de clientes possível', correct: false },
            { text: 'Perguntando aos clientes diretamente sobre seus momentos favoritos', correct: false },
        ]
    },
    {
        question: 'Como posso promover a economia circular com os clientes?',
        answer: [
            { text: 'Ignorando o descarte e focando apenas na venda de produtos', correct: false },
            { text: 'Desconsiderando a separação de resíduos por tipo', correct: false },
            { text: 'Solicitando que os clientes reutilizem suas embalagens de qualquer forma', correct: false },
            { text: 'Auxiliando no descarte correto dos resíduos', correct: true },
        ]
    },
    {
        question: 'Como proceder ao identificar fiação exposta ou equipamentos elétricos danificados?',
        answer: [
            { text: 'Comunicar imediatamente o gerente', correct: true },
            { text: 'Ignorar e continuar utilizando o equipamento', correct: false },
            { text: 'Tentar consertar sozinho sem as ferramentas adequadas', correct: false },
            { text: 'Utilizar o equipamento com cautela até que seja consertado', correct: false },
        ]
    },
    {
        question: 'Como proporcionar uma excelente experiência ao cliente na janela do caixa do Drive-thru?',
        answer: [
            { text: 'Deixar o cliente descobrir o próximo passo sozinho', correct: false },
            { text: 'Focar exclusivamente na velocidade e ignorar a interação com o cliente', correct: false },
            { text: 'Perguntar ao cliente se ele sabe como proceder', correct: false },
            { text: 'Forneça orientações claras e precisas sobre o próximo passo, direcionando o cliente para a cabine de coleta de pedidos', correct: true },
        ]
    },
    {
        question: 'Como você começaria uma conversa com um cliente que está usando fones de ouvido e olhando para a tela de um computador?',
        answer: [
            { text: 'Interromperia imediatamente para oferecer ajuda', correct: false },
            { text: 'Acenaria repetidamente para chamar a atenção', correct: false },
            { text: 'Tocaria no cliente para garantir que ele notasse minha presença', correct: false },
            { text: 'Não interromperia, pois ele parece ocupado. Aguardaria por um sinal que indicasse que ele precisa de algo', correct: true },
        ]
    },
    {
        question: 'Como você confirma a exatidão do pedido e direciona o cliente para a cabine de pagamentos de forma clara e eficiente?',
        answer: [
            { text: 'Confirmo o pedido e direciono o cliente de forma clara e gentil', correct: true },
            { text: 'Deixo o cliente fazer o próximo passo sem confirmação', correct: false },
            { text: 'Indico o caminho apontando, sem falar nada', correct: false },
            { text: 'Sugiro que o cliente revise o pedido sozinho no painel', correct: false },
        ]
    },
    {
        question: 'Como você cumprimenta o cliente no caixa do Drive-thru?',
        answer: [
            { text: 'Apenas entrego o pedido sem cumprimentar', correct: false },
            { text: 'Cumprimento o cliente com um sorriso, contato visual e confirmando o pedido', correct: true },
            { text: 'Evito contato visual e entrego o pedido rapidamente', correct: false },
            { text: 'Falo de forma apressada sem esperar resposta', correct: false },
        ]
    },
    {
        question: 'Como você lida com a função Multi-pedidos para adicionar um novo pedido ao mesmo veículo que acabou de pagar?',
        answer: [
            { text: 'Registro o pedido de forma separada, sem associação com o anterior', correct: false },
            { text: 'Faço o novo pedido no mesmo sistema sem vinculação', correct: false },
            { text: 'Selecione "Transformar em Multi-pedidos" e registre o novo pedido associado ao anterior', correct: true },
            { text: 'Sugiro que o cliente faça outro pedido no final da fila', correct: false },
        ]
    },
    {
        question: 'Como você organiza a ordem de montagem dos itens do pedido, para garantir uma apresentação adequada e atender às expectativas do cliente?',
        answer: [
            { text: 'Coloco os itens de forma aleatória, sem me preocupar com a apresentação', correct: false },
            { text: 'Organize a montagem dos itens em sequência lógica, priorizando a integridade dos alimentos e a satisfação do cliente', correct: true },
            { text: 'Empilho os itens de qualquer forma para economizar tempo', correct: false },
            { text: 'Ignoro a apresentação e foco apenas na velocidade', correct: false },
        ]
    },
    {
        question: 'Como você pode cumprir a promessa ao receber famílias?',
        answer: [
            { text: 'Deixo as famílias se organizarem sozinhas sem interação', correct: false },
            { text: 'Ignoro o grupo para focar em clientes individuais', correct: false },
            { text: 'Peço para esperarem enquanto termino outras tarefas', correct: false },
            { text: 'Interage sendo simpático e animado, ajuda a encontrar uma mesa e entrega lâminas de atividades como brindes', correct: true },
        ]
    },
    {
        question: 'Como você pode demonstrar empatia e oferecer suporte emocional aos membros da equipe?',
        answer: [
            { text: 'Evite se envolver e foque apenas no seu próprio trabalho', correct: false },
            { text: 'Incentive o trabalho em equipe e a colaboração, compartilhando responsabilidades e buscando soluções colaborativas', correct: true },
            { text: 'Diga aos colegas que seus problemas não são importantes', correct: false },
            { text: 'Cobre resultados sem oferecer suporte', correct: false },
        ]
    },
    {
        question: 'Como você pode evitar a contaminação dos alimentos?',
        answer: [
            { text: 'Manipulando alimentos sem lavar as mãos', correct: false },
            { text: 'Deixando os alimentos expostos por longos períodos', correct: false },
            { text: 'Garantindo as mãos limpas e utilizando as ferramentas certas para o trabalho', correct: true },
            { text: 'Utilizando utensílios sujos para manuseio', correct: false },
        ]
    },
]