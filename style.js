let bookmarkedCards = [];

        function showPage(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            
            if (page === 'home') {
                document.getElementById('homePage').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Quiz App';
                event.target.classList.add('active');
            } else if (page === 'bookmarks') {
                document.getElementById('bookmarksPage').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Bookmarks';
                event.target.classList.add('active');
                updateBookmarksPage();
            } else if (page === 'profile') {
                document.getElementById('profilePage').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Profile';
                event.target.classList.add('active');
            }
        }

        function toggleBookmark(icon) {
            icon.classList.toggle('active');
            const card = icon.closest('.quiz-card');
            
            if (icon.classList.contains('active')) {
                if (!bookmarkedCards.includes(card)) {
                    bookmarkedCards.push(card);
                }
            } else {
                const index = bookmarkedCards.indexOf(card);
                if (index > -1) {
                    bookmarkedCards.splice(index, 1);
                }
            }
        }

        function updateBookmarksPage() {
            const bookmarksContainer = document.getElementById('bookmarkedQuestions');
            bookmarksContainer.innerHTML = '';
            
            if (bookmarkedCards.length === 0) {
                bookmarksContainer.innerHTML = '<div class="quiz-card"><h2 style="text-align: center; color: #999;">No bookmarks yet!</h2><p style="text-align: center; margin-top: 10px;">Bookmark questions from the home page to see them here.</p></div>';
            } else {
                bookmarkedCards.forEach(card => {
                    const clone = card.cloneNode(true);
                    bookmarksContainer.appendChild(clone);
                });
            }
        }

        function toggleAnswer(btn) {
            const answerContent = btn.nextElementSibling;
            if (answerContent.style.display === 'none' || !answerContent.style.display) {
                answerContent.style.display = 'block';
                btn.textContent = 'Hide Answer';
            } else {
                answerContent.style.display = 'none';
                btn.textContent = 'Show Answer';
            }
        }

        function toggleDarkMode(toggle) {
            toggle.classList.toggle('active');
            document.body.classList.toggle('dark-mode');
        }
