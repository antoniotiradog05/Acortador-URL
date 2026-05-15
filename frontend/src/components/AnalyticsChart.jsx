import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line as LineChart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function AnalyticsChart({ clicks }) {
  const chartData = useMemo(() => {
    if (!clicks || clicks.length === 0) return null;

    // Group clicks by date
    const clicksByDate = clicks.reduce((acc, click) => {
      const date = new Date(click.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Sort dates
    const sortedDates = Object.keys(clicksByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      labels: sortedDates,
      datasets: [
        {
          fill: true,
          label: 'Clics',
          data: sortedDates.map(date => clicksByDate[date]),
          borderColor: 'rgb(147, 51, 234)', // purple-600
          backgroundColor: 'rgba(147, 51, 234, 0.2)',
          tension: 0.4,
        },
      ],
    };
  }, [clicks]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  if (!chartData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">No hay suficientes datos para mostrar el gráfico</p>
      </div>
    );
  }

  return <LineChart options={options} data={chartData} />;
}
