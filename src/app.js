// App.js - Main React Component
import React, { useState, useEffect } from 'react';
import './app.css';

// Brand database with logo paths and warranty info
const BRANDS_DATABASE = {
  patagonia: {
    name: "Patagonia",
    logoPath: "/logos/patagonia.png",
    logoFallback: "🏔️",
    warrantyUrl: "https://www.patagonia.com/start-repair/",
    warrantyType: "Ironclad Guarantee",
    hasRepairs: true,
    description: "Free repairs, lifetime warranty on manufacturing defects",
    keywords: ["patagonia", "ironclad", "worn wear"],
    domain: "patagonia.com"
  },
  arcteryx: {
    name: "Arc'teryx",
    logoPath: "/logos/arcteryx.png", 
    logoFallback: "🦅",
    warrantyUrl: "https://arcteryx.com/us/en/help/product-service",
    warrantyType: "Limited Warranty + ReBird",
    hasRepairs: true,
    description: "Lifetime warranty, free repairs, ReBird upcycling program",
    keywords: ["arcteryx", "arc'teryx", "rebird", "dead bird"],
    domain: "arcteryx.com"
  },
  thenorthface: {
    name: "The North Face",
    logoPath: "/logos/northface.png",
    logoFallback: "🏔️", 
    warrantyUrl: "https://www.thenorthface.com/en-us/help/warranty",
    warrantyType: "Limited Lifetime Warranty",
    hasRepairs: true,
    description: "Lifetime warranty against manufacturing defects",
    keywords: ["north face", "tnf", "renewed"],
    domain: "thenorthface.com"
  },
  osprey: {
    name: "Osprey",
    logoPath: "/logos/osprey.png",
    logoFallback: "🎒",
    warrantyUrl: "https://www.osprey.com/us/en/customer-support/all-mighty-guarantee", 
    warrantyType: "All Mighty Guarantee",
    hasRepairs: true,
    description: "Any reason, any product, any era - ultimate warranty",
    keywords: ["osprey", "all mighty", "backpack"],
    domain: "osprey.com"
  },
  outdoorresearch: {
    name: "Outdoor Research",
    logoPath: "/logos/outdoor-research.png",
    logoFallback: "⚡",
    warrantyUrl: "https://www.outdoorresearch.com/pages/warranty",
    warrantyType: "Infinite Guarantee", 
    hasRepairs: true,
    description: "Lifetime warranty, infinite guarantee program",
    keywords: ["outdoor research", "or", "infinite guarantee"],
    domain: "outdoorresearch.com"
  },
  blackdiamond: {
    name: "Black Diamond",
    logoPath: "/logos/black-diamond.png",
    logoFallback: "🧗",
    warrantyUrl: "https://www.blackdiamondequipment.com/en_US/content/warranty-repairs/",
    warrantyType: "Limited Warranty",
    hasRepairs: true,
    description: "Lifetime warranty on soft goods, climbing gear repairs",
    keywords: ["black diamond", "bd", "climbing"],
    domain: "blackdiamondequipment.com"
  },
  marmot: {
    name: "Marmot", 
    logoPath: "/logos/marmot.png",
    logoFallback: "🏔️",
    warrantyUrl: "https://www.marmot.com/warranty-repair.html",
    warrantyType: "Limited Lifetime Warranty",
    hasRepairs: true,
    description: "Lifetime warranty against manufacturing defects",
    keywords: ["marmot", "groundhog"],
    domain: "marmot.com"
  },
  fjallraven: {
    name: "Fjällräven",
    logoPath: "/logos/fjallraven.png", 
    logoFallback: "🦊",
    warrantyUrl: "https://www.fjallraven.com/us/en-us/customer-service/warranty/",
    warrantyType: "Limited Lifetime Warranty",
    hasRepairs: true,
    description: "Lifetime warranty, repair services available",
    keywords: ["fjallraven", "fjällräven", "kanken", "fox"],
    domain: "fjallraven.com"
  },
  rei: {
    name: "REI Co-op",
    logoPath: "/logos/rei.png",
    logoFallback: "🏕️",
    warrantyUrl: "https://www.rei.com/help/returns",
    warrantyType: "Member Satisfaction",
    hasRepairs: true,
    description: "1-year satisfaction guarantee, lifetime warranty on defects",
    keywords: ["rei", "coop", "co-op"],
    domain: "rei.com"
  },
  llbean: {
    name: "L.L.Bean",
    logoPath: "/logos/llbean.png",
    logoFallback: "🥾",
    warrantyUrl: "https://www.llbean.com/llb/shop/513705",
    warrantyType: "100% Satisfaction Guarantee", 
    hasRepairs: true,
    description: "1-year return policy, lifetime warranty on manufacturing defects",
    keywords: ["ll bean", "l.l. bean", "bean boots"],
    domain: "llbean.com"
  },
  camelbak: {
    name: "CamelBak",
    logoPath: "/logos/camelbak.png",
    logoFallback: "💧",
    warrantyUrl: "https://www.camelbak.com/en/support/warranty-info",
    warrantyType: "Got Your Bak Warranty",
    hasRepairs: true,
    description: "Lifetime warranty on hydration products",
    keywords: ["camelbak", "hydration", "water"],
    domain: "camelbak.com"
  },
  jansport: {
    name: "JanSport",
    logoPath: "/logos/jansport.png",
    logoFallback: "🎒",
    warrantyUrl: "https://www.jansport.com/customer-service/warranty.html",
    warrantyType: "Lifetime Warranty",
    hasRepairs: true,
    description: "Lifetime warranty, free repairs on backpacks",
    keywords: ["jansport", "backpack", "school"],
    domain: "jansport.com"
  },
  mountainhardwear: {
    name: "Mountain Hardwear", 
    logoPath: "/logos/mountain-hardwear.png",
    logoFallback: "🏔️",
    warrantyUrl: "https://www.mountainhardwear.com/customer-service/warranty/",
    warrantyType: "Limited Warranty",
    hasRepairs: true,
    description: "Warranty against manufacturing defects",
    keywords: ["mountain hardwear", "hardwear"],
    domain: "mountainhardwear.com"
  },
  columbia: {
    name: "Columbia",
    logoPath: "/logos/columbia.png", 
    logoFallback: "🌲",
    warrantyUrl: "https://www.columbia.com/customer-service/warranty.html",
    warrantyType: "Limited Warranty",
    hasRepairs: true,
    description: "Warranty against manufacturing defects, some repair services",
    keywords: ["columbia", "sportswear"],
    domain: "columbia.com"
  },
  rab: {
    name: "Rab",
    logoPath: "/logos/rab.png",
    logoFallback: "🏔️", 
    warrantyUrl: "https://rab.equipment/us/customer-care/warranty",
    warrantyType: "Limited Warranty",
    hasRepairs: true,
    description: "Warranty against manufacturing defects",
    keywords: ["rab", "equipment"],
    domain: "rab.equipment"
  },
  chaco: {
    name: "Chaco",
    logoPath: "/logos/chaco.png",
    logoFallback: "🩴",
    warrantyUrl: "https://www.chacos.com/US/en/warranty/",
    warrantyType: "Lifetime Warranty",
    hasRepairs: true,
    description: "Lifetime warranty against defects, resoling services",
    keywords: ["chaco", "sandals", "resole"],
    domain: "chacos.com"
  },
  darntough: {
    name: "Darn Tough Socks",
    logoPath: "/logos/darn-tough.png",
    logoFallback: "🧦",
    warrantyUrl: "https://darntough.com/pages/our-guarantee",
    warrantyType: "Unconditional Lifetime Guarantee",
    hasRepairs: true,
    description: "Unconditional lifetime guarantee on all socks",
    keywords: ["darn tough", "socks", "vermont"],
    domain: "darntough.com"
  },
  filson: {
    name: "Filson",
    logoPath: "/logos/filson.png",
    logoFallback: "🧥",
    warrantyUrl: "https://www.filson.com/customer-service/#warranty",
    warrantyType: "Limited Lifetime Warranty",
    hasRepairs: true,
    description: "Lifetime warranty, repair services available",
    keywords: ["filson", "heritage", "rugged"],
    domain: "filson.com"
  },
  cotopaxi: {
    name: "Cotopaxi",
    logoPath: "/logos/cotopaxi.png",
    logoFallback: "🌋",
    warrantyUrl: "https://www.cotopaxi.com/pages/gear-for-good-guarantee",
    warrantyType: "61-Year Guarantee",
    hasRepairs: true,
    description: "61-year warranty, repair services",
    keywords: ["cotopaxi", "llama", "gear for good"],
    domain: "cotopaxi.com"
  }
};

// Logo component with fallback handling
const BrandLogo = ({ brand, size = 80 }) => {
  const [logoError, setLogoError] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleImageError = () => {
    setLogoError(true);
  };

  const handleImageLoad = () => {
    setLogoLoaded(true);
  };

  // Try Clearbit API as fallback
  const clearbitUrl = `https://logo.clearbit.com/${brand.domain}?size=${size}`;

  if (logoError) {
    return (
      <div className="logo-fallback" style={{ 
        width: size, 
        height: size,
        fontSize: `${size/3}px`
      }}>
        {brand.logoFallback}
      </div>
    );
  }

  return (
    <div className="logo-container" style={{ width: size, height: size }}>
      <img
        src={logoLoaded ? brand.logoPath : clearbitUrl}
        alt={`${brand.name} logo`}
        className="brand-logo"
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// Individual brand card component
const BrandCard = ({ brandKey, brand, onClick }) => {
  const handleClick = () => {
    // Track click
    trackClick(brandKey, brand.name);
    
    // Open warranty URL
    window.open(brand.warrantyUrl, '_blank');
    
    // Optional: Show success message
    if (onClick) onClick(brand.name);
  };

  return (
    <div className="brand-card" onClick={handleClick}>
      <BrandLogo brand={brand} size={80} />
      <h3 className="brand-name">{brand.name}</h3>
      <p className="warranty-type">{brand.warrantyType}</p>
    </div>
  );
};

// Search component
const SearchBar = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="🔍 Search for a brand (e.g., Patagonia, North Face, Arc'teryx...)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={onClear} className="clear-button">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// Click tracking function
const trackClick = async (brandKey, brandName) => {
  try {
    const clickData = {
      brandKey,
      brandName,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    // Store in localStorage for now (in production, send to your API)
    const existingClicks = JSON.parse(localStorage.getItem('brandClicks') || '[]');
    existingClicks.push(clickData);
    localStorage.setItem('brandClicks', JSON.stringify(existingClicks));

    // In production, also send to your API:
    // await fetch('/api/track-click', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(clickData)
    // });

    console.log('Click tracked:', clickData);
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};

// Generate session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Main App component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(BRANDS_DATABASE);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter brands based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredBrands(BRANDS_DATABASE);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = {};

    Object.entries(BRANDS_DATABASE).forEach(([key, brand]) => {
      const nameMatch = brand.name.toLowerCase().includes(searchLower);
      const keywordMatch = brand.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchLower)
      );

      if (nameMatch || keywordMatch) {
        filtered[key] = brand;
      }
    });

    setFilteredBrands(filtered);
  }, [searchTerm]);

  const handleBrandClick = (brandName) => {
    setSuccessMessage(`Opening ${brandName} warranty page...`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const brandCount = Object.keys(filteredBrands).length;
  const totalBrands = Object.keys(BRANDS_DATABASE).length;
  const repairBrands = Object.values(BRANDS_DATABASE).filter(brand => brand.hasRepairs).length;

  return (
    <div className="app">
      {/* Header */}
      <header className="main-header">
        <h1>🔧 Salvage Studio</h1>
        <p className="subtitle">Outdoor Gear Warranty Directory</p>
        <p className="description">Find warranty and repair programs for your outdoor gear</p>
      </header>

      {/* Search */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={handleClearSearch}
      />

      {/* Success message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Search results info */}
      {searchTerm && (
        <div className="search-results-info">
          Found <strong>{brandCount}</strong> brands matching "{searchTerm}"
        </div>
      )}

      {/* Brand grid */}
      <div className="brand-grid">
        {Object.entries(filteredBrands).map(([key, brand]) => (
          <BrandCard
            key={key}
            brandKey={key}
            brand={brand}
            onClick={handleBrandClick}
          />
        ))}
      </div>

      {/* No results */}
      {brandCount === 0 && searchTerm && (
        <div className="no-results">
          <p>No brands found matching "{searchTerm}"</p>
          <p>Try searching for specific brand names or keywords.</p>
        </div>
      )}

      {/* Stats */}
      <div className="stats-container">
        <h3>📈 Directory Statistics</h3>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-number">{totalBrands}</span>
            <span className="stat-label">Total Brands</span>
          </div>
          <div className="stat">
            <span className="stat-number">{repairBrands}</span>
            <span className="stat-label">Offer Repairs</span>
          </div>
          <div className="stat">
            <span className="stat-number">{totalBrands - repairBrands}</span>
            <span className="stat-label">Warranty Only</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Salvage Studio • Helping you find warranty and repair options for your outdoor gear</p>
        <p>
          <a href="/admin" className="footer-link">Admin Dashboard</a> | 
          <a href="mailto:support@salvagestudio.com" className="footer-link">Contact Us</a>
        </p>
      </footer>
    </div>
  );
};

export default App;