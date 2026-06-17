        const p = document.querySelector("#previewText");
        const textInput = document.querySelector("#textInput");
        const colorInput = document.querySelector("#colorInput");
        const sizeSelect = document.querySelector("#sizeSelect");
        const transformSelect = document.querySelector("#transformSelect");

        const defaultPlaceholder = "Enter Text To Replace This";

        // Master compilation renderer handles state updating updates cleanly
        function updatePreview() {
            // Update Text (fallback to baseline placeholder layout text strings safely if field is blank)
            p.innerText = textInput.value.trim() !== "" ? textInput.value : defaultPlaceholder;
            
            // Update Styling Layout States
            p.style.color = colorInput.value;
            p.style.fontSize = sizeSelect.value;
            p.style.textTransform = transformSelect.value;
        }

        // Apply a single procedural trigger to map logic hooks elegantly
        textInput.addEventListener("input", updatePreview);
        colorInput.addEventListener("input", updatePreview); // 'input' fires in real-time as you drag the picker wheel!
        sizeSelect.addEventListener("change", updatePreview);
        transformSelect.addEventListener("change", updatePreview);
