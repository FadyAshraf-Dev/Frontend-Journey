        let arr = [
            "Just one small positive thought in the morning can change your whole day.",
            "Opportunities don't happen, you create them.",
            "To be, or not to be: that is the question.", 
            "It always seems impossible until it's done.", 
            "Life is a long lesson in humility.",
            "The only thing we have to fear is fear itself.", 
            "I have a dream.",
            "Not all those who wander are lost.",
            "Be the change you want to see in the world.",
            "The information you consume each day is the soil from which your future thoughts grow."
        ];

        const localBtn = document.querySelector("#localBtn");
        const p = document.querySelector(".quote-text");
        const modeBadge = document.querySelector("#modeBadge");

        function getDifferentIndex(lastIndex, num){
            let randomNumber = Math.floor(Math.random() * num);
            if (lastIndex === randomNumber){
                return getDifferentIndex(lastIndex, num);
            }
            return randomNumber;
        }

        let i = 0;
        let random = false;

        // --- Option A: Your Refined Original Local Mode Logic ---
        localBtn.addEventListener("click", () => {
            if (random) {
                i = getDifferentIndex(i, arr.length);
                p.innerText = arr[i];
            } else {
                if (i == arr.length) {
                    random = true;
                    modeBadge.innerText = "Shuffle Mode 🔀";
                    modeBadge.className = "badge bg-primary";
                    i = getDifferentIndex(--i, arr.length);
                    p.innerText = arr[i];
                } else {
                    p.innerText = arr[i];
                    i++;
                }
            }
        });
