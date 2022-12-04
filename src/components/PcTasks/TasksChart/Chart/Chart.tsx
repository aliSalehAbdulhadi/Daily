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
        color: 'white',

        plugins: {
          subtitle: {
            display: true,
            text: 'Last 14 days chart',
            color: 'white',
          },
        },
      }}
    />
  );
};

export default Chart;
