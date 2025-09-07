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
        const targetLabel = e.target.closest('label');
        const targetInput = e.target.closest('input[type="radio"]');

        let selectedCategoryId = null;

        if (targetInput) {
            selectedCategoryId = targetInput.id;
            targetInput.checked = true;
        } else if (targetLabel && targetLabel.htmlFor) {
            selectedCategoryId = targetLabel.htmlFor;
            const inputElement = document.getElementById(selectedCategoryId);
            if (inputElement) {
                inputElement.checked = true;
            }
        }

        // Ripple effect logic
        if (targetLabel) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Get click position relative to the label
            const rect = targetLabel.getBoundingClientRect();
            const rippleSize = 50; // Fixed smaller size for the ripple
            const x = e.clientX - rect.left - (rippleSize / 2);
            const y = e.clientY - rect.top - (rippleSize / 2);

            ripple.style.width = ripple.style.height = `${rippleSize}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            targetLabel.appendChild(ripple);

            // Remove the ripple element after the animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
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