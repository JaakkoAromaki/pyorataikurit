document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu() {
        document.querySelector("nav ul").classList.toggle("show");
    }
    document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);

    let isAdmin = false;
    let categories = {};
    let products = [];

    function displayProducts(category = null) {
        const productList = document.getElementById("productList");
        productList.innerHTML = ""; // Clear previous products
    
        products.forEach(product => {
            if (!category || product.category === category) {
                const li = document.createElement("li");
                li.textContent = product.name;
                productList.appendChild(li);
            }
        });
    }
    

    function addCategoryClickEvents() {
        document.querySelectorAll(".category").forEach(category => {
            category.addEventListener("click", function () {
                const selectedCategory = this.getAttribute("data-category");
                const subCategoryDiv = document.getElementById(`sub-${selectedCategory}`);
                const arrow = this.querySelector(".arrow");
    
                if (subCategoryDiv) {
                    if (subCategoryDiv.style.display === "none") {
                        subCategoryDiv.style.display = "block";
                        arrow.textContent = "▼";
                    } else {
                        subCategoryDiv.style.display = "none";
                        arrow.textContent = "▶";
                    }
                }
    
                // **Show products in the selected category**
                displayProducts(selectedCategory);
            });
        });
    }

    function renderCategories() {
        const categoryList = document.getElementById("categoryList");
        categoryList.innerHTML = generateCategoryHTML(categories);
        addCategoryClickEvents();
    }

    function generateCategoryHTML(categoryObj, parentKey = "") {
        let html = "<ul>";
        for (let category in categoryObj) {
            const fullPath = parentKey ? `${parentKey}/${category}` : category;
            html += `
                <li>
                    <span class="category" data-category="${fullPath}">
                        <span class="arrow">▶</span> ${category}
                    </span>
                    ${isAdmin ? `<button onclick="deleteCategory('${fullPath}')">❌</button>` : ""}
                    <div class="subcategory" id="sub-${fullPath}" style="display:none;">
                        ${generateCategoryHTML(categoryObj[category], fullPath)}
                    </div>
                </li>`;
        }
        return html + "</ul>";
    }
    

    function toggleSubcategory(categoryPath) {
        let subcategory = document.getElementById(`sub-${categoryPath}`);
        let icon = document.querySelector(`[data-category="${categoryPath}"] .toggle-icon`);
        if (subcategory.style.display === "none" || !subcategory.style.display) {
            subcategory.style.display = "block";
            icon.classList.add("expanded");
        } else {
            subcategory.style.display = "none";
            icon.classList.remove("expanded");
        }
    }

    function addCategory() {
        const categoryName = document.getElementById("newCategoryName").value.trim();
        const parentCategory = document.getElementById("parentCategory").value;
        if (!categoryName) return alert("Category name cannot be empty!");

        let target = categories;
        if (parentCategory) {
            parentCategory.split("/").forEach(part => target = target[part]);
        }
        if (!target[categoryName]) target[categoryName] = {};
        document.getElementById("newCategoryName").value = "";
        updateCategoryDropdowns();
        renderCategories();
    }

    function deleteCategory(categoryPath) {
        if (!isAdmin) return; // Prevent deletion if not admin

        let target = categories;
        const pathParts = categoryPath.split("/");
        for (let i = 0; i < pathParts.length - 1; i++) target = target[pathParts[i]];
        delete target[pathParts[pathParts.length - 1]];
        updateCategoryDropdowns();
        renderCategories();
    }

    function addProduct() {
        const productName = document.getElementById("productName").value.trim();
        const productCategory = document.getElementById("productCategory").value;
        if (!productName || !productCategory) return alert("Both product name and category are required!");
        products.push({ name: productName, category: productCategory });
        document.getElementById("productName").value = "";
        displayProducts();
    }

    function updateCategoryDropdowns() {
        const categorySelect = document.getElementById("parentCategory");
        const productCategorySelect = document.getElementById("productCategory");
        categorySelect.innerHTML = '<option value="">(Ei Yliluokkaa - Pääluokka)</option>';
        productCategorySelect.innerHTML = '<option value="">Valitse kategoria</option>';
        function populateOptions(obj, prefix = "") {
            for (let category in obj) {
                const fullPath = prefix ? `${prefix}/${category}` : category;
                categorySelect.innerHTML += `<option value="${fullPath}">${fullPath}</option>`;
                productCategorySelect.innerHTML += `<option value="${fullPath}">${fullPath}</option>`;
                populateOptions(obj[category], fullPath);
            }
        }
        populateOptions(categories);
    }

    function showSection(sectionName) {
        document.querySelectorAll("section").forEach(section => section.style.display = "none");
        document.getElementById(sectionName).style.display = "block";
    }

    function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === "a" && password === "1") {
            isAdmin = true;
            document.getElementById("kirjaudu").style.display = "none";
            document.getElementById("adminPanelBtn").style.display = "block";
            renderCategories();
        } else {
            alert("Väärä salasana!");
        }
    }

    function showAdmin() {
        document.getElementById("adminPanel").style.display = "block";
    }

    function logout() {
        isAdmin = false;
        document.getElementById("adminPanel").style.display = "none";
        document.getElementById("kirjaudu").style.display = "block";
        document.getElementById("adminPanelBtn").style.display = "none";
        renderCategories();
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showSection(this.getAttribute("data-section"));
            document.querySelector("nav ul").classList.remove("show");
        });
    });

    window.showAdmin = showAdmin;
    window.logout = logout;
    window.addProduct = addProduct;
    window.addCategory = addCategory;
    window.deleteCategory = deleteCategory;
    window.login = login;
    window.toggleSubcategory = toggleSubcategory;

    renderCategories();
    updateCategoryDropdowns();
    displayProducts();
    showSection("koti");
});