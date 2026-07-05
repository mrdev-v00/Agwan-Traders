document.addEventListener('DOMContentLoaded', () => {

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll(
      'a, button, .btn, .category-card, .product-card, .filter-btn, .brand-pill, ' +
      '.nav-toggle, .theme-toggle, .img-action-btn, .gallery-thumb, ' +
      '.whatsapp-float, .back-to-top, .social-links a, input, select, textarea'
    );
    
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  } else if (cursorDot && cursorRing) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  const isInPageFolder = window.location.pathname.includes('/Page/');
  const imageBase = isInPageFolder ? '../assets/images/products/' : 'assets/images/products/';

  let products = [];
  let currentFilter = 'all';
  let currentSearch = '';

  fetch('../data/products.json')
    .then(response => response.json())
    .then(data => {
      products = data.products || data;
      initApp();
    })
    .catch(error => {
      console.error('Error loading products:', error);
      const grid = document.getElementById('productGrid') || document.getElementById('featuredGrid');
      if (grid) {
        grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:var(--s-4xl);">
            <i class="fas fa-exclamation-triangle" style="font-size:2.5rem;color:var(--accent);display:block;margin-bottom:var(--s-md);"></i>
            <p style="color:var(--t-400);font-size:1rem;">Could not load products. Please refresh or try again later.</p>
          </div>`;
      }
    });

  const specIconMap = {
    '10A': 'fa-bolt', '16A': 'fa-bolt', '20A': 'fa-bolt', '32A': 'fa-bolt', '65A': 'fa-bolt', '125A': 'fa-bolt',
    '100-250V / 2 Relay': 'fa-bolt', '110-220V / 3 Relay': 'fa-bolt', '160-220V / 4 Relay': 'fa-bolt',
    '2+2 Lights/Fans': 'fa-battery-three-quarters', '3+3 Lights/Fans': 'fa-battery-three-quarters', 
    '4+4 Lights/Fans': 'fa-battery-three-quarters', '5+5 Lights/Fans': 'fa-battery-three-quarters',
    '3/0.29 Red': 'fa-plug', '7/0.29 Blue': 'fa-plug', '7/0.36 Yellow': 'fa-plug', '7/0.44 Green': 'fa-plug', '40/0.76 Black': 'fa-plug',
    '2 Core Red/Black': 'fa-plug', '3 Core Red/Black/Blue': 'fa-plug', '4 Core': 'fa-plug', '6 Core': 'fa-plug',
    '1.5mm²': 'fa-ruler', '2.5mm²': 'fa-ruler', '4mm²': 'fa-ruler', '6mm²': 'fa-ruler',
    '1 Gang': 'fa-square', '2 Gang': 'fa-square', '3 Gang': 'fa-square', 'With USB': 'fa-usb',
    '200W': 'fa-lightbulb', '400W': 'fa-lightbulb', '600W': 'fa-lightbulb',
    'Step Type': 'fa-sliders-h', 'Electronic': 'fa-microchip',
    '1 Pole': 'fa-shield', '2 Pole': 'fa-shield', '4 Pole': 'fa-shield',
    'Over/Under Voltage': 'fa-bolt',
    'Single Phase': 'fa-circle', 'Three Phase': 'fa-circle',
    '75W': 'fa-fire', '100W': 'fa-fire', '150W': 'fa-fire', '200W': 'fa-fire',
    'Compression 10mm': 'fa-compress', 'Extension 20mm': 'fa-expand',
    '1.0mm': 'fa-ruler', '1.5mm': 'fa-ruler', '2.0mm': 'fa-ruler',
    '10mm²': 'fa-ruler', '16mm²': 'fa-ruler', '25mm²': 'fa-ruler', '35mm²': 'fa-ruler',
    '2 Way': 'fa-exchange', '4 Way': 'fa-exchange', '6 Way': 'fa-exchange', '8 Way': 'fa-exchange',
    '20mm': 'fa-circle', '25mm': 'fa-circle', '32mm': 'fa-circle', '40mm': 'fa-circle',
    'Mechanical': 'fa-clock', 'Digital': 'fa-display',
    '9A': 'fa-bolt', '25A': 'fa-bolt', '40A': 'fa-bolt',
    '8 Pin': 'fa-cube', '14 Pin': 'fa-cube', '24V DC': 'fa-bolt', '220V AC': 'fa-bolt',
    '220V': 'fa-bolt', '24V': 'fa-bolt'
  };

  function renderProducts(list, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:var(--s-4xl);">
          <i class="fas fa-search" style="font-size:2.5rem;color:var(--t-400);display:block;margin-bottom:var(--s-md);"></i>
          <p style="color:var(--t-400);font-size:1rem;">No products found. Try a different search or filter.</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map((p, i) => {
      const badgeCls = p.condition === 'new' ? 'badge-new' : p.condition === 'used' ? 'badge-used' : 'badge-refurbished';
      const badgeTxt = p.condition.charAt(0).toUpperCase() + p.condition.slice(1);
      const waMsg = encodeURIComponent(`Hi Agwan Traders, I'm interested in the ${p.brand} ${p.name} (PKR ${p.price}). Is it available?`);
      const specsHtml = p.specs.map(s => {
        const icon = specIconMap[s] || 'fa-circle';
        return `<span><i class="fas ${icon}"></i>${s}</span>`;
      }).join('');
      const delay = Math.min(i % 4, 3);

      const imageUrl = p.images && p.images.length > 0 ? p.images[0].replace('assets/images/products/', imageBase) : '';

      return `
        <div class="product-card reveal reveal-delay-${delay + 1}" data-condition="${p.condition}" data-category="${(p.category||[]).join(',')}" data-id="${p.id}">
          <div class="product-image">
            ${imageUrl
              ? `<img src="${imageUrl}" alt="${p.brand} ${p.name}" style="width:100%;height:100%;object-fit:contain;padding:16px;" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
                 <i class="fas fa-bolt fallback-icon" style="display:none;position:absolute;font-size:4rem;color:rgba(0,0,0,0.04);"></i>`
              : `<div class="product-placeholder"><i class="fas fa-bolt"></i></div>`
            }
            <span class="badge ${badgeCls} product-badge">${badgeTxt}</span>
            <div class="product-image-actions">
              <button class="img-action-btn quick-view-btn" data-id="${p.id}" title="Quick View">
                <i class="fas fa-eye"></i>
              </button>
              <a href="https://wa.me/923237284123?text=${waMsg}" class="img-action-btn" title="WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div class="product-body">
            <div class="product-brand">${p.brand}</div>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-specs">${specsHtml}</div>
            <div class="product-price">
              PKR ${p.price}
              <small>+ Tax</small>
            </div>
            <div class="product-actions">
              <a href="https://wa.me/923237284123?text=${waMsg}" class="btn btn-whatsapp btn-sm">
                <i class="fab fa-whatsapp"></i> Inquire
              </a>
              <button class="btn btn-ghost btn-sm quick-view-btn" data-id="${p.id}">
                Details
              </button>
            </div>
          </div>
        </div>`;
    }).join('');

    requestAnimationFrame(() => revealOnScroll());
    attachQuickViewListeners();
  }

  function filterAndRender() {
    if (products.length === 0) return;

    let filtered = products;

    if (currentFilter !== 'all') {
      filtered = filtered.filter(p =>
        p.condition === currentFilter ||
        (p.category && p.category.includes(currentFilter)) ||
        p.brand.toLowerCase() === currentFilter.toLowerCase()
      );
    }

    if (currentSearch.trim() !== '') {
      const search = currentSearch.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        (p.category && p.category.some(c => c.toLowerCase().includes(search))) ||
        p.specs.some(s => s.toLowerCase().includes(search)) ||
        p.desc.toLowerCase().includes(search) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(search)))
      );
    }

    const gridId = window.location.pathname.includes('/Page/') ? 'productGrid' : 'featuredGrid';
    renderProducts(filtered, gridId);

    const resultCount = document.getElementById('resultCount');
    const resultsDiv = document.getElementById('searchResultsCount');
    if (resultCount && resultsDiv) {
      resultCount.textContent = filtered.length;
      resultsDiv.classList.toggle('visible', currentSearch.trim() !== '');
    }
  }

  function attachQuickViewListeners() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal(+btn.dataset.id));
    });

    document.querySelectorAll('.product-card[data-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        const detailPage = isInPageFolder
          ? `product-info.html?id=${card.dataset.id}`
          : `Page/product-info.html?id=${card.dataset.id}`;
        window.location.href = detailPage;
      });
    });
  }

  const modal = document.getElementById('quickViewModal');
  const modalClose = document.getElementById('modalClose');

  function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p || !modal) return;
    const waMsg = encodeURIComponent(`Hi Agwan Traders, I'm interested in the ${p.brand} ${p.name} (PKR ${p.price}). Is it available?`);
    const specsHtml = p.specs.map(s => {
      const icon = specIconMap[s] || 'fa-circle';
      return `<span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;padding:4px 12px;border-radius:999px;background:rgba(0,0,0,0.02);border:1px solid var(--b-lo);color:var(--t-300);margin:3px;"><i class="fas ${icon}" style="font-size:0.7rem;color:var(--t-400)"></i>${s}</span>`;
    }).join('');
    const badgeCls = p.condition === 'new' ? 'badge-new' : p.condition === 'used' ? 'badge-used' : 'badge-refurbished';
    const badgeTxt = p.condition.charAt(0).toUpperCase() + p.condition.slice(1);

    modal.querySelector('.modal-product-image').innerHTML = p.images && p.images.length > 0
      ? `<img src="${p.images[0]}" alt="${p.brand} ${p.name}" style="width:100%;height:100%;object-fit:contain;padding:16px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-bolt\\' style=\\'font-size:5rem;color:rgba(0,0,0,0.04);\\'></i>';" />`
      : '<i class="fas fa-bolt"></i>';
    modal.querySelector('.modal-product-brand').textContent = p.brand;
    modal.querySelector('.modal-product-name').innerHTML = `${p.name} <span class="badge ${badgeCls}" style="font-size:0.55rem;vertical-align:middle;">${badgeTxt}</span>`;
    modal.querySelector('.modal-product-price').innerHTML = `PKR ${p.price} <small>+ Tax</small>`;
    modal.querySelector('.modal-product-desc').textContent = p.desc || `Quality ${p.condition} ${p.brand} ${p.name} available at Agwan Traders.`;
    modal.querySelector('.modal-specs').innerHTML = specsHtml;
    modal.querySelector('.modal-whatsapp-link').href = `https://wa.me/923237284123?text=${waMsg}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  function initApp() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (filterBtns.length) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlFilter = urlParams.get('filter') || 'all';

      filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === urlFilter);
        if (btn.dataset.filter === urlFilter) {
          currentFilter = urlFilter;
        }
      });

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;
          filterAndRender();
        });
      });
    }

    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        if (searchClear) {
          searchClear.classList.toggle('visible', currentSearch.length > 0);
        }
        filterAndRender();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          currentSearch = '';
          searchClear.classList.remove('visible');
          filterAndRender();
          searchInput.focus();
        }
      });
    }

    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
      const featured = products.filter(p => p.condition === 'new').slice(0, 4);
      renderProducts(featured, 'featuredGrid');
    }

    filterAndRender();

    const detailContainer = document.getElementById('productDetail');
    if (detailContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      const product = productId !== null ? products.find(p => p.id === parseInt(productId)) : null;

      if (!product) {
        detailContainer.innerHTML = `
          <div class="not-found">
            <div class="container" style="text-align:center;">
              <i class="fas fa-box-open" style="font-size:5rem;color:var(--t-500);opacity:0.3;"></i>
              <h2 style="font-family:var(--f-head);font-size:2rem;margin-top:var(--s-lg);color:var(--t-200);">Product Not Found</h2>
              <p style="color:var(--t-400);margin-bottom:var(--s-lg);">The product you're looking for doesn't exist.</p>
              <a href="products.html" class="btn btn-primary btn-lg"><i class="fas fa-arrow-left"></i> Browse Products</a>
            </div>
          </div>`;
      } else {
        document.title = `${product.name} · Agwan Traders`;
        const waLink = `https://wa.me/923237284123?text=${encodeURIComponent(`Hi Agwan Traders, I'm interested in the ${product.brand} ${product.name} (PKR ${product.price}). Is it available?`)}`;
        
        const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;

        detailContainer.innerHTML = `
          <section class="product-detail">
            <div class="container">
              <div class="product-detail-grid">
                <div class="product-gallery">
                  <div class="product-gallery-main">
                    ${mainImage 
                      ? `<img src="${mainImage}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:20px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-bolt\\' style=\\'font-size:8rem;color:rgba(0,0,0,0.04);\\'></i>';" />`
                      : `<i class="fas fa-bolt" style="font-size:8rem;color:rgba(0,0,0,0.04);"></i>`
                    }
                    <span class="badge ${product.condition === 'new' ? 'badge-new' : product.condition === 'used' ? 'badge-used' : 'badge-refurbished'} product-badge">${product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}</span>
                  </div>
                  ${product.images && product.images.length > 1 ? `
                    <div class="product-gallery-thumbs">
                      ${product.images.map((img, i) => `
                        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-image="${img}">
                          <img src="${img}" alt="Thumbnail ${i+1}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';" />
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
                <div class="product-info-detail">
                  <div class="product-brand">${product.brand}</div>
                  <h2>${product.name}</h2>
                  <div class="product-price-large">PKR ${product.price} <small>+ Tax</small></div>
                  <p style="color:var(--t-300);line-height:1.8;margin-bottom:var(--s-md);">${product.desc || `Quality ${product.condition} ${product.brand} ${product.name} available at Agwan Traders.`}</p>
                  <div class="condition-box">
                    <i class="fas fa-info-circle"></i>
                    ${product.condition === 'new' ? 'Brand new, sealed box' : product.condition === 'used' ? 'Pre-owned, excellent condition' : 'Refurbished, fully tested'}
                  </div>
                  <div class="specs-grid-detail">
                    ${(product.specs || []).map(spec => {
                      const icon = specIconMap[spec] || 'fa-circle';
                      return `
                        <div class="spec-item-detail">
                          <i class="fas ${icon}"></i>
                          <div class="spec-info">
                            <span class="spec-label">${spec}</span>
                            <span class="spec-value">${spec}</span>
                          </div>
                        </div>`;
                    }).join('')}
                  </div>
                  <div style="display:flex;gap:var(--s-md);flex-wrap:wrap;margin-top:var(--s-lg);">
                    <a href="${waLink}" class="btn btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Inquire on WhatsApp</a>
                    <a href="tel:+923237284123" class="btn btn-primary btn-lg"><i class="fas fa-phone"></i> Call Now</a>
                  </div>
                  <a href="products.html" style="display:inline-flex;align-items:center;gap:6px;margin-top:var(--s-md);color:var(--t-400);font-size:0.85rem;"><i class="fas fa-arrow-left"></i> Back to products</a>
                </div>
              </div>
            </div>
          </section>`;

        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
          thumb.addEventListener('click', () => {
            const imgSrc = thumb.dataset.image;
            const mainEl = document.querySelector('.product-gallery-main');
            mainEl.innerHTML = `<img src="${imgSrc}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:20px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fas fa-bolt\\' style=\\'font-size:8rem;color:rgba(0,0,0,0.04);\\'></i>';" /><span class="badge ${product.condition === 'new' ? 'badge-new' : product.condition === 'used' ? 'badge-used' : 'badge-refurbished'} product-badge">${product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}</span>`;
            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
          });
        });
      }
    }
  }

  function revealOnScroll() {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });

  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
    }, { passive: true });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('ht-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ht-theme', next);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop()?.split('?')[0];
    if (href && href === path) a.classList.add('active');
  });

  console.log('Agwan Traders · Loaded');
});
