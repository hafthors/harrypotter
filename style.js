 const quizData = [
            {
                question: "What is the name of the school that Harry Potter attends?",
                options: ["Harry Potter", "Hogwarts", "Fiction", "Snake"],
                correct: 2
            },
            {
                question: " What is the name of the lightning bolt-shaped scar on Harry Potter's forehead?",
                options: ["Harry Potter", "Symbolism", "Scar", "Hogwarts"],
                correct: 1
            },
            {
                question: "Which magical creature guards the entrance to the Gryffindor common room?",
                options: ["Harry Potter", "Creatures", "Gryffindor", "Scar"],
                correct: 3
            },

            {
                question: "What is the name of the three-headed dog that guards the Sorcerer's Stone?",
                options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
                correct: 1
            },
            {
                question: "What is the smallest prime number?",
                options: ["0", "1", "2", "3"],
                correct: 2
            }
        ];

        let currentQuestion = 0;
        let userAnswers = {};
        let bookmarkedQuestions = new Set();

        function loadQuestion() {
            const q = quizData[currentQuestion];
            document.getElementById('question').textContent = q.question;
            document.getElementById('currentQ').textContent = currentQuestion + 1;
            document.getElementById('totalQ').textContent = quizData.length;

            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';

            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = option;
                btn.onclick = () => selectOption(index);
                
                if (userAnswers[currentQuestion] === index) {
                    btn.classList.add('selected');
                }
                
                optionsContainer.appendChild(btn);
            });

            // Update bookmark button
            const bookmarkBtn = document.getElementById('bookmarkBtn');
            bookmarkBtn.textContent = bookmarkedQuestions.has(currentQuestion) ? '★' : '☆';
            bookmarkBtn.className = 'bookmark-btn' + (bookmarkedQuestions.has(currentQuestion) ? ' bookmarked' : '');

            // Update button visibility
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            
            if (currentQuestion === quizData.length - 1) {
                document.getElementById('nextBtn').classList.add('hidden');
                document.getElementById('submitBtn').classList.remove('hidden');
            } else {
                document.getElementById('nextBtn').classList.remove('hidden');
                document.getElementById('submitBtn').classList.add('hidden');
            }
        }

        function selectOption(index) {
            userAnswers[currentQuestion] = index;
            const options = document.querySelectorAll('.option-btn');
            options.forEach((btn, i) => {
                btn.classList.toggle('selected', i === index);
            });
        }

        function nextQuestion() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                loadQuestion();
            }
        }

        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        }

        function toggleBookmark() {
            if (bookmarkedQuestions.has(currentQuestion)) {
                bookmarkedQuestions.delete(currentQuestion);
            } else {
                bookmarkedQuestions.add(currentQuestion);
            }
            loadQuestion();
        }

        function submitQuiz() {
            let score = 0;
            quizData.forEach((q, index) => {
                if (userAnswers[index] === q.correct) {
                    score++;
                }
            });

            document.getElementById('quizSection').classList.add('hidden');
            document.getElementById('resultsSection').classList.remove('hidden');
            
            const percentage = (score / quizData.length * 100).toFixed(0);
            document.getElementById('scoreDisplay').textContent = `${score} / ${quizData.length}`;
            
            let message = '';
            if (percentage >= 80) {
                message = '🌟 Excellent work! You really know your stuff!';
            } else if (percentage >= 60) {
                message = '👍 Good job! Keep learning!';
            } else {
                message = '💪 Keep practicing! You\'ll do better next time!';
            }
            document.getElementById('resultMessage').textContent = message;

            // Show bookmarked questions
            if (bookmarkedQuestions.size > 0) {
                document.getElementById('bookmarkedSection').style.display = 'block';
                const bookmarkedContainer = document.getElementById('bookmarkedQuestions');
                bookmarkedContainer.innerHTML = '';
                
                bookmarkedQuestions.forEach(qIndex => {
                    const div = document.createElement('div');
                    div.className = 'bookmarked-item';
                    div.innerHTML = `<strong>Q${qIndex + 1}:</strong> ${quizData[qIndex].question}`;
                    bookmarkedContainer.appendChild(div);
                });
            }
        }

        function restartQuiz() {
            currentQuestion = 0;
            userAnswers = {};
            bookmarkedQuestions.clear();
            document.getElementById('quizSection').classList.remove('hidden');
            document.getElementById('resultsSection').classList.add('hidden');
            loadQuestion();
        }

        // Initialize quiz
        loadQuestion();
    
