import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficoCategorias({ data }) {
    if (!data || data.length === 0) {
        return <p className="text-gray-500">No hay datos este mes.</p>;
    }

    const chartData = {
        labels: data.map((g) => g.categoria),
        datasets: [
            {
                data: data.map((g) => g.total),
                backgroundColor: [
                    "#ef4444",
                    "#f97316",
                    "#facc15",
                    "#22c55e",
                    "#3b82f6",
                    "#8b5cf6",
                ],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="w-72 h-72 mx-auto">
            <Pie data={chartData} options={options} />
        </div>
    );
}
