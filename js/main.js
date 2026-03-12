(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });
    let cart = JSON.parse(localStorage.getItem('kenyan-coffee-cart')) || [];

function saveCart() {
    localStorage.setItem('kenyan-coffee-cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-count').style.display = count > 0 ? 'flex' : 'none';
}

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
    renderMiniCart();
    document.getElementById('mini-cart').classList.add('open');
}

function changeQuantity(index, delta) {
    cart[index].quantity = Math.max(1, cart[index].quantity + delta);
    saveCart();
    renderMiniCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderMiniCart();
}

function renderMiniCart() {
    const container = document.getElementById('mini-cart-items');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center py-4">Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;">
                <div style="flex:1; margin-left:12px;">
                    <div><strong>${item.name}</strong></div>
                    <div>KSh ${item.price.toLocaleString()} × ${item.quantity}</div>
                </div>
                <div class="d-flex align-items-center">
                    <button onclick="changeQuantity(${index}, -1)">–</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="ms-3 text-danger border-0 bg-transparent" onclick="removeItem(${index})">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('mini-subtotal').textContent = `KSh ${subtotal.toLocaleString()}`;
}

// Close cart
document.getElementById('close-cart')?.addEventListener('click', () => {
    document.getElementById('mini-cart').classList.remove('open');
});

// Open cart when clicking cart icon
document.querySelector('.nav-cart')?.addEventListener('click', () => {
    document.getElementById('mini-cart').classList.add('open');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderMiniCart();
});
})(jQuery);

