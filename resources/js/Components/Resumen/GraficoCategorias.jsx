import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useRef, useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip);

const coloresBase = [
    "#6366F1",
    "#4F46E5",
    "#818CF8",
    "#A5B4FC",
    "#C7D2FE",
    "#E0E7FF",
];

export default function GraficoCategorias({ data }) {
    const chartRef = useRef(null);
    const [gradientes, setGradientes] = useState([]);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = chartRef.current;
        const ctx = chart.ctx;

        const nuevos = coloresBase.map((color) => {
            const grad = ctx.createLinearGradient(0, 0, 200, 200);
            grad.addColorStop(0, color + "E6");
            grad.addColorStop(1, color + "66");
            return grad;
        });

        setGradientes(nuevos);
    }, [chartRef.current]);

    if (!data || data.length === 0) {
        return <p className="text-gray-500">No hay datos este mes.</p>;
    }

    const chartData = {
        labels: data.map((g) => g.categoria),
        datasets: [
            {
                data: data.map((g) => g.total),
                backgroundColor: gradientes.length ? gradientes : coloresBase,
                borderWidth: 2,
                borderColor: "#ffffff",
            },
        ],
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-around w-full">
            <div className="w-60 h-60 relative">
                <Pie ref={chartRef} data={chartData} />
            </div>

            <div className="flex flex-col gap-3">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full shadow"
                            style={{
                                backgroundColor:
                                    coloresBase[idx % coloresBase.length],
                            }}
                        ></span>

                        <span className="text-gray-700 font-medium">
                            {item.categoria}:
                            <span className="text-gray-900 font-semibold">
                                {" "}
                                {item.total} €
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
