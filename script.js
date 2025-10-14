// menu mobile
function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "IMAGENS/menu_white_36dp.svg";

    }else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "IMAGENS/close_white_36dp.svg";
    }
};


// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Slider de imagens
const slides = document.querySelectorAll(".slides img");
const slidesContainer = document.querySelector(".slides");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    updateSlider();
    intervalId = setInterval(nextSlide, 4000);
}

function updateSlider() {
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    updateSlider();
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}


// Swipe para slider
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

function setSliderPosition() {
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function touchStart(index) {
    return function(event) {
        clearInterval(intervalId);
        isDragging = true;
        startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        prevTranslate = -slideIndex * slidesContainer.offsetWidth;
        slidesContainer.style.transition = 'none';
    }
}

function touchMove(event) {
    if (!isDragging) return;
    const currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    setSliderPosition();
}

function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    slidesContainer.style.transition = 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)';
    if (movedBy < -50 && slideIndex < slides.length - 1) {
        slideIndex++;
    } else if (movedBy > 50 && slideIndex > 0) {
        slideIndex--;
    }
    updateSlider();
    intervalId = setInterval(nextSlide, 5000);
}

// Touch events
slidesContainer.addEventListener('touchstart', touchStart(slideIndex));
slidesContainer.addEventListener('touchmove', touchMove);
slidesContainer.addEventListener('touchend', touchEnd);

// Mouse events
slidesContainer.addEventListener('mousedown', touchStart(slideIndex));
slidesContainer.addEventListener('mousemove', touchMove);
slidesContainer.addEventListener('mouseup', touchEnd);
slidesContainer.addEventListener('mouseleave', touchEnd);

// Impede o arrasto da imagem
slides.forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
});

document.addEventListener("DOMContentLoaded", () => {
    function updateSliderImages() {
      const isMobile = window.innerWidth <= 768;
      const slides = document.querySelectorAll(".slides img");
  
      slides.forEach((slide, index) => {
        const num = index + 1;
        slide.src = isMobile
          ? `IMAGENS/mobile/${num}-mobile.png`
          : `IMAGENS/${num}.png`;
      });
    }
  
    // Atualiza ao carregar e ao redimensionar
    updateSliderImages();
    window.addEventListener("resize", updateSliderImages);
  });
  

// Botão Voltar ao Topo
const backToTop = document.getElementById('backToTop');
window.onscroll = function() {
    if (window.scrollY > 200) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};
backToTop.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};





// Componente de Acessibilidade para Rocket's Burger
class AccessibilityWidget {
    constructor() {
        this.isOpen = false;
        this.settings = {
            highContrast: false,
            fontSize: 'normal'
        };
        
        this.init();
        this.loadSettings();
    }

    init() {
        // Elementos do DOM
        this.accessibilityBtn = document.getElementById('accessibility-btn');
        this.accessibilityPanel = document.getElementById('accessibility-panel');
        this.accessibilityOverlay = document.getElementById('accessibility-overlay');
        this.closeBtn = document.getElementById('close-panel');
        this.highContrastToggle = document.getElementById('high-contrast');
        this.fontSizeButtons = document.querySelectorAll('.font-size-btn');

        // Event listeners
        this.setupEventListeners();
        
        // Configuração inicial de ARIA
        this.setupARIA();
    }

    setupEventListeners() {
        // Abrir painel
        this.accessibilityBtn.addEventListener('click', () => this.openPanel());
        
        // Fechar painel
        this.closeBtn.addEventListener('click', () => this.closePanel());
        this.accessibilityOverlay.addEventListener('click', () => this.closePanel());
        
        // Alto contraste
        this.highContrastToggle.addEventListener('change', (e) => {
            this.toggleHighContrast(e.target.checked);
        });
        
        // Tamanho da fonte
        this.fontSizeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const size = e.target.dataset.size;
                this.changeFontSize(size);
            });
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Trap focus no painel quando aberto
        this.accessibilityPanel.addEventListener('keydown', (e) => this.trapFocus(e));
    }

    setupARIA() {
        // Configurar atributos ARIA iniciais
        this.accessibilityPanel.setAttribute('aria-hidden', 'true');
        this.accessibilityOverlay.setAttribute('aria-hidden', 'true');
        
        // Configurar botões de tamanho da fonte
        this.fontSizeButtons.forEach(btn => {
            btn.setAttribute('role', 'button');
            btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
        });
    }

    openPanel() {
        this.isOpen = true;
        
        // Mostrar painel e overlay
        this.accessibilityPanel.classList.add('active');
        this.accessibilityOverlay.classList.add('active');
        
        // Atualizar ARIA
        this.accessibilityPanel.setAttribute('aria-hidden', 'false');
        this.accessibilityOverlay.setAttribute('aria-hidden', 'false');
        
        // Focar no primeiro elemento focável
        const firstFocusable = this.accessibilityPanel.querySelector('button, input, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        // Prevenir scroll do body
        document.body.style.overflow = 'hidden';
        
        // Anunciar para leitores de tela
        this.announceToScreenReader('Painel de acessibilidade aberto');
    }

    closePanel() {
        this.isOpen = false;
        
        // Esconder painel e overlay
        this.accessibilityPanel.classList.remove('active');
        this.accessibilityOverlay.classList.remove('active');
        
        // Atualizar ARIA
        this.accessibilityPanel.setAttribute('aria-hidden', 'true');
        this.accessibilityOverlay.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll do body
        document.body.style.overflow = '';
        
        // Retornar foco para o botão de acessibilidade
        this.accessibilityBtn.focus();
        
        // Anunciar para leitores de tela
        this.announceToScreenReader('Painel de acessibilidade fechado');
    }

    toggleHighContrast(enabled) {
        this.settings.highContrast = enabled;
        
        if (enabled) {
            document.body.classList.add('high-contrast');
            this.announceToScreenReader('Alto contraste ativado');
        } else {
            document.body.classList.remove('high-contrast');
            this.announceToScreenReader('Alto contraste desativado');
        }
        
        this.saveSettings();
    }

    changeFontSize(size) {
        // Remover classes de tamanho anteriores
        document.body.classList.remove('font-large', 'font-extra-large');
        
        // Atualizar botões ativos
        this.fontSizeButtons.forEach(btn => {
            const isActive = btn.dataset.size === size;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        
        // Aplicar nova classe de tamanho
        if (size === 'large') {
            document.body.classList.add('font-large');
        } else if (size === 'extra-large') {
            document.body.classList.add('font-extra-large');
        }
        
        this.settings.fontSize = size;
        this.saveSettings();
        
        // Anunciar mudança
        const sizeNames = {
            'normal': 'padrão',
            'large': 'grande',
            'extra-large': 'extra grande'
        };
        this.announceToScreenReader(`Tamanho da fonte alterado para ${sizeNames[size]}`);
    }

    handleKeydown(e) {
        // ESC para fechar painel
        if (e.key === 'Escape' && this.isOpen) {
            this.closePanel();
            e.preventDefault();
        }
        
        // Alt + A para abrir painel de acessibilidade
        if (e.altKey && e.key.toLowerCase() === 'a' && !this.isOpen) {
            this.openPanel();
            e.preventDefault();
        }
    }

    trapFocus(e) {
        if (!this.isOpen) return;
        
        const focusableElements = this.accessibilityPanel.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    }

    announceToScreenReader(message) {
        // Criar elemento para anúncio
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remover após um tempo
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    saveSettings() {
        try {
            localStorage.setItem('rocketsAccessibility', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Não foi possível salvar as configurações de acessibilidade:', e);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('rocketsAccessibility');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                this.applySettings();
            }
        } catch (e) {
            console.warn('Não foi possível carregar as configurações de acessibilidade:', e);
        }
    }

    applySettings() {
        // Aplicar alto contraste
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
            this.highContrastToggle.checked = true;
        }
        
        // Aplicar tamanho da fonte
        this.changeFontSize(this.settings.fontSize);
    }

    // Método público para integração com outros scripts
    getSettings() {
        return { ...this.settings };
    }

    // Método público para definir configurações programaticamente
    setSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.applySettings();
        this.saveSettings();
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se os elementos necessários existem
    const requiredElements = [
        'accessibility-btn',
        'accessibility-panel',
        'accessibility-overlay',
        'close-panel',
        'high-contrast'
    ];
    
    const allElementsExist = requiredElements.every(id => document.getElementById(id));
    
    if (allElementsExist) {
        window.accessibilityWidget = new AccessibilityWidget();
        
        // Adicionar indicador visual de carregamento
        console.log('🚀 Componente de Acessibilidade do Rocket\'s Burger carregado com sucesso!');
        
        // Anunciar disponibilidade para leitores de tela
        setTimeout(() => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = 'Componente de acessibilidade carregado. Pressione Alt + A para abrir as opções.';
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 3000);
        }, 1000);
    } else {
        console.error('Erro: Nem todos os elementos necessários para o componente de acessibilidade foram encontrados.');
    }
});

// Exportar para uso em módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityWidget;
}




// Estado do carrinho
let cart = [];
let cartTotal = 0;

// Elementos DOM
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const notification = document.getElementById('notification');
const addToCartButtons = document.querySelectorAll('.btn-menu');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para botões de adicionar ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const categoria = this.getAttribute('data-ctg');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(id, categoria, name, price);
            
            // Animação no botão
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
        });
    });

    // Event listeners para o carrinho
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === cartOverlay) {
            toggleCart();
        }
    });

    // Carregar carrinho do localStorage
    loadCartFromStorage();
    updateCartDisplay();
});

// Função para adicionar item ao carrinho
function addToCart(id, categoria, name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            categoria: categoria,
            name: name,
            price: price,
            originalPrice: price, // Garante que originalPrice seja definido
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification();
    saveCartToStorage();
    
    // Animação no contador do carrinho
    cartCount.classList.add('show');
    cartBtn.style.animation = 'none';
    cartBtn.offsetHeight; // Trigger reflow
    cartBtn.style.animation = 'cartBounce 0.6s ease';
}

// Função para remover item do carrinho
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    saveCartToStorage();
}

// Função para atualizar quantidade
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

// Função para atualizar display do carrinho
function updateCartDisplay() {
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.classList.add('show');
    } else {
        cartCount.classList.remove('show');
    }
    
    // Atualizar total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2).replace('.', ',');
    
    // Atualizar itens do carrinho
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="edit-item" data-name="${item.name}" title="Editar item">                       <i class="fas fa-pencil-alt"></i>
                    </button>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Função para mostrar/ocultar carrinho
function toggleCart() {
    cartOverlay.classList.toggle('show');
    
    // Prevenir scroll do body quando carrinho estiver aberto
    if (cartOverlay.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Função para mostrar notificação
function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para salvar carrinho no localStorage
function saveCartToStorage() {
    localStorage.setItem('rocketsBurgerCart', JSON.stringify(cart));
}

// Função para carregar carrinho do localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('rocketsBurgerCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Animação CSS adicional via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        animation: slideInUp 0.6s ease forwards;
    }
    
    .product-card:nth-child(1) { animation-delay: 0.1s; }
    .product-card:nth-child(2) { animation-delay: 0.2s; }
    .product-card:nth-child(3) { animation-delay: 0.3s; }
    .product-card:nth-child(4) { animation-delay: 0.4s; }
    .product-card:nth-child(5) { animation-delay: 0.5s; }
    .product-card:nth-child(6) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);

// Função para finalizar pedido (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        const orderSummary = cart.map(item => {
            let extrasText = "";
        
            if (item.extras) {
                const chosenExtras = [];
        
                // Carne
                if (item.extras.extraCheese) chosenExtras.push("Queijo extra");
                if (item.extras.extraBacon) chosenExtras.push("Bacon extra");
                if (item.extras.extraMeat) chosenExtras.push("Carne extra");
                if (item.extras.noPickles) chosenExtras.push("Sem picles");
                if (item.extras.noOnions) chosenExtras.push("Sem cebola");
        
                // Frango
                if (item.extras.extraChicken) chosenExtras.push("Frango extra");
                if (item.extras.noMayo) chosenExtras.push("Sem maionese");
        
                // Acompanhamento
                if (item.extras.extraSauce) chosenExtras.push("Molho extra");
                if (item.extras.noSalt) chosenExtras.push("Sem sal");
        
                // Bebida
                if (item.extras.withIce) chosenExtras.push("Com gelo");
                if (item.extras.withLemon) chosenExtras.push("Com limão");
        
                // Observações
                if (item.extras.observations) {
                    chosenExtras.push(`Obs: ${item.extras.observations}`);
                }
        
                if (chosenExtras.length > 0) {
                    extrasText = `\n   ➝ ${chosenExtras.join(", ")}`;
                }
            }
        
            return `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}${extrasText}`;
        }).join('\n');
        
        const total = cartTotal.toFixed(2).replace('.', ',');
        
        alert(`Pedido realizado com sucesso!\n\n
        Resumo do pedido:\n${orderSummary}\n\n
        Total: R$ ${total}\n\n
        Obrigado por escolher o Rocket's Burger! 🚀🍔`);
        
        // Limpar carrinho após pedido
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        toggleCart();
    }
});

// Efeitos de hover nos ícones de categoria
document.addEventListener('DOMContentLoaded', function() {
    const categoryIcons = document.querySelectorAll('.category-icon');
    
    categoryIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active de todos
            categoryIcons.forEach(i => i.classList.remove('active'));
            // Adiciona active no clicado
            this.classList.add('active');
        });
    });
});

// Smooth scroll para seções (se houver links de navegação)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active de todos
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Adiciona active no clicado
        this.classList.add('active');
    });
});

// Efeito de loading nos produtos (simulação)
window.addEventListener('load', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Função para adicionar efeito de ripple nos botões
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Adicionar efeito ripple aos botões
document.querySelectorAll('.btn-menu, .login-btn, .checkout-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// CSS para o efeito ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-menu, .login-btn, .checkout-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);


// Função para editar item do carrinho
function editItem(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        let optionsHTML = "";

        // Definir opções conforme categoria
        if (item.categoria === "Carne") {
            optionsHTML = `
                <div class="edit-option">
                    <label><input type="checkbox" id="extraCheese" onchange="updateItemPrice('${name}')"> Queijo extra (+R$ 2,00)</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="extraBacon" onchange="updateItemPrice('${name}')"> Bacon extra (+R$ 3,50)</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="extraMeat" onchange="updateItemPrice('${name}')"> Carne extra (+R$ 5,00)</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="noPickles"> Sem picles</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="noOnions"> Sem cebola</label>
                </div>
            `;
        } else if (item.categoria === "Frango") {
            optionsHTML = `
                <div class="edit-option">
                    <label><input type="checkbox" id="extraCheese" onchange="updateItemPrice('${name}')"> Queijo extra (+R$ 2,00)</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="extraChicken" onchange="updateItemPrice('${name}')"> Frango extra (+R$ 4,50)</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="noMayonnaise"> Sem maionese</label>
                </div>
            `;
        } else if (item.categoria === "Acompanhamento") {
            optionsHTML = `
                <div class="edit-option">
                    <label><input type="checkbox" id="extraSauce" onchange="updateItemPrice('${name}')"> Molho extra (+R$ 2,00)</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="noSalt"> Sem sal</label>
                </div>
            `;
        } else if (item.categoria === "Bebida") {
            optionsHTML = ` 
                <div class="edit-option">
                    <label><input type="checkbox" id="withLemon"> Com limão</label>
                </div>
                <div class="edit-option">
                    <label><input type="checkbox" id="withIce"> Com gelo</label>
                </div>
            `;
        }

        // Montar modal com as opções certas
        const modal = document.createElement('div');
        modal.className = 'edit-modal';
        modal.innerHTML = `
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h3>Editar Item</h3>
                    <button class="close-edit-modal" onclick="closeEditModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="edit-modal-body">
                    <div class="edit-item-info">
                        <h4>${item.name}</h4>
                        <p class="edit-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="edit-options">${optionsHTML}</div>
                    <div class="edit-option">
                        <label for="observations">Observações:</label>
                        <textarea id="observations" placeholder="Alguma observação especial..."></textarea>
                    </div>
                </div>
                <div class="edit-modal-footer">
                    <button class="cancel-edit-btn" onclick="closeEditModal()">Cancelar</button>
                    <button class="save-edit-btn" onclick="saveItemEdit('${name}')">Salvar Alterações</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);



        if (item.extras) {
            if (item.extras.extraCheese) document.getElementById('extraCheese').checked = true;
            if (item.extras.extraBacon) document.getElementById('extraBacon').checked = true;
            if (item.extras.extraMeat) document.getElementById('extraMeat').checked = true;
            if (item.extras.extraChicken) document.getElementById('extraChicken').checked = true;
            if (item.extras.extraSauce) document.getElementById('extraSauce').checked = true;
            if (item.extras.noPickles) document.getElementById('noPickles').checked = true;
            if (item.extras.noOnions) document.getElementById('noOnions').checked = true;
            if (item.extras.noMayonnaise) document.getElementById('noMayonnaise').checked = true;
            if (item.extras.noSalt) document.getElementById('noSalt').checked = true;
            if (item.extras.withLemon) document.getElementById('withLemon').checked = true;
            if (item.extras.withIce) document.getElementById('withIce').checked = true;
            if (item.extras.observations) document.getElementById('observations').value = item.extras.observations;
        }


        setTimeout(() => modal.classList.add('show'), 10);

        updateItemPrice(name);


    }
}


// Função para fechar modal de edição
function closeEditModal() {
    const modal = document.querySelector('.edit-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Função para atualizar preço do item durante edição
function updateItemPrice(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        let extraPrice = 0;
        
        if (document.getElementById('extraCheese')?.checked) extraPrice += 2.00;
        if (document.getElementById('extraBacon')?.checked) extraPrice += 3.50;
        if (document.getElementById('extraMeat')?.checked) extraPrice += 5.00;
        if (document.getElementById('extraChicken')?.checked) extraPrice += 4.50;
        if (document.getElementById('extraSauce')?.checked) extraPrice += 2.00;
        
        const totalPrice = (item.originalPrice || item.price) + extraPrice;
        const priceElement = document.querySelector('.edit-item-price');
        if (priceElement) {
            priceElement.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
        }
    }
}

// Função para salvar edições do item
function saveItemEdit(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        // Salvar preço original se não existir
        if (!item.originalPrice) {
            item.originalPrice = item.price;
        }
        
        // Calcular novo preço
        let extraPrice = 0;
        const extras = {
            extraCheese: document.getElementById('extraCheese')?.checked || false,
            extraBacon: document.getElementById('extraBacon')?.checked || false,
            extraMeat: document.getElementById('extraMeat')?.checked || false,
            extraChicken: document.getElementById('extraChicken')?.checked || false,
            extraSauce: document.getElementById('extraSauce')?.checked || false,
            noPickles: document.getElementById('noPickles')?.checked || false,
            noOnions: document.getElementById('noOnions')?.checked || false,
            noMayonnaise: document.getElementById('noMayonnaise')?.checked || false,
            noSalt: document.getElementById('noSalt')?.checked || false,
            withLemon: document.getElementById('withLemon')?.checked || false,
            withIce: document.getElementById('withIce')?.checked || false,
            observations: document.getElementById('observations')?.value || ''
        };
        
        if (extras.extraCheese) extraPrice += 2.00;
        if (extras.extraBacon) extraPrice += 3.50;
        if (extras.extraMeat) extraPrice += 5.00;
        if (extras.extraChicken) extraPrice += 4.50;
        if (extras.extraSauce) extraPrice += 2.00;
        
        // Atualizar item
        item.price = item.originalPrice + extraPrice;
        item.extras = extras;
        
        // Atualizar display e salvar
        updateCartDisplay();
        saveCartToStorage();
        
        // Fechar modal
        closeEditModal();
        
        // Mostrar notificação
        showEditNotification();
    }
}

// Função para mostrar notificação de edição
function showEditNotification() {
    const editNotification = document.createElement('div');
    editNotification.className = 'notification edit-notification show';
    editNotification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Item editado com sucesso!</span>
    `;
    
    document.body.appendChild(editNotification);
    
    setTimeout(() => {
        editNotification.classList.remove('show');
        setTimeout(() => editNotification.remove(), 300);
    }, 3000);
}



// Adicionar event listener para os botões de edição
document.addEventListener("click", function(e) {
    const editButton = e.target.closest(".edit-item");
    if (editButton) {
        const itemName = editButton.getAttribute("data-name");
        editItem(itemName);
    }
});