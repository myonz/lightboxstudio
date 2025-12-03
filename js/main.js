$(document).ready(function() {

// 1. Toggle Navbar (for mobile) - IMPROVED
$('.fa-bars').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
    $('body').toggleClass('no-scroll');  // Prevent body scroll
});

// Close menu saat klik link
$('.navbar ul li a').click(function(){
    $('.fa-bars').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
    $('body').removeClass('no-scroll');
});

// Close menu saat klik overlay
$('.navbar').click(function(e){
    if($(e.target).hasClass('navbar') || $(e.target).hasClass('nav-toggle')){
        $('.fa-bars').removeClass('fa-times');
        $(this).removeClass('nav-toggle');
        $('body').removeClass('no-scroll');
    }
});
    // 2. Sticky Header / Scroll Active Link
        $(window).on('scroll load', function(){
    // JANGAN close menu saat scroll - baris ini dihapus

        if($(window).scrollTop() > 30){
            $('.header').addClass('scrolled');
        }else{
            $('.header').removeClass('scrolled');
        }

        // Highlight active link saat scroll (Opsional)
        $('section').each(function() {
            let top = $(window).scrollTop();
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');

            if(top >= offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });

        // Show/Hide Back to Top button
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // 3. Counter Animation Logic
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const updateCount = (counter, target) => {
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => updateCount(counter, target), 1);
        } else {
            counter.innerText = target.toLocaleString('id-ID') + (counter.getAttribute('data-target') === '480' ? '%' : '+');
        }
    };

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            updateCount(counter, target);
        });
    };

    // Use Intersection Observer to run animation only when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const countersSection = document.querySelector('.counters');
    if (countersSection) {
        observer.observe(countersSection);
    }
    
    // 4. FAQ Accordion Logic
    $('.accordion-header').click(function(){
        $('.accordion .accordion-body').slideUp();
        $(this).next('.accordion-body').slideDown();
    });

}); 

// ============================================================
// 🔥 SCROLL LISTENER - DI LUAR jQuery (Vanilla JavaScript)
// ============================================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================================
// Portfolio Gallery JavaScript - Portfolio Page Only
// ============================================================

const portfolioData = [
    { img: '../images/portfolio-(39).webp', title: 'Stylish Sneakers', desc: 'Footwear Photography', category: 'marketplace' },
    { img: '../images/portfolio-(40).webp', title: 'Handbag Collection', desc: 'Fashion Accessories', category: 'marketplace' },
    { img: '../images/portfolio-(41).webp', title: 'Designer Bag', desc: 'Premium Accessories', category: 'marketplace' },
    { img: '../images/portfolio-(42).webp', title: 'Fashion Bag', desc: 'Leather Goods', category: 'marketplace' },
    { img: '../images/portfolio-(43).webp', title: 'Flat Shoes', desc: 'Women Footwear', category: 'marketplace' },
    { img: '../images/portfolio-(44).webp', title: 'Sneakers', desc: 'Casual Footwear', category: 'marketplace' },
    { img: '../images/portfolio-(45).webp', title: 'Slip-On Sandals', desc: 'Comfort Footwear', category: 'marketplace' },
    { img: '../images/portfolio-(46).webp', title: 'Bag Detail Shot', desc: 'Product Close-up', category: 'marketplace' },
    { img: '../images/portfolio-(47).webp', title: 'Perfume', desc: 'Fragrance Photography', category: 'marketplace' },
    { img: '../images/portfolio-(48).webp', title: 'Backpack', desc: 'Travel Gear', category: 'marketplace' },
    { img: '../images/portfolio-(49).webp', title: 'Sling Bag', desc: 'Compact Bag', category: 'marketplace' },
    
    // Creative Category
    { img: '../images/portfolio-(1).webp', title: 'Slingbag with Props', desc: 'Marketplace Photography', category: 'marketplace' },
    { img: '../images/portfolio-(2).webp', title: 'Two-Tone Heels', desc: 'Fashion Footwear', category: 'creative' },
    { img: '../images/portfolio-(3).webp', title: 'Classic Heels', desc: 'Women Shoes', category: 'creative' },
    { img: '../images/portfolio-(4).webp', title: 'Teen Sneakers', desc: 'Youth Fashion', category: 'creative' },
    { img: '../images/portfolio-(5).webp', title: 'Kids Shoes', desc: 'Children Footwear', category: 'creative' },
    { img: '../images/portfolio-(6).webp', title: 'Leather Shoes with Props', desc: 'Men Formal Wear', category: 'creative' },
    { img: '../images/portfolio-(7).webp', title: 'Premium Leather Shoes', desc: 'Men Fashion', category: 'creative' },
    { img: '../images/portfolio-(8).webp', title: 'Formal Leather Shoes', desc: 'Business Footwear', category: 'creative' },
    { img: '../images/portfolio-(9).webp', title: 'Men Dress Shoes', desc: 'Professional Style', category: 'creative' },
    { img: '../images/portfolio-(10).webp', title: 'Classic Leather Shoes', desc: 'Gentleman Style', category: 'creative' },
    { img: '../images/portfolio-(11).webp', title: 'Styled Leather Shoes', desc: 'Elegant Footwear', category: 'creative' },
    { img: '../images/portfolio-(12).webp', title: 'Essence Skincare', desc: 'Beauty Product', category: 'creative' },
    { img: '../images/portfolio-(13).webp', title: 'Skincare Essence', desc: 'Beauty Treatment', category: 'creative' },
    { img: '../images/portfolio-(14).webp', title: 'Beauty Essence', desc: 'Facial Care', category: 'creative' },
    { img: '../images/portfolio-(15).webp', title: 'Facial Essence', desc: 'Skincare Line', category: 'creative' },
    { img: '../images/portfolio-(16).webp', title: 'Essence Collection', desc: 'Beauty Products', category: 'creative' },
    { img: '../images/portfolio-(17).webp', title: 'Heels with Props', desc: 'Styled Photography', category: 'creative' },
    
    // Model & Half Body Category
    { img: '../images/portfolio-(28).webp', title: 'Half Body - Clothing', desc: 'Fashion Model', category: 'model' },
    { img: '../images/portfolio-(29).webp', title: 'Half Body - Pants', desc: 'Apparel Photography', category: 'model' },
    { img: '../images/portfolio-(30).webp', title: 'Half Body - Bag', desc: 'Accessories Model', category: 'model' },
    { img: '../images/portfolio-(31).webp', title: 'Half Body - Socks', desc: 'Fashion Details', category: 'model' },
    { img: '../images/portfolio-(32).webp', title: 'Half Body - Shoes', desc: 'Footwear Model', category: 'model' },
    { img: '../images/portfolio-(33).webp', title: 'Half Body - Jacket', desc: 'Outerwear Style', category: 'model' },
    { img: '../images/portfolio-(34).webp', title: 'Half Body - Footwear', desc: 'Shoe Model', category: 'model' },
    { img: '../images/portfolio-(35).webp', title: 'Half Body - Handbag', desc: 'Bag Modeling', category: 'model' },
    { img: '../images/portfolio-(36).webp', title: 'Half Body - Slingbag', desc: 'Casual Bag Style', category: 'model' },
    { img: '../images/portfolio-(37).webp', title: 'Half Body - Women Sweater', desc: 'Knitwear Fashion', category: 'model' },
    { img: '../images/portfolio-(38).webp', title: 'Half Body - T-Shirt', desc: 'Casual Wear', category: 'model' },

    // Food & Beverages Category
    { img: '../images/portfolio-(18).webp', title: 'Iced Coffee', desc: 'Cold Beverage', category: 'food' },
    { img: '../images/portfolio-(19).webp', title: 'Cromboloni', desc: 'Pastry Photography', category: 'food' },
    { img: '../images/portfolio-(20).webp', title: 'Iced Coffee', desc: 'Coffee Photography', category: 'food' },
    { img: '../images/portfolio-(21).webp', title: 'Food Dish', desc: 'Culinary Photography', category: 'food' },
    { img: '../images/portfolio-(22).webp', title: 'Gourmet Meal', desc: 'Food Styling', category: 'food' },
    { img: '../images/portfolio-(23).webp', title: 'Cuisine Plate', desc: 'Restaurant Food', category: 'food' },
    { img: '../images/portfolio-(24).webp', title: 'Iced Tea', desc: 'Refreshing Drink', category: 'food' },
    { img: '../images/portfolio-(25).webp', title: 'Black Coffee', desc: 'Hot Beverage', category: 'food' },
    { img: '../images/portfolio-(26).webp', title: 'Iced Coffee', desc: 'Coffee Art', category: 'food' },
    { img: '../images/portfolio-(27).webp', title: 'Cold Brew Coffee', desc: 'Specialty Coffee', category: 'food' },
    { img: '../images/portfolio-(50).webp', title: 'Food Platter', desc: 'Culinary Art', category: 'food' },
    { img: '../images/portfolio-(51).webp', title: 'Gourmet Dish', desc: 'Fine Dining', category: 'food' },
    
];

let itemsToShow = 12;
let currentFilter = 'all';

// Function to render portfolio items - DIPERBAIKI!
function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) {
        console.log('Portfolio grid tidak ditemukan!');
        return;
    }
    
    console.log('Rendering portfolio...'); // Debug
    grid.innerHTML = '';

    const filteredData = currentFilter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === currentFilter);

    console.log('Total items:', filteredData.length); // Debug
    console.log('Items to show:', itemsToShow); // Debug

    // Render item sesuai itemsToShow
    const itemsToRender = filteredData.slice(0, itemsToShow);
    
    itemsToRender.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x400/0056b3/ffffff?text=${encodeURIComponent(item.title)}'">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        grid.appendChild(portfolioItem);
    });

    console.log('Rendered:', itemsToRender.length, 'items'); // Debug

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (filteredData.length <= itemsToShow) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
            
            const remainingItems = filteredData.length - itemsToShow;
            loadMoreBtn.innerHTML = `
                Lihat Lebih Banyak (${remainingItems})
                <i class="fas fa-chevron-down"></i>
            `;
        }
    }
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded!'); // Debug
    
    // Cek apakah di halaman portfolio
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) {
        console.log('Bukan halaman portfolio, skip...');
        return;
    }

    console.log('Portfolio grid found!'); // Debug

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Filter clicked:', this.dataset.filter); // Debug
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            itemsToShow = 12;
            renderPortfolio();
            
            // Smooth scroll ke grid
            window.scrollTo({
                top: portfolioGrid.offsetTop - 150,
                behavior: 'smooth'
            });
        });
    });

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            console.log('Load more clicked!'); // Debug
            itemsToShow += 12;
            renderPortfolio();
        });
    }

    // Initial render
    console.log('Starting initial render...'); // Debug
    renderPortfolio();
});
