document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('productivityChart').getContext('2d');
  let productivityChart;
  
  // Initialize chart
  function initChart(data) {
    productivityChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Productive', 'Unproductive', 'Neutral'],
        datasets: [{
          data: [data.productive, data.unproductive, data.neutral],
          backgroundColor: ['#4CAF50', '#F44336', '#9E9E9E'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  // Update UI with storage data
  chrome.storage.sync.get(['timeData'], (data) => {
    const today = new Date().toISOString().split('T')[0];
    const todayData = data.timeData?.[today] || { productive: 0, unproductive: 0, neutral: 0 };
    
    document.getElementById('today-productive').textContent = 
      formatTime(todayData.productive);
    document.getElementById('today-unproductive').textContent = 
      formatTime(todayData.unproductive);
    
    initChart(todayData);
  });
  
  // Format milliseconds to HH:MM:SS
  function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
  }
  
  // Settings button
  document.getElementById('settings-btn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});
