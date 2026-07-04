// ═══════════════════════════════════════════════════════
// AGWAN TRADERS · Main JavaScript (no particle effect)
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ──────────────────────────────────
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

  // ─── PRODUCTS DATA (only items you sell) ──────────
  const isInPageFolder = window.location.pathname.includes('/Page/');
  const imageBase = isInPageFolder ? '../assets/images/products/' : 'assets/images/products/';

const products = [
  // 1. Plugs (6)
  { id: 0, name: '2 Pin Plug', brand: 'Schneider', specs: ['10A', '16A'], price: '150', condition: 'new', category: ['plugs'], desc: 'Standard 2 pin plug for home appliances.', images: ['assets/images/products/2pin-plug.jpg'] },
  { id: 1, name: '2 Pin Plug', brand: 'Philips', specs: ['10A', '16A'], price: '160', condition: 'new', category: ['plugs'], desc: 'Premium 2 pin plug with durable construction.', images: ['assets/images/products/2pin-plug.jpg'] },
  { id: 2, name: '3 Pin Plug', brand: 'Schneider', specs: ['10A', '16A', '20A'], price: '200', condition: 'new', category: ['plugs'], desc: 'Heavy duty 3 pin plug with earth connection.', images: ['assets/images/products/3pin-plug.jpg'] },
  { id: 3, name: '3 Pin Plug', brand: 'Philips', specs: ['10A', '16A', '20A'], price: '220', condition: 'new', category: ['plugs'], desc: 'Premium 3 pin plug with gold plated pins.', images: ['assets/images/products/3pin-plug.jpg'] },
  { id: 4, name: '3 Pin Plug Heavy Duty', brand: 'Schneider', specs: ['20A', '32A'], price: '350', condition: 'new', category: ['plugs'], desc: 'Industrial grade 3 pin plug for high current applications.', images: ['assets/images/products/3pin-heavy.jpg'] },
  { id: 5, name: 'Universal Plug Adapter', brand: 'Philips', specs: ['2 Pin', '3 Pin'], price: '250', condition: 'new', category: ['plugs'], desc: 'Universal adapter for all pin types.', images: ['assets/images/products/adapter.jpg'] },

  // 2. Cables - Million Supreme (14)
  { id: 6, name: 'Supreme Cable 7/0.29', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '750', condition: 'new', category: ['wires'], desc: 'Premium quality copper cable for residential wiring.', images: ['assets/images/products/supreme-cable.jpg'] },
  { id: 7, name: 'Supreme Cable 3/0.29', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '550', condition: 'new', category: ['wires'], desc: 'Flexible cable for lighting and small appliances.', images: ['assets/images/products/supreme-cable.jpg'] },
  { id: 8, name: 'Supreme Cable 4mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '900', condition: 'new', category: ['wires'], desc: '4mm cable for power circuits and heavy loads.', images: ['assets/images/products/supreme-cable.jpg'] },
  { id: 9, name: 'Supreme Cable 1.5mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '450', condition: 'new', category: ['wires'], desc: '1.5mm cable for lighting circuits.', images: ['assets/images/products/supreme-cable.jpg'] },
  { id: 10, name: 'Supreme Cable 2.5mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '600', condition: 'new', category: ['wires'], desc: '2.5mm cable for general purpose power circuits.', images: ['assets/images/products/supreme-cable.jpg'] },
  { id: 11, name: 'Supreme Cable 6mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '1100', condition: 'new', category: ['wires'], desc: '6mm cable for high power appliances and sub-mains.', images: ['assets/images/products/supreme-cable.jpg'] },
  { id: 12, name: 'Supreme Cable 7/0.36', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '850', condition: 'new', category: ['wires'], desc: 'Flexible 7/0.36 cable for control panels.', images: ['assets/images/products/supreme-cable.jpg'] },

  // 2. Cables - Million Superior (7)
  { id: 13, name: 'Superior Cable 7/0.29', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '650', condition: 'new', category: ['wires'], desc: 'Cost-effective cable for general wiring.', images: ['assets/images/products/superior-cable.jpg'] },
  { id: 14, name: 'Superior Cable 3/0.29', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '480', condition: 'new', category: ['wires'], desc: 'Flexible cable for low load applications.', images: ['assets/images/products/superior-cable.jpg'] },
  { id: 15, name: 'Superior Cable 4mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '800', condition: 'new', category: ['wires'], desc: '4mm cable at affordable price point.', images: ['assets/images/products/superior-cable.jpg'] },
  { id: 16, name: 'Superior Cable 1.5mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '380', condition: 'new', category: ['wires'], desc: 'Budget friendly lighting cable.', images: ['assets/images/products/superior-cable.jpg'] },
  { id: 17, name: 'Superior Cable 2.5mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '520', condition: 'new', category: ['wires'], desc: 'Cost effective power cable.', images: ['assets/images/products/superior-cable.jpg'] },
  { id: 18, name: 'Superior Cable 6mm²', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '1000', condition: 'new', category: ['wires'], desc: 'Heavy duty cable at value price.', images: ['assets/images/products/superior-cable.jpg'] },
  { id: 19, name: 'Superior Cable 7/0.36', brand: 'Million', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '780', condition: 'new', category: ['wires'], desc: 'Flexible superior quality cable.', images: ['assets/images/products/superior-cable.jpg'] },

  // 2. Cables - Pakistan Cables (8)
  { id: 20, name: 'Pakistan Cable 7/0.29', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '700', condition: 'new', category: ['wires'], desc: 'Premium Pakistan made cable for residential use.', images: ['assets/images/products/pakistan-cable.jpg'] },
  { id: 21, name: 'Pakistan Cable 3/0.29', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '500', condition: 'new', category: ['wires'], desc: 'Quality cable for lighting circuits.', images: ['assets/images/products/pakistan-cable.jpg'] },
  { id: 22, name: 'Pakistan Cable 4mm²', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '850', condition: 'new', category: ['wires'], desc: 'Industrial grade 4mm cable.', images: ['assets/images/products/pakistan-cable.jpg'] },
  { id: 23, name: 'Pakistan Cable 1.5mm²', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '420', condition: 'new', category: ['wires'], desc: 'Economical lighting cable.', images: ['assets/images/products/pakistan-cable.jpg'] },
  { id: 24, name: 'Pakistan Cable 2.5mm²', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '580', condition: 'new', category: ['wires'], desc: 'Reliable power cable from Pakistan Cables.', images: ['assets/images/products/pakistan-cable.jpg'] },
  { id: 25, name: 'Pakistan Cable 6mm²', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '1050', condition: 'new', category: ['wires'], desc: 'High capacity cable for main circuits.', images: ['assets/images/products/pakistan-cable.jpg'] },
  { id: 26, name: 'Pakistan Cable 7/0.36', brand: 'Pakistan Cables', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '820', condition: 'new', category: ['wires'], desc: 'Flexible multi-strand cable.', images: ['assets/images/products/pakistan-cable.jpg'] },

  // 2. Multi-Core Cables (6)
  { id: 27, name: 'Twin Core Cable 1.5mm²', brand: 'Pakistan Cables', specs: ['Double Core Red/Black', 'Double Core Red/Blue'], price: '500', condition: 'new', category: ['wires'], desc: 'Double core cable for appliance wiring.', images: ['assets/images/products/twin-core.jpg'] },
  { id: 28, name: 'Twin Core Cable 2.5mm²', brand: 'Pakistan Cables', specs: ['Double Core Red/Black', 'Double Core Red/Blue'], price: '650', condition: 'new', category: ['wires'], desc: '2.5mm double core for power circuits.', images: ['assets/images/products/twin-core.jpg'] },
  { id: 29, name: 'Twin Core Cable 4mm²', brand: 'Pakistan Cables', specs: ['Double Core Red/Black', 'Double Core Red/Blue'], price: '950', condition: 'new', category: ['wires'], desc: 'Heavy duty double core cable.', images: ['assets/images/products/twin-core.jpg'] },
  { id: 30, name: 'Three Core Cable 1.5mm²', brand: 'Pakistan Cables', specs: ['Triple Core Red/Black/Blue'], price: '650', condition: 'new', category: ['wires'], desc: 'Three core cable for 3 phase applications.', images: ['assets/images/products/three-core.jpg'] },
  { id: 31, name: 'Three Core Cable 2.5mm²', brand: 'Pakistan Cables', specs: ['Triple Core Red/Black/Blue'], price: '850', condition: 'new', category: ['wires'], desc: '2.5mm 3 core for control circuits.', images: ['assets/images/products/three-core.jpg'] },
  { id: 32, name: 'Three Core Cable 4mm²', brand: 'Pakistan Cables', specs: ['Triple Core Red/Black/Blue'], price: '1200', condition: 'new', category: ['wires'], desc: 'Heavy duty 3 core cable for industrial use.', images: ['assets/images/products/three-core.jpg'] },

  // 2. Heat Proof Wires (2)
  { id: 33, name: 'Heat Proof Wire 1.5mm²', brand: 'GFC', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '600', condition: 'new', category: ['wires'], desc: 'Heat resistant wire for oven and heater connections.', images: ['assets/images/products/heat-proof.jpg'] },
  { id: 34, name: 'Heat Proof Wire 2.5mm²', brand: 'GFC', specs: ['Single Core Red', 'Single Core Black', 'Single Core Blue', 'Single Core Yellow', 'Single Core Green'], price: '800', condition: 'new', category: ['wires'], desc: 'Heavy duty heat proof wire for industrial heaters.', images: ['assets/images/products/heat-proof.jpg'] },

  // 3. Regulators (3)
  { id: 35, name: 'Fan Regulator Step Type', brand: 'Philips', specs: ['Step Type'], price: '300', condition: 'new', category: ['regulators'], desc: 'Step type fan speed regulator with 5 speeds.', images: ['assets/images/products/regulator.jpg'] },
  { id: 36, name: 'Fan Regulator Electronic', brand: 'Schneider', specs: ['Electronic'], price: '350', condition: 'new', category: ['regulators'], desc: 'Electronic fan regulator for smooth speed control.', images: ['assets/images/products/regulator.jpg'] },
  { id: 37, name: 'Fan Regulator', brand: 'GFC', specs: ['Step Type', 'Electronic'], price: '280', condition: 'new', category: ['regulators'], desc: 'Budget fan regulator for home use.', images: ['assets/images/products/regulator.jpg'] },

  // 4. Breakers (9)
  { id: 38, name: 'Single Pole Breaker', brand: 'Schneider', specs: ['10A', '16A', '20A', '32A'], price: '450', condition: 'new', category: ['breakers'], desc: 'Single pole MCB for lighting and small circuits.', images: ['assets/images/products/breaker.jpg'] },
  { id: 39, name: 'Single Pole Breaker', brand: 'Philips', specs: ['10A', '16A', '20A', '32A'], price: '480', condition: 'new', category: ['breakers'], desc: 'Premium single pole breaker with quick trip.', images: ['assets/images/products/breaker.jpg'] },
  { id: 40, name: 'Single Pole Breaker', brand: 'GFC', specs: ['10A', '16A', '20A', '32A'], price: '420', condition: 'new', category: ['breakers'], desc: 'Economical single pole breaker for homes.', images: ['assets/images/products/breaker.jpg'] },
  { id: 41, name: 'Double Pole Breaker', brand: 'Schneider', specs: ['16A', '20A', '32A', '40A'], price: '800', condition: 'new', category: ['breakers'], desc: 'Double pole MCB for 240V circuits.', images: ['assets/images/products/double-breaker.jpg'] },
  { id: 42, name: 'Double Pole Breaker', brand: 'Philips', specs: ['16A', '20A', '32A', '40A'], price: '850', condition: 'new', category: ['breakers'], desc: 'Premium double pole breaker with surge protection.', images: ['assets/images/products/double-breaker.jpg'] },
  { id: 43, name: 'Triple Pole Breaker', brand: 'Schneider', specs: ['16A', '20A', '32A', '40A', '63A'], price: '1200', condition: 'new', category: ['breakers'], desc: '3 pole MCB for 3 phase circuits.', images: ['assets/images/products/triple-breaker.jpg'] },
  { id: 44, name: 'Triple Pole Breaker', brand: 'GFC', specs: ['16A', '20A', '32A', '40A', '63A'], price: '1150', condition: 'new', category: ['breakers'], desc: 'Cost effective 3 pole breaker.', images: ['assets/images/products/triple-breaker.jpg'] },
  { id: 45, name: '3 Pole Breaker', brand: 'Philips', specs: ['16A', '20A', '32A', '40A', '63A'], price: '1250', condition: 'new', category: ['breakers'], desc: 'Heavy duty 3 pole MCB with high breaking capacity.', images: ['assets/images/products/triple-breaker.jpg'] },
  { id: 46, name: 'DC Breaker', brand: 'Schneider', specs: ['10A', '16A', '20A', '32A', '65A', '125A'], price: '600', condition: 'new', category: ['breakers'], desc: 'DC rated breaker for solar systems.', images: ['assets/images/products/dc-breaker.jpg'] },

  // 5. Contactors (4)
  { id: 47, name: 'Contactor 9A', brand: 'Schneider', specs: ['9A', '12A'], price: '1500', condition: 'new', category: ['contactors'], desc: 'Compact contactor for lighting and motor control.', images: ['assets/images/products/contactor.jpg'] },
  { id: 48, name: 'Contactor 16A', brand: 'Schneider', specs: ['16A', '20A'], price: '1800', condition: 'new', category: ['contactors'], desc: '16A contactor for industrial applications.', images: ['assets/images/products/contactor.jpg'] },
  { id: 49, name: 'Contactor 25A', brand: 'Schneider', specs: ['25A', '32A'], price: '2200', condition: 'new', category: ['contactors'], desc: '25A contactor for HVAC and pumps.', images: ['assets/images/products/contactor.jpg'] },
  { id: 50, name: 'Contactor 40A', brand: 'Schneider', specs: ['40A', '50A'], price: '2800', condition: 'new', category: ['contactors'], desc: 'High capacity contactor for heavy machinery.', images: ['assets/images/products/contactor.jpg'] },

  // 6. Protection Devices (6)
  { id: 51, name: 'Voltage Protector', brand: 'Schneider', specs: ['Single Phase', 'Three Phase'], price: '2200', condition: 'new', category: ['protection'], desc: 'Protects appliances from over/under voltage.', images: ['assets/images/products/voltage-protector.jpg'] },
  { id: 52, name: 'Voltage Protector', brand: 'Philips', specs: ['Single Phase', 'Three Phase'], price: '2000', condition: 'new', category: ['protection'], desc: 'Premium voltage protector with LED display.', images: ['assets/images/products/voltage-protector.jpg'] },
  { id: 53, name: 'Voltage Protector', brand: 'Orient', specs: ['Single Phase', 'Three Phase'], price: '1900', condition: 'new', category: ['protection'], desc: 'Economical voltage protector for homes.', images: ['assets/images/products/voltage-protector.jpg'] },
  { id: 54, name: 'Unit Lock Digital', brand: 'Schneider', specs: ['Digital'], price: '2500', condition: 'new', category: ['protection'], desc: 'Digital voltage monitor with trip memory.', images: ['assets/images/products/unit-lock.jpg'] },
  { id: 55, name: 'Unit Lock Analog', brand: 'Philips', specs: ['Analog'], price: '2300', condition: 'new', category: ['protection'], desc: 'Analog unit lock with mechanical display.', images: ['assets/images/products/unit-lock.jpg'] },
  { id: 56, name: 'Surge Protector', brand: 'Schneider', specs: ['1 Pole', '2 Pole', '4 Pole'], price: '2000', condition: 'new', category: ['protection'], desc: 'Protects against lightning surges and spikes.', images: ['assets/images/products/surge-protector.jpg'] },

  // 7. Meters (4)
  { id: 57, name: 'Voltmeter Analog', brand: 'Schneider', specs: ['Analog 0-300V'], price: '1200', condition: 'new', category: ['meters'], desc: 'Analog voltmeter for panel mounting.', images: ['assets/images/products/voltmeter.jpg'] },
  { id: 58, name: 'Voltmeter Digital', brand: 'Schneider', specs: ['Digital 0-300V'], price: '1500', condition: 'new', category: ['meters'], desc: 'Digital voltmeter with backlit display.', images: ['assets/images/products/voltmeter.jpg'] },
  { id: 59, name: 'Ampere Meter Analog', brand: 'Schneider', specs: ['Analog 0-100A'], price: '1100', condition: 'new', category: ['meters'], desc: 'Analog ammeter for current monitoring.', images: ['assets/images/products/ammeter.jpg'] },
  { id: 60, name: 'Ampere Meter Digital', brand: 'Philips', specs: ['Digital 0-100A'], price: '1400', condition: 'new', category: ['meters'], desc: 'Digital ammeter with peak hold function.', images: ['assets/images/products/ammeter.jpg'] },

  // 8. Lugs (4)
  { id: 61, name: 'Cable Lug 10mm²', brand: 'GFC', specs: ['10mm²', '16mm²'], price: '150', condition: 'new', category: ['lugs'], desc: 'Copper cable lugs for secure termination.', images: ['assets/images/products/lugs.jpg'] },
  { id: 62, name: 'Cable Lug 16mm²', brand: 'GFC', specs: ['16mm²', '25mm²'], price: '200', condition: 'new', category: ['lugs'], desc: 'Heavy duty cable lugs for power cables.', images: ['assets/images/products/lugs.jpg'] },
  { id: 63, name: 'Cable Lug 25mm²', brand: 'GFC', specs: ['25mm²', '35mm²'], price: '250', condition: 'new', category: ['lugs'], desc: 'Large size lugs for main supply cables.', images: ['assets/images/products/lugs.jpg'] },
  { id: 64, name: 'Cable Lug 35mm²', brand: 'GFC', specs: ['35mm²', '50mm²'], price: '350', condition: 'new', category: ['lugs'], desc: 'Extra heavy duty lugs for industrial cables.', images: ['assets/images/products/lugs.jpg'] },

  // 9. Switches (6)
  { id: 65, name: '1 Gang Switch', brand: 'Philips', specs: ['10A', '16A'], price: '150', condition: 'new', category: ['switches'], desc: 'Single gang switch for lighting control.', images: ['assets/images/products/switch.jpg'] },
  { id: 66, name: '2 Gang Switch', brand: 'Philips', specs: ['10A', '16A'], price: '250', condition: 'new', category: ['switches'], desc: 'Double gang switch for multiple loads.', images: ['assets/images/products/switch.jpg'] },
  { id: 67, name: '3 Gang Switch', brand: 'Philips', specs: ['10A', '16A'], price: '350', condition: 'new', category: ['switches'], desc: 'Triple gang switch for central control.', images: ['assets/images/products/switch.jpg'] },
  { id: 68, name: 'Dimmer Switch', brand: 'Philips', specs: ['200W', '400W', '600W'], price: '600', condition: 'new', category: ['switches'], desc: 'Light dimmer for mood lighting.', images: ['assets/images/products/dimmer.jpg'] },
  { id: 69, name: 'Selector Switch 2 Position', brand: 'Schneider', specs: ['2 Position'], price: '400', condition: 'new', category: ['switches'], desc: '2 position selector switch for panel control.', images: ['assets/images/products/selector.jpg'] },
  { id: 70, name: 'Selector Switch 3 Position', brand: 'Philips', specs: ['3 Position'], price: '380', condition: 'new', category: ['switches'], desc: '3 position selector switch for mode selection.', images: ['assets/images/products/selector.jpg'] },

  // 10. Electric Tapes (3)
  { id: 71, name: 'Electric Tape', brand: 'Philips', specs: ['Black', 'Red', 'Blue', 'Green', 'Yellow'], price: '150', condition: 'new', category: ['tapes'], desc: 'Premium PVC insulation tape for wiring.', images: ['assets/images/products/tape.jpg'] },
  { id: 72, name: 'Electric Tape', brand: 'Schneider', specs: ['Black', 'Red', 'Blue', 'Green', 'Yellow'], price: '160', condition: 'new', category: ['tapes'], desc: 'Heavy duty insulation tape for electrical work.', images: ['assets/images/products/tape.jpg'] },
  { id: 73, name: 'PVC Insulation Tape', brand: 'GFC', specs: ['Black', 'Red', 'Blue', 'Green', 'Yellow'], price: '130', condition: 'new', category: ['tapes'], desc: 'Economical PVC tape for general use.', images: ['assets/images/products/tape.jpg'] },

  // 11. Stabilizers (4)
  { id: 74, name: 'Stabilizer 2 Relay', brand: 'Orient', specs: ['100-250V / 2 Relay'], price: '4500', condition: 'new', category: ['stabilizers'], desc: '2 relay voltage stabilizer for ACs and refrigerators.', images: ['assets/images/products/stabilizer.jpg'] },
  { id: 75, name: 'Stabilizer 3 Relay', brand: 'Orient', specs: ['110-220V / 3 Relay'], price: '5500', condition: 'new', category: ['stabilizers'], desc: '3 relay stabilizer for sensitive appliances.', images: ['assets/images/products/stabilizer.jpg'] },
  { id: 76, name: 'Stabilizer 4 Relay', brand: 'Orient', specs: ['160-220V / 4 Relay'], price: '6500', condition: 'new', category: ['stabilizers'], desc: 'Premium 4 relay stabilizer for whole house.', images: ['assets/images/products/stabilizer.jpg'] },
  { id: 77, name: 'Stabilizer 3 Relay', brand: 'GFC', specs: ['100-250V / 3 Relay'], price: '5000', condition: 'new', category: ['stabilizers'], desc: 'Value stabilizer with 3 relay protection.', images: ['assets/images/products/stabilizer.jpg'] },

  // 12. Battery Chargers (3)
  { id: 78, name: 'Battery Charger 12V 5A', brand: 'Pel', specs: ['12V 5A', '12V 10A'], price: '2500', condition: 'new', category: ['chargers'], desc: '12V battery charger for car and UPS batteries.', images: ['assets/images/products/charger.jpg'] },
  { id: 79, name: 'Battery Charger 24V 5A', brand: 'Pel', specs: ['24V 5A', '24V 10A'], price: '3500', condition: 'new', category: ['chargers'], desc: '24V battery charger for solar systems.', images: ['assets/images/products/charger.jpg'] },
  { id: 80, name: 'Battery Charger 12V 10A', brand: 'Orient', specs: ['12V 10A', '24V 10A'], price: '3200', condition: 'new', category: ['chargers'], desc: 'Multi voltage charger with auto cut-off.', images: ['assets/images/products/charger.jpg'] },

  // 13. Float Switches (3)
  { id: 81, name: 'Float Switch Vertical', brand: 'Schneider', specs: ['Vertical'], price: '800', condition: 'new', category: ['float-switches'], desc: 'Vertical float switch for tank level control.', images: ['assets/images/products/float.jpg'] },
  { id: 82, name: 'Float Switch Horizontal', brand: 'Philips', specs: ['Horizontal'], price: '750', condition: 'new', category: ['float-switches'], desc: 'Horizontal float switch for small tanks.', images: ['assets/images/products/float.jpg'] },
  { id: 83, name: 'Float Switch', brand: 'GFC', specs: ['Vertical', 'Horizontal'], price: '700', condition: 'new', category: ['float-switches'], desc: 'Economical float switch for water pumps.', images: ['assets/images/products/float.jpg'] },

  // 14. Solder Iron & Accessories (4)
  { id: 84, name: 'Solder Iron 60W', brand: 'Marshal', specs: ['60W', '75W'], price: '800', condition: 'new', category: ['tools'], desc: '60W solder iron for electronics work.', images: ['assets/images/products/solder-iron.jpg'] },
  { id: 85, name: 'Solder Iron 100W', brand: 'Marshal', specs: ['100W', '150W'], price: '1000', condition: 'new', category: ['tools'], desc: 'Heavy duty solder iron for industrial use.', images: ['assets/images/products/solder-iron.jpg'] },
  { id: 86, name: 'Solder Element', brand: 'Marshal', specs: ['75W', '100W', '150W', '200W'], price: '400', condition: 'new', category: ['tools'], desc: 'Replacement heating element for solder irons.', images: ['assets/images/products/solder-element.jpg'] },
  { id: 87, name: 'Solder Tip Set', brand: 'Marshal', specs: ['Flat', 'Pointed', 'Chisel'], price: '150', condition: 'new', category: ['tools'], desc: 'Multiple solder tips for different applications.', images: ['assets/images/products/solder-tip.jpg'] },

  // 15. Panel Box (3)
  { id: 88, name: 'Panel Box 4 Way', brand: 'Schneider', specs: ['4 Way', '6 Way'], price: '1800', condition: 'new', category: ['panel'], desc: '4 way distribution board for homes.', images: ['assets/images/products/panel-box.jpg'] },
  { id: 89, name: 'Panel Box 8 Way', brand: 'Schneider', specs: ['8 Way', '12 Way'], price: '2500', condition: 'new', category: ['panel'], desc: '8 way panel box for apartments.', images: ['assets/images/products/panel-box.jpg'] },
  { id: 90, name: 'Panel Box 16 Way', brand: 'Schneider', specs: ['16 Way', '20 Way'], price: '3500', condition: 'new', category: ['panel'], desc: 'Large distribution board for commercial use.', images: ['assets/images/products/panel-box.jpg'] },

  // 16. UPS/Inverters (4)
  { id: 91, name: 'UPS 2+2', brand: 'Pel', specs: ['2+2 Lights/Fans'], price: '8000', condition: 'new', category: ['ups'], desc: 'UPS for 2 lights + 2 fans.', images: ['assets/images/products/ups.jpg'] },
  { id: 92, name: 'UPS 3+3', brand: 'Pel', specs: ['3+3 Lights/Fans'], price: '10000', condition: 'new', category: ['ups'], desc: 'UPS for 3 lights + 3 fans.', images: ['assets/images/products/ups.jpg'] },
  { id: 93, name: 'UPS 4+4', brand: 'Pel', specs: ['4+4 Lights/Fans'], price: '12000', condition: 'new', category: ['ups'], desc: 'UPS for 4 lights + 4 fans.', images: ['assets/images/products/ups.jpg'] },
  { id: 94, name: 'UPS 5+5', brand: 'Pel', specs: ['5+5 Lights/Fans'], price: '15000', condition: 'new', category: ['ups'], desc: 'Heavy duty UPS for 5 lights + 5 fans.', images: ['assets/images/products/ups.jpg'] },

  // 17. Sockets & Buttons (4)
  { id: 95, name: '1 Gang Socket', brand: 'Philips', specs: ['10A', '16A'], price: '200', condition: 'new', category: ['sockets'], desc: 'Single socket for appliances.', images: ['assets/images/products/socket.jpg'] },
  { id: 96, name: '2 Gang Socket', brand: 'Philips', specs: ['10A', '16A'], price: '350', condition: 'new', category: ['sockets'], desc: 'Double socket for multiple appliances.', images: ['assets/images/products/socket.jpg'] },
  { id: 97, name: 'Push Button Momentary', brand: 'Schneider', specs: ['Momentary'], price: '250', condition: 'new', category: ['buttons'], desc: 'Momentary push button for control circuits.', images: ['assets/images/products/push-button.jpg'] },
  { id: 98, name: 'Push Button Latching', brand: 'Philips', specs: ['Latching'], price: '230', condition: 'new', category: ['buttons'], desc: 'Latching push button for on/off control.', images: ['assets/images/products/push-button.jpg'] },

  // 18. Connectors & Sleeves (6)
  { id: 99, name: 'Connector Block 2 Way', brand: 'Schneider', specs: ['2 Way', '4 Way'], price: '100', condition: 'new', category: ['connectors'], desc: 'Terminal block for connecting wires.', images: ['assets/images/products/connector.jpg'] },
  { id: 100, name: 'Connector Block 6 Way', brand: 'Schneider', specs: ['6 Way', '8 Way'], price: '150', condition: 'new', category: ['connectors'], desc: 'Multi way terminal block for distribution.', images: ['assets/images/products/connector.jpg'] },
  { id: 101, name: 'Connector Block', brand: 'Philips', specs: ['2 Way', '4 Way', '6 Way'], price: '120', condition: 'new', category: ['connectors'], desc: 'Premium terminal blocks with screw terminals.', images: ['assets/images/products/connector.jpg'] },
  { id: 102, name: 'Heat Proof Sleeve', brand: 'GFC', specs: ['1mm', '2mm', '3mm', '4mm'], price: '100', condition: 'new', category: ['sleeves'], desc: 'Heat resistant sleeve for wire insulation.', images: ['assets/images/products/sleeve.jpg'] },
  { id: 103, name: 'Heat Proof Sleeve', brand: 'Philips', specs: ['1mm', '2mm', '3mm', '4mm'], price: '120', condition: 'new', category: ['sleeves'], desc: 'Premium heat proof sleeve for high temp areas.', images: ['assets/images/products/sleeve.jpg'] },
  { id: 104, name: 'PVC Conduit Pipe', brand: 'GFC', specs: ['20mm', '25mm', '32mm', '40mm'], price: '300', condition: 'new', category: ['conduit'], desc: 'PVC conduit for cable protection.', images: ['assets/images/products/conduit.jpg'] },

  // 19. Relays (4)
  { id: 105, name: 'Relay 8 Pin', brand: 'Schneider', specs: ['8 Pin'], price: '500', condition: 'new', category: ['relays'], desc: '8 pin relay for control panels.', images: ['assets/images/products/relay.jpg'] },
  { id: 106, name: 'Relay 14 Pin', brand: 'Schneider', specs: ['14 Pin'], price: '600', condition: 'new', category: ['relays'], desc: '14 pin relay with multiple contacts.', images: ['assets/images/products/relay.jpg'] },
  { id: 107, name: 'Relay 8 Pin', brand: 'Philips', specs: ['8 Pin'], price: '480', condition: 'new', category: ['relays'], desc: 'Premium 8 pin relay for industrial use.', images: ['assets/images/products/relay.jpg'] },
  { id: 108, name: 'Relay 8 Pin', brand: 'GFC', specs: ['8 Pin'], price: '450', condition: 'new', category: ['relays'], desc: 'Economical 8 pin relay for home panels.', images: ['assets/images/products/relay.jpg'] },

  // 20. Capacitors (4)
  { id: 109, name: 'Capacitor 2.5µF', brand: 'Philips', specs: ['2.5µF', '3µF', '4µF', '5µF'], price: '300', condition: 'new', category: ['capacitors'], desc: 'Motor run capacitor for fans and pumps.', images: ['assets/images/products/capacitor.jpg'] },
  { id: 110, name: 'Capacitor 3µF', brand: 'Schneider', specs: ['2.5µF', '3µF', '4µF', '5µF'], price: '350', condition: 'new', category: ['capacitors'], desc: 'Heavy duty capacitor for industrial motors.', images: ['assets/images/products/capacitor.jpg'] },
  { id: 111, name: 'Capacitor 4µF', brand: 'GFC', specs: ['2.5µF', '3µF', '4µF', '5µF'], price: '280', condition: 'new', category: ['capacitors'], desc: 'Value capacitor for ceiling fans.', images: ['assets/images/products/capacitor.jpg'] },
  { id: 112, name: 'Capacitor 5µF', brand: 'Pel', specs: ['2.5µF', '3µF', '4µF', '5µF'], price: '320', condition: 'new', category: ['capacitors'], desc: 'High value capacitor for compressors.', images: ['assets/images/products/capacitor.jpg'] },

  // 21. WiFi Switches (3)
  { id: 113, name: 'WiFi Smart Switch 1 Gang', brand: 'Schneider', specs: ['1 Gang'], price: '2500', condition: 'new', category: ['wifi'], desc: 'Smart switch with remote app control.', images: ['assets/images/products/wifi-switch.jpg'] },
  { id: 114, name: 'WiFi Smart Switch 2 Gang', brand: 'Philips', specs: ['2 Gang'], price: '2300', condition: 'new', category: ['wifi'], desc: '2 gang smart switch with voice control.', images: ['assets/images/products/wifi-switch.jpg'] },
  { id: 115, name: 'WiFi Smart Switch', brand: 'GFC', specs: ['1 Gang', '2 Gang'], price: '2200', condition: 'new', category: ['wifi'], desc: 'Budget friendly smart switch for home automation.', images: ['assets/images/products/wifi-switch.jpg'] },

  // 22. Soldering Wire (3)
  { id: 116, name: 'Soldering Wire 50g', brand: 'Marshal', specs: ['50g', '100g'], price: '300', condition: 'new', category: ['tools'], desc: 'Quality solder wire for electronics.', images: ['assets/images/products/solder-wire.jpg'] },
  { id: 117, name: 'Soldering Wire 100g', brand: 'Marshal', specs: ['100g', '200g'], price: '500', condition: 'new', category: ['tools'], desc: 'Heavy duty solder wire for larger joints.', images: ['assets/images/products/solder-wire.jpg'] },
  { id: 118, name: 'Flux Paste 50g', brand: 'Marshal', specs: ['50g'], price: '200', condition: 'new', category: ['tools'], desc: 'Rosin flux paste for clean soldering.', images: ['assets/images/products/flux.jpg'] },

  // 23. Thermostats & Temp Controllers (4)
  { id: 119, name: 'Thermostat 0-100°C', brand: 'Schneider', specs: ['0-100°C'], price: '2500', condition: 'new', category: ['thermostats'], desc: 'Temperature control thermostat for ovens.', images: ['assets/images/products/thermostat.jpg'] },
  { id: 120, name: 'Thermostat 0-300°C', brand: 'Philips', specs: ['0-300°C'], price: '2300', condition: 'new', category: ['thermostats'], desc: 'High temperature thermostat for industrial use.', images: ['assets/images/products/thermostat.jpg'] },
  { id: 121, name: 'Temperature Controller Digital', brand: 'Schneider', specs: ['Digital'], price: '3500', condition: 'new', category: ['thermostats'], desc: 'Digital temperature controller with PID.', images: ['assets/images/products/temp-controller.jpg'] },
  { id: 122, name: 'Temperature Controller Analog', brand: 'Philips', specs: ['Analog'], price: '3200', condition: 'new', category: ['thermostats'], desc: 'Analog temperature controller with simple dial.', images: ['assets/images/products/temp-controller.jpg'] },

  // 24. Extension Boards (4)
  { id: 123, name: 'Extension Board 3 Socket', brand: 'Philips', specs: ['3 Socket', '3+3 Switches'], price: '800', condition: 'new', category: ['extension'], desc: '3 socket extension board for home use.', images: ['assets/images/products/extension.jpg'] },
  { id: 124, name: 'Extension Board 6 Socket', brand: 'Philips', specs: ['6 Socket', '6+6 Switches'], price: '1200', condition: 'new', category: ['extension'], desc: '6 socket extension board for offices.', images: ['assets/images/products/extension.jpg'] },
  { id: 125, name: 'Extension Board 3 Socket', brand: 'Schneider', specs: ['3 Socket', '6 Socket'], price: '900', condition: 'new', category: ['extension'], desc: 'Premium extension board with surge protection.', images: ['assets/images/products/extension.jpg'] },
  { id: 126, name: 'Extension Board', brand: 'GFC', specs: ['3 Socket', '6 Socket'], price: '750', condition: 'new', category: ['extension'], desc: 'Value extension board for general use.', images: ['assets/images/products/extension.jpg'] },

  // 25. Industrial Male/Female (4)
  { id: 127, name: 'Industrial Male Connector', brand: 'Schneider', specs: ['16A 3 Pin', '32A 3 Pin', '16A 5 Pin', '32A 5 Pin'], price: '500', condition: 'new', category: ['industrial'], desc: 'Industrial male connector for heavy equipment.', images: ['assets/images/products/industrial.jpg'] },
  { id: 128, name: 'Industrial Female Connector', brand: 'Schneider', specs: ['16A 3 Pin', '32A 3 Pin', '16A 5 Pin', '32A 5 Pin'], price: '550', condition: 'new', category: ['industrial'], desc: 'Industrial female socket for heavy equipment.', images: ['assets/images/products/industrial.jpg'] },
  { id: 129, name: 'Industrial Male Connector', brand: 'Philips', specs: ['16A 3 Pin', '32A 3 Pin', '16A 5 Pin', '32A 5 Pin'], price: '480', condition: 'new', category: ['industrial'], desc: 'Premium industrial plug for factories.', images: ['assets/images/products/industrial.jpg'] },
  { id: 130, name: 'Industrial Female Connector', brand: 'Philips', specs: ['16A 3 Pin', '32A 3 Pin', '16A 5 Pin', '32A 5 Pin'], price: '520', condition: 'new', category: ['industrial'], desc: 'Premium industrial socket for factories.', images: ['assets/images/products/industrial.jpg'] }
];

  // ─── SPEC ICONS MAP (unchanged) ────────────────────
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
    '9A': 'fa-bolt', '16A': 'fa-bolt', '25A': 'fa-bolt', '40A': 'fa-bolt',
    '8 Pin': 'fa-cube', '14 Pin': 'fa-cube', '24V DC': 'fa-bolt', '220V AC': 'fa-bolt',
    '220V': 'fa-bolt', '24V': 'fa-bolt'
  };

  // ─── RENDER PRODUCTS (unchanged) ────────────────────
  function renderProducts(list, containerId = 'productGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:var(--s-4xl);">
          <i class="fas fa-search" style="font-size:2.5rem;color:var(--t-400);display:block;margin-bottom:var(--s-md);"></i>
          <p style="color:var(--t-400);font-size:1rem;">No products found. Try a different filter.</p>
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

      return `
        <div class="product-card reveal reveal-delay-${delay + 1}" data-condition="${p.condition}" data-category="${(p.category||[]).join(',')}" data-id="${p.id}">
          <div class="product-image">
            ${p.images && p.images.length > 0
              ? `<img src="${p.images[0]}" alt="${p.brand} ${p.name}" style="width:100%;height:100%;object-fit:contain;padding:16px;" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
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

  // ─── QUICK VIEW MODAL (unchanged) ──────────────────
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

  // ─── FILTERING, SCROLL REVEAL, NAV, THEME, ETC. (unchanged) ──
  // ... (keep all the existing code for filtering, scroll reveal, navbar, back-to-top, theme, featured products, detail page)
  // The only changes are the product array and removal of particle code.
  // The rest of the script remains identical to the previous version.
  // I'll include the full remaining code below for completeness.

  // ─── PRODUCT FILTERING ────────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const productGrid = document.getElementById('productGrid');

  if (filterBtns.length && productGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter') || 'all';

    function applyFilter(filter) {
      const filtered = filter === 'all'
        ? products
        : products.filter(p =>
            p.condition === filter ||
            (p.category && p.category.includes(filter)) ||
            p.brand.toLowerCase() === filter.toLowerCase()
          );
      renderProducts(filtered);
    }

    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === urlFilter);
    });
    applyFilter(urlFilter);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });
  }

  // ─── SEARCH ──────────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const q = searchInput.value.toLowerCase().trim();
        const filtered = q
          ? products.filter(p =>
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.specs.some(s => s.toLowerCase().includes(q))
            )
          : products;
        renderProducts(filtered);
        filterBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');
      }, 280);
    });
  }

  // ─── SCROLL REVEAL ───────────────────────────────────
  function revealOnScroll() {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('revealed');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // ─── NAVBAR ──────────────────────────────────────────
  const navbar    = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

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

  // ─── SCROLL PROGRESS ─────────────────────────────────
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
    }, { passive: true });
  }

  // ─── BACK TO TOP ─────────────────────────────────────
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ─── THEME TOGGLE ────────────────────────────────────
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('ht-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next    = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ht-theme', next);
    });
  }

  // ─── SMOOTH SCROLL ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ─── ACTIVE NAV ──────────────────────────────────────
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop()?.split('?')[0];
    if (href && href === path) a.classList.add('active');
  });

  // ─── HOME PAGE FEATURED PRODUCTS ─────────────────────
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = products.filter(p => p.condition === 'new').slice(0, 4);
    renderProducts(featured, 'featuredGrid');
  }

  // ─── PRODUCT DETAIL PAGE ────────────────────────────
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

      // Gallery thumb click
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

  console.log('%cAgwan Traders · Loaded (products updated, particle removed)', 'color:#FF6B4A;font-weight:bold;font-size:14px');
});
