import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div>
      <CircularProgressbar
        styles={{
          // Customize the root svg element
          root: {},
          path: {
            // Path color
            stroke: '#56a691',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: 'white',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Rotate the trail
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the text
          text: {
            // Text color
            fill: 'white',
            // Text size
            fontSize: '16px',
            font: 'Comfortaa',
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: '#3e98c7',
          },
        }}
        value={percentage}
        text={`${percentage}%`}
      />
    </div>
  );
};

export default ProgressBar;
