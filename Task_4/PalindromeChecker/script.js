const input = document.querySelector("#textInput");
const p = document.querySelector("#resultMessage");

input.addEventListener("input", () => {
    const text = input.value.trim();
    
    // 1. If the input field is completely empty, clear the badge layout state
    if (text === "") {
        p.innerHTML = "";
        return;
    }

    // 2. Standardize casing and strip away all spaces and punctuation signs
    // This allows phrases like "A man, a plan, a canal: Panama" to evaluate perfectly!
    const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reverseText = cleanText.split("").reverse().join("");
    const isPalindrome = (cleanText === reverseText);

    // 3. Dynamically inject the gorgeous Bootstrap badges based on structural truth
    if (isPalindrome) {
        p.innerHTML = `<span class="badge-animate bg-success text-white shadow-sm fw-medium">✨ This is a palindrome!</span>`;
    } else {
        p.innerHTML = `<span class="badge-animate bg-danger text-white shadow-sm fw-medium">❌ Not a palindrome</span>`;
    }
});