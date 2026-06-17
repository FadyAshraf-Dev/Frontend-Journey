    const nameEl = document.querySelector("#name");
    const priceEl = document.querySelector("#price");
    const qtyEl = document.querySelector("#quantity");
    const categoryEl = document.querySelector("#category");
    const brandEl = document.querySelector("#brand");
    const searchEl = document.querySelector("#search");
    const tbody = document.querySelector("#inventoryBody");
    const tfoot = document.querySelector("#inventoryFoot");
    const addBtn = document.querySelector("#add");

    let data = JSON.parse(localStorage.getItem("data")) || [];

    /* ------------------------- Helpers ------------------------- */

    const save = () => localStorage.setItem("data", JSON.stringify(data));

    const resetForm = () => {
        nameEl.value = "";
        priceEl.value = "";
        qtyEl.value = "";
        categoryEl.value = "";
        brandEl.value = "";
    };

    const replaceEditWithConfirm = (row, confirmBtn, cancelBtn) => {
        const actionCell = row.children[5];
        actionCell.innerHTML = "";
        actionCell.setAttribute("colspan", "2");
        if(row.children[6]) row.children[6].remove(); // Dynamic cleanup of dual action cells down to single block spaces
        
        // Wrap custom inputs inside action flex columns smoothly
        const btnGroup = document.createElement("div");
        btnGroup.className = "d-flex gap-1 justify-content-center";
        btnGroup.append(confirmBtn, cancelBtn);
        actionCell.appendChild(btnGroup);
    };

    const replaceTableCellsWithInputs = (row, field, i) => {
        row.children[i].innerHTML = "";
        row.children[i].appendChild(field);
    };

    /* ------------------------- Rendering ------------------------- */

    function renderTable(list = data) {
        tbody.innerHTML = "";

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted fs-6 italic">No active inventory log entries recorded.</td></tr>`;
            tfoot.innerHTML = "";
            return;
        }

        list.forEach((item, index) => addRow(index, item));

        const grandTotal = list.reduce((acc, obj) => acc + (Number(obj.price) * Number(obj.quantity || 1)), 0);

        tfoot.innerHTML = `
            <tr class="table-light fw-bold">
                <td colspan="3" class="text-dark py-3 ps-3">Total Asset Inventory Capital Valuation:</td>
                <td colspan="3" class="text-end text-primary py-3 pe-3 fs-5">$${grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            </tr>
        `;
    }

    function addRow(index, item) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="fw-semibold text-dark text-truncate" style="max-width: 180px;">${item.name}</td>
            <td class="text-secondary">$${Number(item.price).toFixed(2)}</td>
            <td><span class="badge ${item.quantity > 5 ? 'bg-light text-dark border' : 'bg-danger-subtle text-danger'} rounded-2 px-2.5 py-1.5">${item.quantity}</span></td>
            <td><span class="text-muted small">${item.category}</span></td>
            <td><span class="text-muted small">${item.brand}</span></td>
            <td style="text-align: center;"><button class="btn btn-sm btn-link text-danger remove p-1 text-decoration-none fw-medium">Remove</button></td>
            <td style="text-align: center;"><button class="btn btn-sm btn-outline-secondary edit px-2 py-1 rounded-2">Edit</button></td>
        `;

        row.querySelector(".remove").onclick = () => {
            data.splice(index, 1);
            save();
            renderTable();
        };

        row.querySelector(".edit").onclick = () => enterEditMode(row, index);

        tbody.appendChild(row);
    }

    /* ------------------------- Edit Mode ------------------------- */

    function enterEditMode(row, index) {
        const original = data[index];

        // Custom styled inline element tracking inputs
        const nameInput  = Object.assign(document.createElement("input"), { value: original.name, className: "inline-edit" });
        const priceInput = Object.assign(document.createElement("input"), { value: original.price, type: "number", className: "inline-edit" });
        const qtyInput   = Object.assign(document.createElement("input"), { value: original.quantity, type: "number", className: "inline-edit" });

        // Build clean native select drop components
        const categorySelect = categoryEl.cloneNode(true);
        const brandSelect    = brandEl.cloneNode(true);

        // Strip static id references to prevent collision issues
        categorySelect.removeAttribute("id");
        brandSelect.removeAttribute("id");
        
        categorySelect.className = "inline-edit";
        brandSelect.className = "inline-edit";

        [[categorySelect, original.category], [brandSelect, original.brand]].forEach(([select, val]) => {
            select.value = val;
            if(select.firstElementChild) select.firstElementChild.style.display = "none";
        });

        const fields = [nameInput, priceInput, qtyInput, categorySelect, brandSelect];
        fields.forEach((field, i) => replaceTableCellsWithInputs(row, field, i));

        const confirmBtn = Object.assign(document.createElement("button"), { textContent: "Save", className: "btn btn-sm btn-success px-2.5 py-1 rounded-2" });
        const cancelBtn  = Object.assign(document.createElement("button"), { textContent: "Cancel", className: "btn btn-sm btn-light border px-2.5 py-1 rounded-2" });

        replaceEditWithConfirm(row, confirmBtn, cancelBtn);

        cancelBtn.onclick = () => renderTable();

        confirmBtn.onclick = () => {
            if (!nameInput.value.trim() || !priceInput.value || !qtyInput.value || !categorySelect.value || !brandSelect.value) return;

            data[index] = {
                name: nameInput.value.trim(),
                price: priceInput.value,
                quantity: qtyInput.value,
                category: categorySelect.value,
                brand: brandSelect.value
            };
            
            save();
            renderTable();
        };
    }

    /* ------------------------- Events ------------------------- */

    addBtn.onclick = () => {
        if (!nameEl.value.trim() || !priceEl.value || !qtyEl.value || !categoryEl.value || !brandEl.value) return;

        data.push({
            name: nameEl.value.trim(),
            price: priceEl.value,
            quantity: qtyEl.value,
            category: categoryEl.value,
            brand: brandEl.value
        });

        save();
        renderTable();
        resetForm();
    };

    searchEl.onkeyup = () => {
        const q = searchEl.value.toLowerCase();
        renderTable(data.filter(item => item.name.toLowerCase().includes(q)));
    };

    /* ------------------------- Initialize ------------------------- */
    renderTable();
