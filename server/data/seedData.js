const INITIAL_PRODUCTS = [
  {
    code: 'RS-1121-KNT',
    title: '1121 Kainat Basmati',
    subtitle: 'Flagship Extra Long Grain',
    grainLength: '8.35 mm+',
    cookedLength: '19.5 mm+',
    elongation: '2.4x Elongation',
    aroma: 'Supreme Imperial Aroma',
    image: '/assets/images/hero-banner.jpg',
    description: 'The crowning jewel of Punjab basmati. Hand-selected extra long grains aged to perfection for non-sticky, grand banquet biryanis and royal pulaos.',
    processingOptions: [
      { id: 'steam', name: 'Extra Long Steam Rice', tag: 'Aromatic & Light' },
      { id: 'raw', name: 'Double Polished Aged Raw', tag: 'Traditional Fluffy' },
      { id: 'sella', name: 'Parboiled Sella', tag: 'Firm & Non-Breaking' }
    ],
    tiers: [
      { weight: 1, label: '1 KG', type: 'Luxury Black Handle Bag', price: 950, isB2C: true },
      { weight: 5, label: '5 KG', type: 'Resealable Zipper Bag', price: 4300, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Non-Woven Tote Bag', price: 8400, isB2C: true },
      { weight: 20, label: '20 KG', type: 'Master Poly Pack', price: 16500, isB2C: false },
      { weight: 40, label: '40 KG', type: 'Commercial Jute / Export Sack', price: 32000, isB2C: false }
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
    image: '/assets/images/punjab-heritage.jpg',
    description: 'Harvested from historical Chenab river fed valleys, cherished across generations for its naturally sweet taste, delicate texture, and comforting aroma.',
    processingOptions: [
      { id: 'raw', name: 'Double Polished Aged Raw', tag: 'Heritage Choice' },
      { id: 'steam', name: 'Steam Basmati', tag: 'Quick Cooking' }
    ],
    tiers: [
      { weight: 1, label: '1 KG', type: 'Branded Poly Bag with Window', price: 750, isB2C: true },
      { weight: 5, label: '5 KG', type: 'Branded Poly Bag with Window', price: 3500, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Non-Woven Eco Tote', price: 6800, isB2C: true },
      { weight: 20, label: '20 KG', type: 'Master Heavy Pack', price: 13200, isB2C: false }
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
    image: '/assets/images/packaging-lineup.jpg',
    description: 'Parboiled under steam pressure to seal in natural nutrients and vitamins. Withstands vigorous catering stirring without breaking a single grain.',
    processingOptions: [
      { id: 'sella', name: 'Golden Parboiled Sella', tag: 'Chef Choice' },
      { id: 'white-sella', name: 'Creamy White Sella', tag: 'Banquet Grade' }
    ],
    tiers: [
      { weight: 10, label: '10 KG', type: 'Heavy-Duty Commercial Bag', price: 7900, isB2C: true, popular: true },
      { weight: 20, label: '20 KG', type: 'Commercial Sacks', price: 15200, isB2C: false },
      { weight: 40, label: '40 KG', type: 'Export Jute Sacks', price: 29800, isB2C: false }
    ]
  },
  {
    code: 'RS-WHT-FINE',
    title: 'Super Fine White Rice',
    subtitle: 'Daily Kitchen Essential',
    grainLength: '6.80 mm+',
    cookedLength: '14.2 mm+',
    elongation: '2.0x Elongation',
    aroma: 'Mild Fresh Aroma',
    image: '/assets/images/hero-banner.jpg',
    description: 'Silky, double-sorted daily cooking rice. Ideal for wholesome daal chawal, Chinese fried rice, and comforting everyday meals.',
    processingOptions: [
      { id: 'double-polish', name: 'Silky Double Polished', tag: 'Clean & Pure' }
    ],
    tiers: [
      { weight: 5, label: '5 KG', type: 'Clear-Front Poly Bag', price: 2100, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Standard Kitchen Bag', price: 4000, isB2C: true },
      { weight: 20, label: '20 KG', type: 'Family Value Sack', price: 7800, isB2C: false }
    ]
  }
];

module.exports = { INITIAL_PRODUCTS };
