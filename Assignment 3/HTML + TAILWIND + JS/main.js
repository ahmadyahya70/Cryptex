 // Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Navigation (Tailwind version)
    initTailwindMobileNav();

    // Legacy Mobile Navigation (for non-Tailwind pages)
    initMobileNav();

    // Form Validation
    initFormValidation();

    // Crypto Price Updates (simulate real-time updates)
    initCryptoPriceUpdates();

    // Exchange Page Functionality
    initExchangePage();
});

// Tailwind Mobile Navigation Toggle
function initTailwindMobileNav() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", function () {
            // Toggle the 'hidden' class on the mobile menu
            mobileMenu.classList.toggle("hidden");

            // Update aria-expanded attribute
            const isExpanded = mobileMenu.classList.contains("hidden")
                ? "false"
                : "true";
            mobileMenuButton.setAttribute("aria-expanded", isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function (event) {
            if (
                !mobileMenu.contains(event.target) &&
                !mobileMenuButton.contains(event.target) &&
                !mobileMenu.classList.contains("hidden")
            ) {
                mobileMenu.classList.add("hidden");
                mobileMenuButton.setAttribute("aria-expanded", "false");
            }
        });
    }
}

// Legacy Mobile Navigation Toggle
function initMobileNav() {
    const navbarToggle = document.querySelector(".navbar-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (navbarToggle && mobileMenu) {
        navbarToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("active");
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function (event) {
            if (
                !mobileMenu.contains(event.target) &&
                !navbarToggle.contains(event.target) &&
                mobileMenu.classList.contains("active")
            ) {
                mobileMenu.classList.remove("active");
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    // Contact Form
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form fields
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            const statusEl = document.getElementById("contact-status");

            // Reset previous errors
            clearErrors([name, email, message]);

            // Validate
            let isValid = true;

            if (!name.value.trim()) {
                showError(name, "Name is required");
                isValid = false;
            }

            if (!validateEmail(email.value)) {
                showError(email, "Please enter a valid email");
                isValid = false;
            }

            if (!message.value.trim()) {
                showError(message, "Message is required");
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send the form data to a server here
                statusEl.textContent =
                    "Message sent successfully! We'll get back to you soon.";
                statusEl.className = "form-status success";
                contactForm.reset();

                // Hide success message after 3 seconds
                setTimeout(() => {
                    statusEl.textContent = "";
                    statusEl.className = "form-status";
                }, 3000);
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form fields
            const email = document.getElementById("login-email");
            const password = document.getElementById("login-password");
            const statusEl = document.getElementById("login-status");

            // Reset previous errors
            clearErrors([email, password]);

            // Validate
            let isValid = true;

            if (!validateEmail(email.value)) {
                showError(email, "Please enter a valid email");
                isValid = false;
            }

            if (!password.value) {
                showError(password, "Password is required");
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send the login data to a server here
                statusEl.textContent = "Login successful!";
                statusEl.className = "form-status success";
                loginForm.reset();

                // Simulate redirect to dashboard
                setTimeout(() => {
                    // window.location.href = 'dashboard.html';
                    statusEl.textContent =
                        "This is a demo. In a real app, you would be redirected to your dashboard.";
                }, 2000);
            }
        });
    }

    // Register Form
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form fields
            const firstName = document.getElementById("first-name");
            const lastName = document.getElementById("last-name");
            const email = document.getElementById("register-email");
            const password = document.getElementById("register-password");
            const confirmPassword = document.getElementById("confirm-password");
            const terms = document.getElementById("terms");
            const statusEl = document.getElementById("register-status");
            const termsError = document.getElementById("terms-error");

            // Reset previous errors
            clearErrors([
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            ]);
            if (termsError) termsError.textContent = "";

            // Validate
            let isValid = true;

            if (!firstName.value.trim()) {
                showError(firstName, "First name is required");
                isValid = false;
            }

            if (!lastName.value.trim()) {
                showError(lastName, "Last name is required");
                isValid = false;
            }

            if (!validateEmail(email.value)) {
                showError(email, "Please enter a valid email");
                isValid = false;
            }

            if (!password.value || password.value.length < 8) {
                showError(password, "Password must be at least 8 characters");
                isValid = false;
            }

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, "Passwords do not match");
                isValid = false;
            }

            if (!terms.checked) {
                if (termsError)
                    termsError.textContent = "You must agree to the terms";
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send the registration data to a server here
                statusEl.textContent = "Registration successful!";
                statusEl.className = "form-status success";
                registerForm.reset();

                // Simulate redirect to login
                setTimeout(() => {
                    // window.location.href = 'login.html';
                    statusEl.textContent =
                        "This is a demo. In a real app, you would be redirected to login.";
                }, 2000);
            }
        });
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show error message
function showError(input, message) {
    input.classList.add("error");

    // Create error message element if it doesn't exist
    const formGroup = input.closest(".form-group");
    let errorEl = formGroup.querySelector(".form-error");

    if (!errorEl) {
        errorEl = document.createElement("div");
        errorEl.className = "form-error";
        formGroup.appendChild(errorEl);
    }

    errorEl.textContent = message;
}

// Clear error messages
function clearErrors(inputs) {
    inputs.forEach((input) => {
        input.classList.remove("error");

        const formGroup = input.closest(".form-group");
        const errorEl = formGroup.querySelector(".form-error");
        if (errorEl) {
            errorEl.textContent = "";
        }
    });
}

// Simulate real-time crypto price updates
function initCryptoPriceUpdates() {
    const cryptoPrices = document.querySelectorAll(".crypto-price");
    const cryptoChanges = document.querySelectorAll(".crypto-change");

    if (cryptoPrices.length > 0) {
        // Update every 5 seconds
        setInterval(() => {
            cryptoPrices.forEach((priceEl, index) => {
                // Get current price
                const currentPrice = parseFloat(
                    priceEl.textContent.replace("$", "").replace(",", ""),
                );

                // Generate random change (-2% to +2%)
                const changePercent = (Math.random() * 4 - 2) / 100;
                const newPrice = currentPrice * (1 + changePercent);

                // Format new price
                priceEl.textContent =
                    "$" +
                    newPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });

                // Update change percentage
                if (index < cryptoChanges.length) {
                    const changeValue = parseFloat(
                        cryptoChanges[index].textContent.replace("%", ""),
                    );
                    const newChangeValue = changeValue + changePercent * 100;

                    cryptoChanges[index].textContent =
                        (newChangeValue > 0 ? "+" : "") +
                        newChangeValue.toFixed(2) +
                        "%";

                    if (newChangeValue > 0) {
                        cryptoChanges[index].classList.add("up");
                        cryptoChanges[index].classList.remove("down");
                    } else {
                        cryptoChanges[index].classList.add("down");
                        cryptoChanges[index].classList.remove("up");
                    }
                }
            });
        }, 5000);
    }
}

// Make sure the active page is highlighted in navigation
function setActiveNavLink() {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    // Legacy navigation (non-Tailwind)
    const legacyNavLinks = document.querySelectorAll(
        ".navbar-menu a, .mobile-menu a",
    );
    legacyNavLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Tailwind desktop navigation
    const tailwindDesktopLinks = document.querySelectorAll(".md\\:flex a");
    tailwindDesktopLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.remove("border-transparent");
            link.classList.add("border-primary", "text-primary");
        }
    });

    // Tailwind mobile navigation
    const tailwindMobileLinks = document.querySelectorAll("#mobile-menu a");
    tailwindMobileLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("text-primary", "border-primary");
            link.classList.remove("text-gray-700", "border-transparent");
        }
    });
}

// Call setActiveNavLink when the page loads
window.addEventListener("load", setActiveNavLink);

// Exchange Page Functionality
function initExchangePage() {
    // Check if on exchange page
    if (!document.querySelector(".exchange-section")) return;

    // Initialize Exchange Page Components
    initTradingPairs();
    initOrderForm();
    initOrderBook();
    initMarketTable();
    initTickerAnimation();
    initChartPlaceholder();
}

// Initialize Trading Pairs List
function initTradingPairs() {
    const pairList = document.getElementById("pair-list");
    if (!pairList) return;

    // Sample trading pairs data
    const tradingPairs = [
        { symbol: "BTC/USDT", price: 36789.21, change: 2.34, isFavorite: true },
        { symbol: "ETH/USDT", price: 2489.65, change: 3.87, isFavorite: true },
        { symbol: "SOL/USDT", price: 104.52, change: 5.67, isFavorite: true },
        { symbol: "BNB/USDT", price: 317.45, change: -1.21, isFavorite: false },
        { symbol: "ADA/USDT", price: 1.23, change: -1.25, isFavorite: false },
        { symbol: "XRP/USDT", price: 0.57, change: 0.89, isFavorite: false },
        { symbol: "DOT/USDT", price: 13.78, change: 2.12, isFavorite: false },
        { symbol: "DOGE/USDT", price: 0.076, change: -3.42, isFavorite: false },
    ];

    // Filter favorites initially
    renderTradingPairs(tradingPairs.filter((pair) => pair.isFavorite));

    // Handle pair tab clicks
    const pairTabs = document.querySelectorAll(".pair-tab");
    pairTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            // Remove active class from all tabs
            pairTabs.forEach((t) => t.classList.remove("active"));
            // Add active class to clicked tab
            this.classList.add("active");

            // Filter pairs based on selected tab
            const tabType = this.getAttribute("data-tab");
            let filteredPairs;

            if (tabType === "favorites") {
                filteredPairs = tradingPairs.filter((pair) => pair.isFavorite);
            } else if (tabType === "btc") {
                filteredPairs = tradingPairs.filter((pair) =>
                    pair.symbol.startsWith("BTC"),
                );
            } else if (tabType === "eth") {
                filteredPairs = tradingPairs.filter((pair) =>
                    pair.symbol.startsWith("ETH"),
                );
            } else if (tabType === "usdt") {
                filteredPairs = tradingPairs;
            }

            renderTradingPairs(filteredPairs);
        });
    });

    // Handle pair search
    const pairSearch = document.getElementById("pair-search");
    if (pairSearch) {
        pairSearch.addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            const filteredPairs = tradingPairs.filter((pair) =>
                pair.symbol.toLowerCase().includes(searchTerm),
            );
            renderTradingPairs(filteredPairs);
        });
    }

    // Render trading pairs to the DOM
    function renderTradingPairs(pairs) {
        pairList.innerHTML = "";

        pairs.forEach((pair) => {
            const pairItem = document.createElement("div");
            pairItem.className = "pair-item";
            pairItem.innerHTML = `
                <div class="pair-symbol">${pair.symbol}</div>
                <div class="pair-price">${pair.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: pair.price < 1 ? 6 : 2 })}</div>
                <div class="pair-change ${pair.change >= 0 ? "up" : "down"}">${pair.change >= 0 ? "+" : ""}${pair.change.toFixed(2)}%</div>
                <button class="favorite-btn ${pair.isFavorite ? "active" : ""}">
                    <i class="fas fa-star"></i>
                </button>
            `;

            // Handle pair selection
            pairItem.addEventListener("click", function (e) {
                if (e.target.closest(".favorite-btn")) {
                    // Toggle favorite status
                    const index = tradingPairs.findIndex(
                        (p) => p.symbol === pair.symbol,
                    );
                    if (index !== -1) {
                        tradingPairs[index].isFavorite =
                            !tradingPairs[index].isFavorite;
                        e.target
                            .closest(".favorite-btn")
                            .classList.toggle("active");
                    }
                } else {
                    // Update active trading pair
                    document.querySelectorAll(".pair-item").forEach((item) => {
                        item.classList.remove("active");
                    });
                    this.classList.add("active");

                    // Update chart
                    document.getElementById("chart-pair").textContent =
                        pair.symbol;
                    document.getElementById("current-price").textContent =
                        "$" +
                        pair.price.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: pair.price < 1 ? 6 : 2,
                        });
                    document.getElementById("price-change").textContent =
                        `${pair.change >= 0 ? "+" : ""}${pair.change.toFixed(2)}%`;
                    document.getElementById("price-change").className =
                        `price-change ${pair.change >= 0 ? "up" : "down"}`;

                    // Update order form
                    const symbol = pair.symbol.split("/")[0];
                    document.getElementById("buy-btn").textContent =
                        `Buy ${symbol}`;
                    document.getElementById("sell-btn").textContent =
                        `Sell ${symbol}`;

                    // Update order book
                    renderOrderBook(pair.symbol, pair.price);
                }
            });

            pairList.appendChild(pairItem);
        });

        // Select first pair by default if none is selected
        if (pairs.length > 0 && !document.querySelector(".pair-item.active")) {
            pairList.querySelector(".pair-item").classList.add("active");
        }
    }
}

// Initialize Order Form
function initOrderForm() {
    const orderForm = document.getElementById("trade-form");
    if (!orderForm) return;

    // Order type change handler
    const orderTypeSelect = document.getElementById("order-type");
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener("change", function () {
            const limitPriceGroup = document.querySelector(".limit-price");
            if (this.value === "market") {
                limitPriceGroup.classList.add("hide-on-market");
            } else {
                limitPriceGroup.classList.remove("hide-on-market");
            }
        });
    }

    // Toggle between buy and sell
    const orderTabs = document.querySelectorAll(".order-tab");
    const buyBtn = document.getElementById("buy-btn");
    const sellBtn = document.getElementById("sell-btn");

    orderTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            // Update active tab
            orderTabs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");

            // Show/hide appropriate button
            const orderType = this.getAttribute("data-order");
            if (orderType === "buy") {
                buyBtn.classList.remove("hide");
                sellBtn.classList.add("hide");
                orderForm.classList.remove("sell-mode");
                orderForm.classList.add("buy-mode");
            } else {
                buyBtn.classList.add("hide");
                sellBtn.classList.remove("hide");
                orderForm.classList.remove("buy-mode");
                orderForm.classList.add("sell-mode");
            }
        });
    });

    // Amount slider functionality
    const amountSlider = document.getElementById("amount-slider");
    const amountInput = document.getElementById("amount");
    const totalInput = document.getElementById("total");

    if (amountSlider && amountInput && totalInput) {
        amountSlider.addEventListener("input", function () {
            const percent = parseInt(this.value);
            // In a real app, this would calculate based on available balance
            const maxAmount = 1.0; // Example max BTC available
            const currentPrice = parseFloat(
                document
                    .getElementById("current-price")
                    .textContent.replace("$", "")
                    .replace(",", ""),
            );

            const amount = ((maxAmount * percent) / 100).toFixed(8);
            amountInput.value = amount;
            totalInput.value = (amount * currentPrice).toFixed(2);
        });

        // Calculate total when amount changes
        amountInput.addEventListener("input", function () {
            const amount = parseFloat(this.value) || 0;
            const currentPrice = parseFloat(
                document
                    .getElementById("current-price")
                    .textContent.replace("$", "")
                    .replace(",", ""),
            );
            totalInput.value = (amount * currentPrice).toFixed(2);
        });

        // Calculate amount when total changes
        totalInput.addEventListener("input", function () {
            const total = parseFloat(this.value) || 0;
            const currentPrice = parseFloat(
                document
                    .getElementById("current-price")
                    .textContent.replace("$", "")
                    .replace(",", ""),
            );
            amountInput.value = (total / currentPrice).toFixed(8);
        });
    }

    // Buy/Sell button click handler
    if (buyBtn) {
        buyBtn.addEventListener("click", handleTradeSubmission);
    }

    if (sellBtn) {
        sellBtn.addEventListener("click", handleTradeSubmission);
    }

    // Trade submission handler
    function handleTradeSubmission() {
        const isBuy = this.id === "buy-btn";
        const orderType = orderTypeSelect.value;
        const amount = parseFloat(amountInput.value);
        const total = parseFloat(totalInput.value);

        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (orderType !== "market") {
            const limitPrice = parseFloat(
                document.getElementById("limit-price").value,
            );
            if (!limitPrice || limitPrice <= 0) {
                alert("Please enter a valid limit price");
                return;
            }
        }

        // In a real app, this would submit the order to the server
        const symbol = document.getElementById("chart-pair").textContent;
        alert(
            `${isBuy ? "Buy" : "Sell"} order placed: ${amount} ${symbol.split("/")[0]} for $${total.toFixed(2)}`,
        );

        // Reset form
        amountInput.value = "";
        totalInput.value = "";
        amountSlider.value = 0;
        if (orderType !== "market") {
            document.getElementById("limit-price").value = "";
        }
    }
}

// Initialize Order Book
function initOrderBook() {
    // Initial order book rendering with default pair
    renderOrderBook("BTC/USDT", 36789.21);
}

// Render Order Book for a specific pair
function renderOrderBook(symbol, price) {
    const sellOrders = document.getElementById("sell-orders");
    const buyOrders = document.getElementById("buy-orders");
    const currentPriceDisplay = document.getElementById("ob-current-price");

    if (!sellOrders || !buyOrders || !currentPriceDisplay) return;

    // Update current price display
    currentPriceDisplay.textContent = price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Generate random order book data
    const generateOrders = (basePrice, count, isSell) => {
        const orders = [];
        const priceStep = basePrice * 0.0005; // 0.05% steps

        for (let i = 0; i < count; i++) {
            const priceOffset = priceStep * (i + 1);
            const orderPrice = isSell
                ? basePrice + priceOffset
                : basePrice - priceOffset;
            const amount = (Math.random() * 2 + 0.01).toFixed(6);
            const total = (orderPrice * parseFloat(amount)).toFixed(2);

            orders.push({ price: orderPrice, amount, total });
        }

        return orders;
    };

    // Generate and render sell orders (asks)
    const sellOrdersData = generateOrders(price, 8, true).reverse();
    sellOrders.innerHTML = "";
    sellOrdersData.forEach((order) => {
        const orderRow = document.createElement("div");
        orderRow.className = "order-row sell";
        orderRow.innerHTML = `
            <span class="price">${order.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span class="amount">${order.amount}</span>
            <span class="total">${order.total}</span>
        `;
        sellOrders.appendChild(orderRow);
    });

    // Generate and render buy orders (bids)
    const buyOrdersData = generateOrders(price, 8, false);
    buyOrders.innerHTML = "";
    buyOrdersData.forEach((order) => {
        const orderRow = document.createElement("div");
        orderRow.className = "order-row buy";
        orderRow.innerHTML = `
            <span class="price">${order.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span class="amount">${order.amount}</span>
            <span class="total">${order.total}</span>
        `;
        buyOrders.appendChild(orderRow);
    });
}

// Initialize Market Table
function initMarketTable() {
    const cryptoList = document.getElementById("crypto-list");
    if (!cryptoList) return;

    // Sample cryptocurrency market data
    const cryptoData = [
        {
            rank: 1,
            name: "Bitcoin",
            symbol: "BTC",
            price: 36789.21,
            change: 2.34,
            marketCap: 718.5,
            volume: 23.4,
            supply: 19.5,
        },
        {
            rank: 2,
            name: "Ethereum",
            symbol: "ETH",
            price: 2489.65,
            change: 3.87,
            marketCap: 298.7,
            volume: 15.2,
            supply: 120.1,
        },
        {
            rank: 3,
            name: "Binance Coin",
            symbol: "BNB",
            price: 317.45,
            change: -1.21,
            marketCap: 49.3,
            volume: 2.1,
            supply: 155.3,
        },
        {
            rank: 4,
            name: "Solana",
            symbol: "SOL",
            price: 104.52,
            change: 5.67,
            marketCap: 45.2,
            volume: 3.8,
            supply: 432.6,
        },
        {
            rank: 5,
            name: "Cardano",
            symbol: "ADA",
            price: 1.23,
            change: -1.25,
            marketCap: 43.1,
            volume: 1.9,
            supply: 35032.2,
        },
        {
            rank: 6,
            name: "XRP",
            symbol: "XRP",
            price: 0.57,
            change: 0.89,
            marketCap: 30.5,
            volume: 1.3,
            supply: 53513.7,
        },
        {
            rank: 7,
            name: "Polkadot",
            symbol: "DOT",
            price: 13.78,
            change: 2.12,
            marketCap: 17.2,
            volume: 0.8,
            supply: 1248.6,
        },
        {
            rank: 8,
            name: "Dogecoin",
            symbol: "DOGE",
            price: 0.076,
            change: -3.42,
            marketCap: 10.8,
            volume: 0.9,
            supply: 141742.0,
        },
    ];

    // Render market data table
    renderCryptoTable(cryptoData);

    // Filter button functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Update active filter
            filterButtons.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");

            // Filter data based on selected filter
            const filterType = this.getAttribute("data-filter");
            let filteredData = [...cryptoData];

            if (filterType === "gainers") {
                filteredData = cryptoData
                    .filter((crypto) => crypto.change > 0)
                    .sort((a, b) => b.change - a.change);
            } else if (filterType === "losers") {
                filteredData = cryptoData
                    .filter((crypto) => crypto.change < 0)
                    .sort((a, b) => a.change - b.change);
            } else if (filterType === "volume") {
                filteredData = [...cryptoData].sort(
                    (a, b) => b.volume - a.volume,
                );
            }

            renderCryptoTable(filteredData);
        });
    });

    // Search functionality
    const cryptoSearch = document.getElementById("crypto-search");
    if (cryptoSearch) {
        cryptoSearch.addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = cryptoData.filter(
                (crypto) =>
                    crypto.name.toLowerCase().includes(searchTerm) ||
                    crypto.symbol.toLowerCase().includes(searchTerm),
            );
            renderCryptoTable(filteredData);
        });
    }

    // Sorting functionality
    const sortableHeaders = document.querySelectorAll(".sortable");
    sortableHeaders.forEach((header) => {
        header.addEventListener("click", function () {
            const sortField = this.getAttribute("data-sort");
            const currentDirection =
                this.getAttribute("data-direction") || "desc";
            const newDirection = currentDirection === "desc" ? "asc" : "desc";

            // Update sort direction
            sortableHeaders.forEach((h) => {
                h.removeAttribute("data-direction");
                h.classList.remove("sort-asc", "sort-desc");
            });
            this.setAttribute("data-direction", newDirection);
            this.classList.add(`sort-${newDirection}`);

            // Sort data
            const sortedData = [...cryptoData].sort((a, b) => {
                if (newDirection === "asc") {
                    return a[sortField] > b[sortField] ? 1 : -1;
                } else {
                    return a[sortField] < b[sortField] ? 1 : -1;
                }
            });

            renderCryptoTable(sortedData);
        });
    });

    // Function to render crypto table
    function renderCryptoTable(data) {
        cryptoList.innerHTML = "";

        data.forEach((crypto) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${crypto.rank}</td>
                <td>
                    <div class="crypto-name-cell">
                        <img src="https://cryptologos.cc/logos/${crypto.name.toLowerCase()}-${crypto.symbol.toLowerCase()}-logo.png" alt="${crypto.name}" class="crypto-logo">
                        <div>
                            <span class="crypto-fullname">${crypto.name}</span>
                            <span class="crypto-symbol">${crypto.symbol}</span>
                        </div>
                    </div>
                </td>
                <td>$${crypto.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: crypto.price < 1 ? 6 : 2 })}</td>
                <td class="${crypto.change >= 0 ? "up" : "down"}">${crypto.change >= 0 ? "+" : ""}${crypto.change.toFixed(2)}%</td>
                <td>$${crypto.marketCap.toFixed(1)}B</td>
                <td>$${crypto.volume.toFixed(1)}B</td>
                <td>${crypto.supply.toLocaleString("en-US", { maximumFractionDigits: 1 })}M</td>
                <td>
                    <button class="btn btn-sm btn-primary">Trade</button>
                </td>
            `;

            // Trade button click handler
            const tradeBtn = row.querySelector(".btn-primary");
            tradeBtn.addEventListener("click", function () {
                // Update chart pair and scroll to trading area
                document.getElementById("chart-pair").textContent =
                    `${crypto.symbol}/USDT`;
                document.getElementById("current-price").textContent =
                    "$" +
                    crypto.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: crypto.price < 1 ? 6 : 2,
                    });
                document.getElementById("price-change").textContent =
                    `${crypto.change >= 0 ? "+" : ""}${crypto.change.toFixed(2)}%`;
                document.getElementById("price-change").className =
                    `price-change ${crypto.change >= 0 ? "up" : "down"}`;

                // Update order form
                document.getElementById("buy-btn").textContent =
                    `Buy ${crypto.symbol}`;
                document.getElementById("sell-btn").textContent =
                    `Sell ${crypto.symbol}`;

                // Update order book
                renderOrderBook(`${crypto.symbol}/USDT`, crypto.price);

                // Scroll to trading area
                document
                    .querySelector(".trading-area")
                    .scrollIntoView({ behavior: "smooth" });
            });

            cryptoList.appendChild(row);
        });
    }
}

// Initialize ticker animation
function initTickerAnimation() {
    const tickerItems = document.getElementById("ticker-items");
    if (!tickerItems) return;

    // Create animation effect
    function animateTicker() {
        const firstItem = tickerItems.firstElementChild;
        const width = firstItem.offsetWidth;

        // Animate the first item out
        firstItem.style.marginLeft = `-${width}px`;

        // After animation completes, move the first item to the end
        setTimeout(() => {
            firstItem.style.marginLeft = "0";
            tickerItems.appendChild(firstItem);
        }, 500);
    }

    // Run the animation every 3 seconds
    setInterval(animateTicker, 3000);
}

// Initialize chart placeholder with random data visualization
function initChartPlaceholder() {
    const chartPlaceholder = document.querySelector(".chart-placeholder");
    if (!chartPlaceholder) return;

    // Create random chart pattern
    const chartLines = chartPlaceholder.querySelectorAll(".chart-line");
    chartLines.forEach((line, index) => {
        const points = [];
        const segments = 20;

        // Generate random points
        for (let i = 0; i < segments; i++) {
            const yPosition = 30 + Math.random() * 40; // Random height (30-70% of container)
            points.push(
                `${((i * 100) / segments).toFixed(2)}% ${yPosition.toFixed(2)}%`,
            );
        }

        // Create polyline
        const polyline = document.createElement("polyline");
        polyline.setAttribute("points", points.join(" "));
        polyline.style.fill = "none";
        polyline.style.stroke = `rgba(var(--primary-rgb), ${0.8 - index * 0.15})`; // Decreasing opacity for deeper lines
        polyline.style.strokeWidth = "2px";

        line.appendChild(polyline);
    });

    // Update chart randomly every 2 seconds to simulate price changes
    setInterval(() => {
        chartLines.forEach((line) => {
            const polyline = line.querySelector("polyline");
            const points = polyline.getAttribute("points").split(" ");

            // Modify random points slightly
            const newPoints = points.map((point) => {
                const [x, y] = point.split("%");
                const newY = Math.max(
                    10,
                    Math.min(90, parseFloat(y) + (Math.random() * 6 - 3)),
                );
                return `${x}% ${newY.toFixed(2)}%`;
            });

            polyline.setAttribute("points", newPoints.join(" "));
        });
    }, 2000);
}
