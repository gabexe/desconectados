document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const cardGradient = document.getElementById('card-gradient');
    const questionText = document.getElementById('question-text');
    const diceButton = document.getElementById('dice-button');
    const categoryButtons = document.getElementById('category-buttons');
    let gameStarted = false;

    const getRandomQuestion = (category) => {
        const questions = category.questions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    };

    const updateCard = (category) => {
        cardContainer.classList.add('fade-out');
        setTimeout(() => {
            const question = getRandomQuestion(category);
            cardGradient.style.backgroundColor = category.color;
            questionText.innerText = question;
            cardContainer.classList.remove('fade-out');
            cardContainer.classList.add('fade-in');
        }, 500); // Duración de la animación
    };

    const setInitialState = () => {
        questionText.innerText = "En palabras - Desconectados";
        cardGradient.style.backgroundColor = 'transparent';
    };

    const startGame = (category) => {
        gameStarted = true;
        updateCard(category);
    };
    
    setInitialState();

    // Evento para el botón del dado
    diceButton.addEventListener('click', () => {
        if (!gameStarted) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            document.getElementById(randomCategory.id).checked = true;
            startGame(randomCategory);
        } else {
            diceButton.classList.add('is-rolling');
            setTimeout(() => {
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                document.getElementById(randomCategory.id).checked = true;
                updateCard(randomCategory);
                diceButton.classList.remove('is-rolling');
            }, 1000); // La animación del dado dura 1s
        }
    });

    // Evento para los nuevos botones de radio
    categoryButtons.addEventListener('change', (e) => {
        const selectedCategoryId = e.target.id;
        const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
        if (selectedCategory) {
            if (!gameStarted) {
                startGame(selectedCategory);
            } else {
                updateCard(selectedCategory);
            }
        }
    });
});