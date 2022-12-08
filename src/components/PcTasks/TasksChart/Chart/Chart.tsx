import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
ChartJS.register(CategoryScale);
const Chart = ({ chartData }: { chartData: any }) => {
  return (
    <Bar
      data={chartData}
      options={{
        maintainAspectRatio: false,
        color: '#e0e0e0',
        plugins: {
          subtitle: {
            display: true,
            text: 'Last 14 days chart',
            color: '#e0e0e0',
          },
          legend: {
            labels: {},
          },
        },
        scales: {
          y: {
            ticks: {
              color: '#e0e0e0',
            },
          },
          x: {
            ticks: {
              color: '#e0e0e0',
            },
          },
        },
      }}
    />
  );
};

export default Chart;
