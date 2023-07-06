export const temperatureChart = () => ({
  chart: {
    type: 'line',
  },
  title: {
    text: 'Temperatura (°C x t)'
  },
  xAxis:{
    type:'datetime',
    title: {
      text: 'Date'
    }
  },
  time: {
    useUTC: false,
  },
  yAxis: {
    title: {
      text: 'Temperature °C'
    }
  },
  
  exporting: {
    buttons: {
      contextButton: {
        menuItems: [
          "viewFullscreen",
          "printChart",
          "separator",
          "downloadCSV",
          "downloadXLS",
        ],
      },
    },
  },
  series: []
});
