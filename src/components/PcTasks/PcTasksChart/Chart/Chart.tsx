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
        plugins: {
          subtitle: {
            display: true,
            text: 'Last 14 days chart',
          },
          legend: {
            display: true,
            maxHeight: 500,
            title: {
              text: 'dasdas',
            },
          },
        },
      }}
    />
  );
};

export default Chart;
