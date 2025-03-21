document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    function toggleMenu() {
        document.querySelector("nav ul").classList.toggle("show");
    }
    document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);

    function addProduct() {
        const productName = document.getElementById("productName").value;
        const productCategory = document.getElementById("productCategory").value;
        if (productName.trim() === "") {
            alert("Product name cannot be empty.");
            return;
        }

    // Event listeners for navigation links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            const sectionName = this.getAttribute("data-section"); // Get section name
            showSection(sectionName);
            document.querySelector("nav ul").classList.remove("show"); // Close menu on mobile
        });
    });

    function showSection(sectionName) {
        document.querySelectorAll("section").forEach(section => {
            section.style.display = "none";
        });

        document.getElementById(sectionName).style.display = "block";
    }
    // Product Data (Temporary until you connect to a database)
    const products = [
        { name: "Mountain Bike", category: "bicycles" },
        { name: "Road Bike", category: "bicycles" },
        { name: "Ski Poles", category: "skiing" },
        { name: "Chainsaw", category: "forestry" },
        { name: "Tent", category: "summer" }
    ];

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
    displayProducts();

    document.querySelectorAll("#categoryList li").forEach(category => {
        category.addEventListener("click", function () {
            const selectedCategory = this.getAttribute("data-category");
            displayProducts(selectedCategory);
        });
    });
    function addProduct() {
        const productName = document.getElementById("productName").value.trim();
        const productCategory = document.getElementById("productCategory").value;

        if (productName === "") {
            alert("Product name cannot be empty.");
            return;
        }

        products.push({ name: productName, category: productCategory });
        displayProducts();
        document.getElementById("productName").value = "";
    }

    function removeProduct(productName) {
        const index = products.findIndex(product => product.name === productName);
        if (index !== -1) {
            products.splice(index, 1);
            displayProducts();
        }
    }

    // Category filter event listener
    document.querySelectorAll("#categoryList li").forEach(category => {
        category.addEventListener("click", function () {
            const selectedCategory = this.getAttribute("data-category");
            displayProducts(selectedCategory);
        });
    });

    // Show all products by default
    displayProducts();

    // Expose functions globally
    window.addProduct = addProduct;
    window.onload = function() {
        showSection("koti")
      };
      document.getElementById(sectionName).style.display = "block";
    };
})
