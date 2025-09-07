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
    categoryButtons.addEventListener('click', (e) => {
        // Find the closest parent label or input that is part of the radio group
        const targetLabel = e.target.closest('label');
        const targetInput = e.target.closest('input[type="radio"]');

        let selectedCategoryId = null;

        if (targetInput) {
            selectedCategoryId = targetInput.id;
            // Ensure the radio button is checked
            targetInput.checked = true;
        } else if (targetLabel && targetLabel.htmlFor) {
            selectedCategoryId = targetLabel.htmlFor;
            // Find the corresponding input and check it
            const inputElement = document.getElementById(selectedCategoryId);
            if (inputElement) {
                inputElement.checked = true;
            }
        }

        if (selectedCategoryId) {
            const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
            if (selectedCategory) {
                if (!gameStarted) {
                    startGame(selectedCategory);
                } else {
                    updateCard(selectedCategory);
                }
            }
        }
    });
});