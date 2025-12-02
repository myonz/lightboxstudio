$(document).ready(function() {

    // 1. Toggle Navbar (for mobile)
    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // 2. Sticky Header / Scroll Active Link
    $(window).on('scroll load', function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

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
    // Marketplace Category
    { img: '../images/portfolio-(1).jpg', title: 'Coffee & Snacks', desc: 'Marketplace Photography', category: 'marketplace' },
    { img: '../images/portfolio-(39).jpg', title: 'Skincare Set', desc: 'Beauty Product', category: 'marketplace' },
    { img: '../images/portfolio-(40).jpg', title: 'Fashion Item', desc: 'Apparel Photography', category: 'marketplace' },
    { img: '../images/portfolio-(41).jpg', title: 'Accessories', desc: 'Product Detail', category: 'marketplace' },
    { img: '../images/portfolio-(42).jpg', title: 'Leather Goods', desc: 'Premium Product', category: 'marketplace' },
    { img: '../images/portfolio-(43).jpg', title: 'Watch Collection', desc: 'Luxury Item', category: 'marketplace' },
    { img: '../images/portfolio-(44).jpg', title: 'Handbag', desc: 'Fashion Accessories', category: 'marketplace' },
    { img: '../images/portfolio-(45).jpg', title: 'Sneakers', desc: 'Footwear Photography', category: 'marketplace' },
    { img: '../images/portfolio-(46).jpg', title: 'Tech Gadget', desc: 'Electronics', category: 'marketplace' },
    { img: '../images/portfolio-(47).jpg', title: 'Tech Gadget 2', desc: 'Electronics', category: 'marketplace' },
    { img: '../images/portfolio-(48).jpg', title: 'Tech Gadget 3', desc: 'Electronics', category: 'marketplace' },
    { img: '../images/portfolio-(49).jpg', title: 'Tech Gadget 4', desc: 'Electronics', category: 'marketplace' },
    
    // Creative Category
    { img: '../images/portfolio-(2).jpg', title: 'Artistic Concept', desc: 'Creative Photography', category: 'creative' },
    { img: '../images/portfolio-(3).jpg', title: 'Abstract Design', desc: 'Creative Concept', category: 'creative' },
    { img: '../images/portfolio-(4).jpg', title: 'Lifestyle Scene', desc: 'Creative Styling', category: 'creative' },
    { img: '../images/portfolio-(5).jpg', title: 'Product Story', desc: 'Creative Narrative', category: 'creative' },
    { img: '../images/portfolio-(6).jpg', title: 'Flat Lay', desc: 'Creative Composition', category: 'creative' },
    { img: '../images/portfolio-(7).jpg', title: 'Color Palette', desc: 'Creative Styling', category: 'creative' },
    { img: '../images/portfolio-(8).jpg', title: 'Brand Story', desc: 'Creative Campaign', category: 'creative' },
    { img: '../images/portfolio-(9).jpg', title: 'Visual Identity', desc: 'Creative Branding', category: 'creative' },
    { img: '../images/portfolio-(10).jpg', title: 'Aesthetic Shot', desc: 'Creative Vision', category: 'creative' },
    { img: '../images/portfolio-(11).jpg', title: 'Mood Board', desc: 'Creative Direction', category: 'creative' },
    { img: '../images/portfolio-(12).jpg', title: 'Design Elements', desc: 'Creative Vision', category: 'creative' },
    { img: '../images/portfolio-(13).jpg', title: 'Art Direction', desc: 'Creative Vision', category: 'creative' },
    { img: '../images/portfolio-(14).jpg', title: 'Visual Story', desc: 'Creative Vision', category: 'creative' },
    { img: '../images/portfolio-(15).jpg', title: 'Brand Aesthetic', desc: 'Creative Vision', category: 'creative' },
    { img: '../images/portfolio-(16).jpg', title: 'Creative Concept', desc: 'Creative Vision', category: 'creative' },
    { img: '../images/portfolio-(17).jpg', title: 'Design Inspiration', desc: 'Creative Vision', category: 'creative' },
    
    // Model & Half Body Category
    { img: '../images/portfolio-(28).jpg', title: 'Fashion Model', desc: 'Portrait Photography', category: 'model' },
    { img: '../images/portfolio-(29).jpg', title: 'Product Model', desc: 'Half Body Shot', category: 'model' },
    { img: '../images/portfolio-(30).jpg', title: 'Lifestyle Model', desc: 'Casual Portrait', category: 'model' },
    { img: '../images/portfolio-(31).jpg', title: 'Brand Ambassador', desc: 'Model Photography', category: 'model' },
    { img: '../images/portfolio-(32).jpg', title: 'Studio Portrait', desc: 'Professional Model', category: 'model' },
    { img: '../images/portfolio-(33).jpg', title: 'Fashion Editorial', desc: 'Model Shoot', category: 'model' },
    { img: '../images/portfolio-(34).jpg', title: 'Product Demo', desc: 'Model with Product', category: 'model' },
    { img: '../images/portfolio-(35).jpg', title: 'Beauty Shot', desc: 'Close-up Portrait', category: 'model' },
    { img: '../images/portfolio-(36).jpg', title: 'Lifestyle Portrait', desc: 'Natural Model', category: 'model' },
    { img: '../images/portfolio-(37).jpg', title: 'Commercial Model', desc: 'Product Campaign', category: 'model' },
    { img: '../images/portfolio-(38).jpg', title: 'Brand Model', desc: 'Product Campaign', category: 'model' },

    // Food & Beverages Category
    { img: '../images/portfolio-(18).jpg', title: 'Gourmet Dish', desc: 'Food Photography', category: 'food' },
    { img: '../images/portfolio-(19).jpg', title: 'Coffee Art', desc: 'Beverage Photography', category: 'food' },
    { img: '../images/portfolio-(20).jpg', title: 'Dessert Platter', desc: 'Sweet Photography', category: 'food' },
    { img: '../images/portfolio-(21).jpg', title: 'Fresh Juice', desc: 'Drink Photography', category: 'food' },
    { img: '../images/portfolio-(22).jpg', title: 'Restaurant Menu', desc: 'Food Styling', category: 'food' },
    { img: '../images/portfolio-(23).jpg', title: 'Pizza Special', desc: 'Fast Food Photography', category: 'food' },
    { img: '../images/portfolio-(24).jpg', title: 'Cocktail Mix', desc: 'Beverage Styling', category: 'food' },
    { img: '../images/portfolio-(25).jpg', title: 'Sushi Platter', desc: 'Japanese Cuisine', category: 'food' },
    { img: '../images/portfolio-(26).jpg', title: 'Breakfast Bowl', desc: 'Healthy Food', category: 'food' },
    { img: '../images/portfolio-(27).jpg', title: 'Luxury Dessert', desc: 'Fine Dining', category: 'food' },
    { img: '../images/portfolio-(50).jpg', title: 'Pastry Art', desc: 'Fine Dining', category: 'food' },
    { img: '../images/portfolio-(51).jpg', title: 'Culinary Creation', desc: 'Fine Dining', category: 'food' },
    
    // Video Category
    { img: '../images/portfolio-(41).jpg', title: 'Product Video', desc: 'Commercial Videography', category: 'video' },
    { img: '../images/portfolio-(42).jpg', title: 'Brand Story', desc: 'Corporate Video', category: 'video' },
    { img: '../images/portfolio-(43).jpg', title: 'Social Media Ad', desc: 'Short Video Content', category: 'video' },
    { img: '../images/portfolio-(44).jpg', title: 'Product Demo', desc: 'Tutorial Video', category: 'video' },
    { img: '../images/portfolio-(45).jpg', title: 'Instagram Reel', desc: 'Social Content', category: 'video' },
    { img: '../images/portfolio-(46).jpg', title: 'TikTok Video', desc: 'Viral Content', category: 'video' },
    { img: '../images/portfolio-(47).jpg', title: 'YouTube Ad', desc: 'Video Campaign', category: 'video' },
    { img: '../images/portfolio-(48).jpg', title: 'Event Coverage', desc: 'Video Documentation', category: 'video' },
    { img: '../images/portfolio-(49).jpg', title: 'Behind The Scenes', desc: 'BTS Video', category: 'video' }
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