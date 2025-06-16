// import images as relative image path won't work with vite/vercel.
import check from '../assets/check.svg'
import star from '../assets/star.svg'
import sushi12 from '../assets/sushi-12.png'
import sushi11 from '../assets/sushi-11.png'
import sushi10 from '../assets/sushi-10.png'
import sushi9 from '../assets/sushi-9.png';
import sushi8 from '../assets/sushi-8.png';
import sushi7 from '../assets/sushi-7.png';
import sushi6 from '../assets/sushi-6.png';
import sushi4 from '../assets/sushi-4.png';

// Ramen Image Imports
import ramen1 from '../assets/ramen-1.png';
import ramen2 from '../assets/ramen-2.png';
import ramen3 from '../assets/ramen-3.png';

// New Sushi Image Imports
import sushi13 from '../assets/sushi-13.png';
import sushi14 from '../assets/sushi-14.png';
import sushi15 from '../assets/sushi-15.png';

// New Udon Image Imports
import udon1 from '../assets/udon-1.png';
import udon2 from '../assets/udon-2.png';

// New Curry Image Imports
import curry1 from '../assets/curry-1.png';
import curry2 from '../assets/curry-2.png';
import curry3 from '../assets/curry-3.png';

// New Omelete Image Import
import omelete from '../assets/omelete.png';

// New Tea Image Import
import tea from '../assets/tea.png';


// AOS library is now loaded via CDN in index.html, so no import needed here.
// The following import lines are removed from this script for consistency with CDN loading:
// import AOS from "aos";
// import "aos/dist/aos.css";

// init AOS animation - AOS will be globally available from CDN
AOS.init({
    duration: 1000,
    offset: 100,
});

// --- Search Bar Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.querySelector('.header__search-input');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.blur();
            }
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (!searchIcon.contains(document.activeElement)) {
                    searchInput.classList.remove('active');
                }
            }, 100);
        });

        searchInput.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // --- Master List of All Available Food Items (for Order Modal and Popular Foods Filtering) ---
    const allAvailableFoods = [
        { id: "chezu-sushi", title: "Chezu Sushi", price: 21.00, image: sushi12, type: "sushi", rating: "4.9", description: "A delightful sushi roll filled with creamy cheese and fresh ingredients, a modern twist on a classic." },
        { id: "original-sushi", title: "Original Sushi", price: 17.00, image: sushi11, type: "sushi", rating: "5.0", description: "The timeless classic, perfectly rolled with fresh fish and seasoned rice, embodying traditional Japanese taste." },
        { id: "classic-ramen", title: "Classic Ramen", price: 18.00, image: sushi10, type: "ramen", rating: "4.5", description: "A rich and savory broth with springy noodles, topped with tender pork and a soft-boiled egg." },
        { id: "ikigai-sushi", title: "Ikigai Sushi", price: 25.00, image: sushi9, type: "sushi", rating: "4.7", description: "Our signature sushi, meticulously crafted with premium ingredients for a truly exquisite experience." },
        { id: "dragon-noodle-ramen", title: "Dragon Noodle Ramen", price: 22.50, image: sushi8, type: "ramen", rating: "4.6", description: "Fiery and flavorful ramen, packed with tender chicken, fresh vegetables, and a spicy broth." },
        { id: "tempura-udon", title: "Tempura Udon", price: 19.00, image: sushi7, type: "udon", rating: "4.8", description: "Thick, chewy udon noodles in a clear broth, served with crispy, golden tempura." },
        { id: "spicy-miso-ramen", title: "Spicy Miso Ramen", price: 20.00, image: ramen1, type: "ramen", rating: "4.7", description: "A bold and spicy miso broth with firm noodles, topped with corn, seaweed, and tender chashu." },
        { id: "shoyu-ramen-delight", title: "Shoyu Ramen Delight", price: 19.50, image: ramen2, type: "ramen", rating: "4.8", description: "A light yet flavorful soy-sauce based ramen, with a hint of sweetness and savory depth." },
        { id: "tonkotsu-ramen-supreme", title: "Tonkotsu Ramen Supreme", price: 24.00, image: ramen3, type: "ramen", rating: "4.9", description: "A deeply rich and creamy pork bone broth, slow-cooked to perfection, with succulent pork belly." },
        // --- New Sushi Items ---
        { id: "salmon-nigiri", title: "Salmon Nigiri", price: 12.00, image: sushi13, type: "sushi", rating: "4.9", description: "Fresh slices of premium salmon atop perfectly seasoned sushi rice, a simple yet elegant choice." },
        { id: "tuna-sashimi", title: "Tuna Sashimi", price: 15.00, image: sushi14, type: "sushi", rating: "4.8", description: "Thick cuts of fresh, vibrant tuna served raw, highlighting its natural flavor and texture." },
        { id: "california-roll", title: "California Roll", price: 10.50, image: sushi15, type: "sushi", rating: "4.7", description: "A popular inside-out roll with crab stick, avocado, and cucumber, a delightful blend of textures." },
        // --- New Udon Items ---
        { id: "kitsune-udon", title: "Kitsune Udon", price: 16.00, image: udon1, type: "udon", rating: "4.6", description: "Simple yet satisfying udon with a sweet deep-fried tofu pouch (aburaage) in a savory broth." },
        { id: "tempura-zaru-udon", title: "Tempura Zaru Udon", price: 21.00, image: udon2, type: "udon", rating: "4.8", description: "Chilled udon noodles served with a dipping sauce and assorted crispy tempura on the side." },
        // --- New Curry Items ---
        { id: "japanese-chicken-curry", title: "Japanese Chicken Curry", price: 22.00, image: curry1, type: "curry", rating: "4.8", description: "Tender chicken pieces simmered in a rich, mild, and slightly sweet Japanese curry sauce." },
        { id: "vegetable-katsu-curry", title: "Vegetable Katsu Curry", price: 19.00, image: curry2, type: "curry", rating: "4.6", description: "Crispy fried vegetable cutlets served with a generous portion of delicious Japanese curry." },
        { id: "beef-curry-rice", title: "Beef Curry Rice", price: 25.00, image: curry3, type: "curry", rating: "4.9", description: "Hearty beef chunks and vegetables slow-cooked in a robust curry sauce, served over rice." },
        // --- New Omelete Item ---
        { id: "japanese-omelete", title: "Japanese Omelete", price: 11.00, image: omelete, type: "other", rating: "4.5", description: "A fluffy and slightly sweet Japanese rolled omelete, known as Tamagoyaki, perfect as a side dish or light meal." },
        // --- New Tea Image Imports
        { id: "iced-matcha-latte", title: "Iced Matcha Latte", price: 7.50, image: tea, type: "drink", rating: "4.6", description: "A refreshing blend of ceremonial grade matcha green tea with milk, served over ice." },
        { id: "hot-sencha-tea", title: "Hot Sencha Tea", price: 6.00, image: sushi4, type: "drink", rating: "4.7", description: "A classic Japanese green tea, known for its fresh, grassy flavor and vibrant color." }
    ];

    // --- Popular Foods Section Filtering Logic ---
    const popularFoodCatalogue = document.querySelector('.popular-foods__catalogue');
    const filterButtons = document.querySelectorAll('.popular-foods__filter-btn');

    function renderPopularFoods(filterType) {
        popularFoodCatalogue.innerHTML = '';

        let foodsToDisplay = [];
        if (filterType === 'best-seller') {
            const originalSushi = allAvailableFoods.find(food => food.id === 'original-sushi');
            const salmonNigiri = allAvailableFoods.find(food => food.id === 'salmon-nigiri');

            let otherFoods = allAvailableFoods
                .filter(food => food.id !== 'original-sushi' && food.id !== 'salmon-nigiri')
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

            const firstBestItem = otherFoods[0];

            foodsToDisplay = [];
            if (firstBestItem) {
                foodsToDisplay.push(firstBestItem);
            }
            if (originalSushi) {
                foodsToDisplay.push(originalSushi);
            }
            if (salmonNigiri) {
                foodsToDisplay.push(salmonNigiri);
            }

            foodsToDisplay = foodsToDisplay.slice(0, 3);

        } else {
            foodsToDisplay = allAvailableFoods.filter(food => food.type === filterType);
        }

        foodsToDisplay.forEach(food => {
            const cardElement = document.createElement('article');
            cardElement.classList.add('popular-foods__card');

            if (filterType === 'best-seller' && food.id === 'original-sushi') {
                cardElement.classList.add('active-card');
            }

            cardElement.setAttribute('data-food-id', food.id);
            cardElement.setAttribute('data-food-title', food.title);
            cardElement.setAttribute('data-food-price', food.price.toFixed(2));
            cardElement.setAttribute('data-food-image', food.image);
            cardElement.setAttribute('data-food-type', food.type);

            cardElement.innerHTML = `
                <img class="popular-foods__card-image" src="${food.image}" alt="${food.alt || food.title}"/>
                <h4 class="popular-foods__card-title">${food.title}</h4>
                <div class="popular-foods__card-details flex between">
                    <div class="popular-foods__card-rating"> <img src="${star}" alt="star"/>
                        <p>${food.rating}</p>
                    </div>
                    <p class="popular-foods__card-price">$${food.price.toFixed(2)}</p>
                </div>
            `;
            popularFoodCatalogue.appendChild(cardElement);
        });
        AOS.refresh();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterType = button.dataset.filter;
            renderPopularFoods(filterType);
        });
    });

    renderPopularFoods('best-seller');

    // --- Order System (Modal) ---
    let selectedFoodItems = {}; // This will hold the items the user has added to their order

    const orderNowButton = document.getElementById('order-now-button');
    const orderFoodModal = document.getElementById('order-food-modal');
    const orderFoodCloseButton = document.getElementById('order-food-close-button');
    const foodSelectionList = document.getElementById('food-selection-list');
    const orderTotalSpan = document.getElementById('order-total'); // This is the span in the modal for the total
    const placeOrderButton = document.getElementById('place-order-button');

    // Input fields for order details
    const customerNameInput = document.getElementById('customer-name');
    const customerEmailInput = document.getElementById('customer-email');
    const customerAddressInput = document.getElementById('customer-address');
    const customerContactInput = document.getElementById('customer-contact');
    const customerMessageInput = document.getElementById('customer-message');


    // Function to populate the food selection list in the modal and update the total
    function populateFoodSelectionModal() {
        foodSelectionList.innerHTML = ''; // Clear existing list to re-render
        let total = 0;

        // Ensure selectedFoodItems contains all available foods, initially with 0 quantity if not added
        allAvailableFoods.forEach(food => {
            if (!selectedFoodItems[food.id]) {
                selectedFoodItems[food.id] = { ...food, quantity: 0 };
            }
        });

        // Loop through all items in selectedFoodItems (which now includes all available foods)
        Object.values(selectedFoodItems).forEach(food => {
            const quantity = food.quantity; // Get the current quantity for this food item
            const itemSubtotal = food.price * quantity;
            total += itemSubtotal; // Accumulate total

            const foodElement = document.createElement('div');
            foodElement.classList.add('food-item-in-modal');
            foodElement.innerHTML = `
                <img src="${food.image}" alt="${food.title}" />
                <div class="food-item-info">
                    <h4>${food.title}</h4>
                    <p>$${food.price.toFixed(2)} each</p>
                </div>
                <div class="food-item-controls">
                    <button class="quantity-decrease" data-id="${food.id}">-</button>
                    <span>${quantity}</span>
                    <button class="quantity-increase" data-id="${food.id}">+</button>
                </div>
                <p class="food-item-price-total">$${itemSubtotal.toFixed(2)}</p>
            `;
            foodSelectionList.appendChild(foodElement);
        });

        // Update the total display in the modal
        orderTotalSpan.textContent = total.toFixed(2);
    }


    foodSelectionList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('quantity-increase')) {
            const foodId = target.dataset.id;
            changeFoodQuantity(foodId, 1);
        } else if (target.classList.contains('quantity-decrease')) {
            const foodId = target.dataset.id;
            changeFoodQuantity(foodId, -1);
        }
    });

    function changeFoodQuantity(foodId, delta) {
        const food = allAvailableFoods.find(item => item.id === foodId);
        if (!food) return;

        // Initialize quantity if it's the first time this item is interacted with
        if (!selectedFoodItems[foodId]) {
            selectedFoodItems[foodId] = { ...food, quantity: 0 };
        }

        selectedFoodItems[foodId].quantity += delta;

        // Ensure quantity doesn't go below zero
        if (selectedFoodItems[foodId].quantity < 0) {
            selectedFoodItems[foodId].quantity = 0;
        }

        populateFoodSelectionModal(); // Recalculate and re-render after quantity change
    }

    orderNowButton.addEventListener('click', () => {
        orderFoodModal.classList.add('show');
        // Initialize selectedFoodItems with 0 quantity for all available foods when modal opens
        // This ensures all items appear in the modal even if not yet added
        allAvailableFoods.forEach(food => {
            if (!selectedFoodItems[food.id]) {
                selectedFoodItems[food.id] = { ...food, quantity: 0 };
            }
        });
        populateFoodSelectionModal(); // Populate the modal with all items (quantity 0 initially)
    });

    orderFoodCloseButton.addEventListener('click', () => {
        orderFoodModal.classList.remove('show');
    });

    orderFoodModal.addEventListener('click', (event) => {
        if (event.target === orderFoodModal) {
            orderFoodModal.classList.remove('show');
        }
    });

    placeOrderButton.addEventListener('click', async () => {
        const total = parseFloat(orderTotalSpan.textContent); // Get the final calculated total from the modal
        const orderedItems = Object.values(selectedFoodItems).filter(item => item.quantity > 0);

        if (orderedItems.length === 0) {
            showNotification("Please select some food items before placing an order.");
            return;
        }

        // Validate customer details
        const customerName = customerNameInput.value.trim();
        const customerEmail = customerEmailInput.value.trim();
        const customerAddress = customerAddressInput.value.trim();
        const customerContact = customerContactInput.value.trim();
        const customerMessage = customerMessageInput.value.trim();

        if (!customerName || !customerAddress || !customerContact || !customerEmail) {
            showNotification("Please fill in your Name, Email, Address, and Contact Number to place the order.");
            return;
        }

        // Create the orderSummary object with all necessary details
        const orderSummary = {
            items: orderedItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity
            })),
            total: total, // Use the dynamically calculated total
            customerDetails: {
                name: customerName,
                email: customerEmail,
                address: customerAddress,
                contact: customerContact,
                message: customerMessage || 'N/A' // Ensure 'N/A' if empty
            }
        };

        console.log("Customer Order:", orderSummary);

        // --- EmailJS Integration for Order Confirmation ---
        const serviceID = 'service_mbug3el'; // Your EmailJS Service ID
        const customerTemplateID = 'template_fpalirt'; // Your provided Customer Template ID
        const publicKey = 'MFl4Jm_6Y4uYb8bwD'; // Your EmailJS Public Key

        // Prepare template parameters for Customer Confirmation email
        const customerTemplateParams = {
            order_id: `SH-${Date.now()}`,
            name: customerName,
            email: customerEmail,
            customer_address: orderSummary.customerDetails.address,
            customer_contact: orderSummary.customerDetails.contact,
            customer_message: orderSummary.customerDetails.message,
            orders: orderedItems.map(item => ({
                name: item.title,
                units: item.quantity,
                price: item.price.toFixed(2), // Individual item price
                item_total: (item.price * item.quantity).toFixed(2) // Pre-calculated item total
            })),
            'cost.shipping': '0.00', // Hardcoded if no actual shipping calculation
            'cost.tax': '0.00',       // Hardcoded if no actual tax calculation
            'cost.total': orderSummary.total.toFixed(2) // This will now correctly send the calculated total
        };


        try {
            if (typeof emailjs === 'undefined' || !emailjs.send) {
                console.error("EmailJS SDK is not loaded. Please ensure it's included and initialized correctly in index.html.");
                showNotification("Order placed, but failed to send email. Please check console for details.");
                return;
            }

            await emailjs.send(serviceID, customerTemplateID, customerTemplateParams, publicKey);
            console.log('Customer confirmation email sent successfully!');


            showNotification("Your order has been placed successfully! A confirmation email has been sent to your inbox and to Sushihaus.");

            // Clear selected items and customer details after successful order and email send
            selectedFoodItems = {}; // Reset selected items
            customerNameInput.value = '';
            customerEmailInput.value = '';
            customerAddressInput.value = '';
            customerContactInput.value = '';
            customerMessageInput.value = '';
            populateFoodSelectionModal(); // Re-render modal to clear/reset for next order
            orderFoodModal.classList.remove('show'); // Hide the modal

        } catch (error) {
            console.error('Failed to send order emails:', error);
            showNotification("Order placed, but there was an issue sending confirmation emails. Please try again or contact support.");
        }
    });

    // --- About Our Store Modal Functionality ---
    const learnMoreButton = document.getElementById('learn-more-button');
    const aboutStoreModal = document.getElementById('about-store-modal');
    const aboutStoreCloseButton = document.getElementById('about-store-close-button');

    if (learnMoreButton && aboutStoreModal && aboutStoreCloseButton) {
        learnMoreButton.addEventListener('click', () => {
            aboutStoreModal.classList.add('show');
        });

        aboutStoreCloseButton.addEventListener('click', () => {
            aboutStoreModal.classList.remove('show');
        });

        aboutStoreModal.addEventListener('click', (event) => {
            if (event.target === aboutStoreModal) {
                aboutStoreModal.classList.remove('show');
            }
        });
    }

    // --- Explore All Foods Modal Functionality ---
    const exploreFoodButton = document.getElementById('explore-food-button');
    const exploreAllFoodsModal = document.getElementById('explore-all-foods-modal');
    const exploreAllFoodsCloseButton = document.getElementById('explore-all-foods-close-button');
    const allFoodsListContainer = document.getElementById('all-foods-list');

    function populateAllFoodsModal() {
        allFoodsListContainer.innerHTML = '';

        if (allAvailableFoods.length === 0) {
            allFoodsListContainer.innerHTML = '<p class="empty-list-message">No food items available.</p>';
        } else {
            allAvailableFoods.forEach(food => {
                const foodItemElement = document.createElement('div');
                foodItemElement.classList.add('all-food-item');
                foodItemElement.innerHTML = `
                    <img src="${food.image}" alt="${food.title}" />
                    <div class="all-food-item-details">
                        <h4>${food.title}</h4>
                        <p class="all-food-item-description">${food.description || 'No description available.'}</p>
                        <p class="all-food-item-price">$${food.price.toFixed(2)}</p>
                        <div class="all-food-item-rating">
                            <img src="${star}" alt="star"/>
                            <p>${food.rating}</p>
                        </div>
                    </div>
                `;
                allFoodsListContainer.appendChild(foodItemElement);
            });
        }
    }

    if (exploreFoodButton && exploreAllFoodsModal && exploreAllFoodsCloseButton) {
        exploreFoodButton.addEventListener('click', () => {
            exploreAllFoodsModal.classList.add('show');
            populateAllFoodsModal();
        });

        exploreAllFoodsCloseButton.addEventListener('click', () => {
            exploreAllFoodsModal.classList.remove('show');
        });

        exploreAllFoodsModal.addEventListener('click', (event) => {
            if (event.target === exploreAllFoodsModal) {
                exploreAllFoodsModal.classList.remove('show');
            }
        });
    }

    // --- Discover Modal Functionality ---
    const discoverButton = document.getElementById('discover-button');
    const discoverModal = document.getElementById('discover-modal');
    const discoverCloseButton = document.getElementById('discover-close-button');
    const announcementsList = document.getElementById('announcements-list');
    const offersList = document.getElementById('offers-list');
    const customerCommentsList = document.getElementById('customer-comments-list');
    const showAllCommentsButton = document.getElementById('show-all-comments-button');

    const announcements = [
        "Welcome to Sushihaus! Enjoy our fresh new seasonal menu items!",
        "Special Holiday Hours: We will be open from 10 AM to 10 PM on Christmas Eve and New Year's Eve.",
        "Join our loyalty program and get exclusive discounts and early access to new dishes!"
    ];

    const offers = [
        "🔥 Buy 1 Take 2 on all Sushi Rolls - Daily Offer! (Limited Time)",
        "🍣 20% off your first order when you sign up for our newsletter!",
        "🎉 Free dessert with any ramen purchase over $25 on weekends!"
    ];

    const allComments = [
        { name: "Emily R.", comment: "Sushihaus never disappoints! The Ikigai Sushi is out of this world. Highly recommend!" },
        { name: "John D.", comment: "The Tonkotsu Ramen Supreme is incredibly rich and satisfying. My new go-to spot for ramen." },
        { name: "Sarah L.", comment: "Loved the tempura udon. Crispy tempura and perfectly chewy noodles. A delightful meal." },
        { name: "David M.", comment: "The Japanese Chicken Curry was surprisingly flavorful and comforting. A must-try!" },
        { name: "Jessica T.", comment: "Quick delivery and fresh food every time. Their California Roll is perfect for a light lunch." },
        { name: "Michael B.", comment: "The Iced Matcha Latte is a great pick-me-up. Not too sweet, just right." },
        { name: "Olivia W.", comment: "Tried the Spicy Miso Ramen and it had just the right kick! Fantastic broth." },
        { name: "Daniel K.", comment: "Best salmon nigiri I've had in a long time. So fresh and melts in your mouth." },
        { name: "Sophia G.", comment: "Their service is excellent and the food always arrives hot. Great experience overall." },
        { name: "Chris P.", comment: "Kitsune Udon was simple but executed perfectly. A true comfort food." }
    ];

    let commentsShownCount = 5;

    function renderComments(commentsToRender) {
        customerCommentsList.innerHTML = '';
        commentsToRender.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('customer-comment');
            commentElement.innerHTML = `
                <p class="comment-name"><strong>${comment.name}</strong></p>
                <p class="comment-text">${comment.comment}</p>
            `;
            customerCommentsList.appendChild(commentElement);
        });
    }

    function populateDiscoverModal() {
        // Clear previous content
        announcementsList.innerHTML = '';
        offersList.innerHTML = '';

        // Populate Announcements
        announcements.forEach(announcement => {
            const li = document.createElement('li');
            li.textContent = announcement;
            announcementsList.appendChild(li);
        });

        // Populate Offers
        offers.forEach(offer => {
            const li = document.createElement('li');
            li.textContent = offer;
            offersList.appendChild(li);
        });

        // Render initial comments
        renderComments(allComments.slice(0, commentsShownCount));

        // Show/hide "Show all comments" button
        if (allComments.length > commentsShownCount) {
            showAllCommentsButton.style.display = 'block';
        } else {
            showAllCommentsButton.style.display = 'none';
        }
    }

    if (discoverButton && discoverModal && discoverCloseButton) {
        discoverButton.addEventListener('click', () => {
            discoverModal.classList.add('show');
            commentsShownCount = 5; // Reset comments shown each time modal opens
            populateDiscoverModal();
        });

        discoverCloseButton.addEventListener('click', () => {
            discoverModal.classList.remove('show');
        });

        discoverModal.addEventListener('click', (event) => {
            if (event.target === discoverModal) {
                discoverModal.classList.remove('show');
            }
        });

        showAllCommentsButton.addEventListener('click', () => {
            commentsShownCount = allComments.length; // Show all comments
            renderComments(allComments);
            showAllCommentsButton.style.display = 'none'; // Hide the button
        });
    }

    // --- Notification System ---
    function showNotification(message) {
        let notification = document.getElementById('app-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'app-notification';
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--secondary-color);
                color: var(--color-white);
                padding: 12px 25px;
                border-radius: 10px;
                font-family: var(--plus-jakarta-sans);
                font-size: 16px;
                z-index: 1001;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show-notification');
        notification.style.opacity = '1';
        notification.style.visibility = 'visible';
        notification.style.transform = 'translateX(-50%) translateY(0)';

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.visibility = 'hidden';
            notification.style.transform = 'translateX(-50%) translateY(20px)';
        }, 3000);
    }

    // --- Newsletter Subscription Logic ---
    const subscriptionEmailInput = document.getElementById('subscription-email-input');
    const subscribeButton = document.getElementById('subscribe-button');

    if (subscribeButton && subscriptionEmailInput) {
        subscribeButton.addEventListener('click', async () => { // Changed to async
            const email = subscriptionEmailInput.value.trim();
            const gmailRegex = /@gmail\.com$/;

            if (email === '') {
                showNotification("Please enter your email address.");
            } else if (!gmailRegex.test(email)) {
                showNotification("Please enter a valid Gmail address (e.g., yourname@gmail.com).");
            } else {
                // EmailJS Integration for Newsletter
                const serviceID = 'service_mbug3el'; // Your EmailJS Service ID
                const welcomeTemplateID = 'template_fewgnvv'; // The ID of your new 'welcome' template
                const publicKey = 'MFl4Jm_6Y4uYb8bwD'; // Your EmailJS Public Key

                // Prepare parameters for the welcome template, including your newsletter content
                const templateParams = {
                    name: "Valued Customer", // Default name, can be dynamic if you add a name input
                    email: email, // The subscriber's email
                    business_news: "We're expanding our delivery zones! Soon you can enjoy Sushihaus from even more locations. Stay tuned for updates!",
                    whats_new: "Introducing our new 'Seasonal Sashimi Platter' featuring the freshest catch of the day. And don't miss our limited-edition 'Cherry Blossom Sushi Roll'!",
                    upcoming: "Get ready for our 'Summer Festival Special' starting next month, with exclusive discounts on your favorite ramen and sushi combos. We're also planning a virtual sushi-making workshop!",
                    appreciation_message: "Thank you for joining the Sushihaus family! Your support means the world to us. We look forward to serving you the best of Japanese cuisine."
                };

                try {
                    if (typeof emailjs === 'undefined' || !emailjs.send) {
                        console.error("EmailJS SDK is not loaded. Please ensure it's included and initialized correctly in index.html.");
                        showNotification("Subscription failed. Email service not available.");
                        return;
                    }
                    await emailjs.send(serviceID, welcomeTemplateID, templateParams, publicKey);
                    console.log(`Newsletter subscription email sent to: ${email}`);
                    showNotification("Thank you for subscribing to our newsletter! Check your inbox for a welcome message.");
                    subscriptionEmailInput.value = ''; // Clear the input field
                } catch (error) {
                    console.error('Failed to send newsletter email:', error);
                    showNotification("Subscription successful, but failed to send welcome email. Please try again.");
                }
            }
        });
    }
});
