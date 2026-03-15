const getMockSignals = () => {
  const signals = [
    'Satellite detected oil spill near coast',
    'Environmental sensors report pollution increase',
    'News: Major earthquake in California',
    'Social media reports of flooding in Texas',
    'Weather station reports hurricane approaching',
    'Stock market crash indicators detected',
    'Cyber attack on critical infrastructure reported',
    'Disease outbreak in urban area',
    'Wildfire spreading rapidly in forest',
    'Power grid failure in multiple states',
  ];

  // Return random 3 signals for demo
  const shuffled = signals.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

module.exports = {
  getMockSignals,
};