import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ dailyRevenue, loading, dateRange, onDateRangeChange }) => {
  const [selected_option, set_selected_option] = useState("last_30_days");
  const [is_open, set_is_open] = useState(false);
  const select_options = [
    { value: "last_7_days", label: "Last 7 days" },
    { value: "last_30_days", label: "Last 30 days" },
  ];

  // Handle date range changes based on selected option
  useEffect(() => {
    const today = new Date();
    let startDate = new Date();

    if (selected_option === "last_7_days") {
      startDate.setDate(today.getDate() - 7);
    } else if (selected_option === "last_30_days") {
      startDate.setDate(today.getDate() - 30);
    }

    onDateRangeChange(
      startDate.toISOString().split('T')[0],
      today.toISOString().split('T')[0]
    );
  }, [selected_option]);

  if (loading) {
    return (
      <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
        <div className="h-[400px] bg-white/50 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const data = {    labels: dailyRevenue?.map((item) => {
      const date = new Date(item._id);
      return date.toLocaleDateString();
    }) || [],
    datasets: [
      {
        label: "Daily Revenue",
        data: dailyRevenue?.map((item) => item.revenue) || [],
        borderColor: "#5D17EA",
        backgroundColor: "rgba(93, 23, 234, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
      <div className="flex items-center justify-between gap-5 mb-6">
        <h5 className="text-text-body text-headline leading-headline">Revenue Overview</h5>

        <div className="relative">
          <button
            onClick={() => set_is_open(!is_open)}
            className="flex items-center justify-center gap-2.5 px-3.75 py-2 rounded-full border border-primary text-primary text-caption leading-caption"
          >
            <h6>{select_options.find((option) => option.value === selected_option)?.label}</h6>
            <svg className="w-3 h-1.75" viewBox="0 0 12 7" fill="none">
              <path d="M5.29 6.7C5.68 7.09 6.31 7.09 6.7 6.7L11.7 1.7C12.09 1.31 12.09 0.68 11.7 0.29C11.31 -0.1 10.68 -0.1 10.29 0.29L6 4.58L1.7 0.29C1.31 -0.1 0.68 -0.1 0.29 0.29C-0.1 0.68 -0.1 1.32 0.29 1.71L5.29 6.71L5.29 6.7Z" fill="currentColor"/>
            </svg>
          </button>

          <div className={`absolute top-12 right-0 w-max bg-white border border-neutral-default rounded-xl shadow-lg transition-all duration-300 ${
            is_open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}>
            <ul className="flex flex-col gap-2.5 p-3">
              {select_options.map((option) => (
                <li key={option.value}>
                  <button
                    onClick={() => {
                      set_selected_option(option.value);
                      set_is_open(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      selected_option === option.value ? "bg-primary text-white" : "text-text-body hover:bg-neutral-50"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
