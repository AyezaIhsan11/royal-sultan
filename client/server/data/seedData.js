const INITIAL_PRODUCTS = [
  {
    code: 'RS-1121-KNT',
    title: '1121 Kainat Basmati',
    subtitle: 'Signature Extra Long Grain',
    grainLength: '8.35 mm+',
    cookedLength: '19.5 mm+',
    elongation: '2.4x Elongation',
    aroma: 'Khushbu Jo Royal Ho',
    image: '/assets/images/varieties/variety_1121_kainat.jpg',
    description: 'The crowning jewel of Royal Sultan. Handpicked from fertile Punjab river basins, aged naturally for non-sticky elongation, breathtaking aroma, and regal banquet biryanis.',
    processingOptions: [
      { id: 'steam', name: 'Extra Long Steam Basmati', tag: 'Aromatic & Light' },
      { id: 'raw', name: 'Double Polished Aged Raw', tag: 'Traditional Fluffy' },
      { id: 'sella', name: 'Parboiled Golden Sella', tag: 'Firm & Non-Breaking' }
    ],
    tiers: [
      { weight: 1, label: '1 KG', type: 'Royal Black Pouch (Gold Trim)', price: 950, isB2C: true },
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 4300, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 8400, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 20500, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 32000, isB2C: false }
    ]
  },
  {
    code: 'RS-SUP-KRNL',
    title: 'Super Kernel Basmati',
    subtitle: 'Traditional Aromatic Vintage',
    grainLength: '7.45 mm+',
    cookedLength: '16.5 mm+',
    elongation: '2.2x Elongation',
    aroma: 'Classic Rich Fragrance',
    image: '/assets/images/varieties/variety_super_kernel.jpg',
    description: 'Harvested from historical Chenab river fed valleys, cherished across generations for its naturally sweet taste, delicate texture, and comforting aroma.',
    processingOptions: [
      { id: 'raw', name: 'Double Polished Aged Raw', tag: 'Heritage Choice' },
      { id: 'steam', name: 'Steam Basmati', tag: 'Quick Cooking' }
    ],
    tiers: [
      { weight: 1, label: '1 KG', type: 'Royal Black Pouch (Gold Trim)', price: 750, isB2C: true },
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 3500, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 6800, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 16500, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 26000, isB2C: false }
    ]
  },
  {
    code: 'RS-SLA-PARB',
    title: '1121 Steam Sella',
    subtitle: 'Golden Grain Parboiled',
    grainLength: '8.30 mm+',
    cookedLength: '18.8 mm+',
    elongation: '2.3x Elongation',
    aroma: 'Nutty Golden Aroma',
    image: '/assets/images/varieties/variety_steam_sella.jpg',
    description: 'Parboiled under steam pressure to seal in natural nutrients and vitamins. Withstands vigorous catering stirring without breaking a single grain.',
    processingOptions: [
      { id: 'sella', name: 'Golden Parboiled Sella', tag: 'Chef Choice' },
      { id: 'white-sella', name: 'Creamy White Sella', tag: 'Banquet Grade' }
    ],
    tiers: [
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 3950, isB2C: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 7700, isB2C: true, popular: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 18800, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 29500, isB2C: false }
    ]
  },
  {
    code: 'RS-WHT-FINE',
    title: 'Super Fine White Basmati',
    subtitle: 'Daily Kitchen Essential',
    grainLength: '6.80 mm+',
    cookedLength: '14.2 mm+',
    elongation: '2.0x Elongation',
    aroma: 'Mild Fresh Aroma',
    image: '/assets/images/varieties/variety_super_fine.jpg',
    description: 'Silky, double-sorted daily cooking basmati. Ideal for wholesome daal chawal, Chinese fried rice, and comforting everyday meals.',
    processingOptions: [
      { id: 'double-polish', name: 'Silky Double Polished', tag: 'Clean & Pure' }
    ],
    tiers: [
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 2100, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 4000, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 9800, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 15500, isB2C: false }
    ]
  }
];

module.exports = { INITIAL_PRODUCTS };
