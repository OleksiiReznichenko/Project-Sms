<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Chart, registerables, Colors } from 'chart.js';

import type { ChartInfo } from '@/interfaces/chartInfo';

interface Props {
    color: string;
    chartInfo: ChartInfo;
    // chartType: 'payments' | 'users';
}

const props = defineProps<Props>();

const chartCanvas = ref<null | HTMLCanvasElement>(null);
let chart: any = null;

const prevWidth = ref<number>(0);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SET LABELS AND DATA
const setLabelsAndDate = (chartInfo: ChartInfo): void => {
    // let labels: string[] = [];
    // let chartData: number[] = [];

    // if (period === 'day') {
    //     labels = ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'];

    //     chartData = [2, 2, 5, 1, 8, 4, 2];
    // }

    // if (period === 'week') {
    //     // labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     // if (window.outerWidth < 850) {
    //         labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //     // }

    //     chartData = [11, 20, 15, 6, 18, 25, 33];
    // }

    // if (period === 'month') {
    //     labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    //     chartData = [100, 132, 200, 110];
    // }

    // if (period === 'year') {
    //     // labels = ['January', 'March', 'May', 'July', 'September', 'November'];
    //     // if (window.outerWidth < 850) {
    //         labels = ['Jan', 'Mar', 'May', 'July', 'Sep', 'Nov'];
    //     // }

    //     chartData = [510, 411, 330, 655, 458, 555];
    // }

    if (!chart) return;
    chart.data.labels = chartInfo.labels;

    const maxValue = Math.max(...chartInfo.data);
    const minValue = Math.min(...chartInfo.data);
    const stepsAmount = 6;

    chart.options.scales.y.min = minValue;
    chart.options.scales.y.max = maxValue;
    chart.options.scales.y.ticks.stepSize = Math.floor((maxValue - minValue) / stepsAmount);

    chart.data.datasets.forEach((dataset: any) => {
        dataset.data = chartInfo.data;
    });
    chart.update();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHART CONFIGURATION
const initChart = (): void => {
    if(chartCanvas.value) {
        Chart.register(Colors, ...registerables);
        chart = new Chart(chartCanvas.value, {
            type: 'line',
            data: {
                // labels: ['Jan', 'Mar', 'May', 'July', 'Sep', 'Nov'],
                labels: [],
                datasets: [
                    {
                        borderColor: props.color,
                        // data: [290, 330, 365, 365, 365, 430],
                        data: [],
                        pointBorderColor: props.color,
                        pointBackgroundColor: 'black',
                        fill: false,
                        // backgroundColor: gradientSecond,
                        pointBorderWidth: 0,
                        hoverBorderWidth: 3,
                        tension: 0,
                    },
                ],
            },
            
            
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'nearest',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 4.5,

                    }
                },
                hover: {
                    intersect: true,
                    // point
                },
                scales: {
                    y: {
                        min: 0,
                        max: 700,
                        ticks: {
                            stepSize: 100,
                            color: '#C3C3C3',
                            font: {
                                size: 14,
                                family: 'Bison'
                            },
                            padding: 10
                        },
                        border: {
                            display: false,
                            color: '#333333',
                            width: 1
                        },
                        grid: {
                            display: true,
                            color: '#333333',
                        },
                    },
                    x: {
                        border: {
                            display: false,
                            color: '#333333',
                            width: 1
                        },
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: '#C3C3C3',
                            font: {
                                size: 14,
                                family: 'Bison'
                            },
                        }
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: (tooltip) => {
                                return '+' + tooltip[0].raw;
                            },
                            label: (tooltip) => {
                                return 'New views'
                            },
                        },
                        external: (context) => {
                            const {chart, tooltip} = context;
                            // tooltip.backgroundColor = 'red'
                        },
                        caretPadding: 7,
                        yAlign: 'bottom',
                        displayColors: false,
                        padding: {
                            top: 1,
                            bottom: 3,
                            left: 21,
                            right: 21
                        },
                        backgroundColor(tooltipItem) {
                            if(tooltipItem.tooltip.dataPoints[0].datasetIndex === 0) {
                                return props.color
                            }
                            if(tooltipItem.tooltip.dataPoints[0].datasetIndex === 1) {
                                return props.color
                            }
                        },
                        // backgroundColor: '#B14DFF',
                        titleColor: 'black',
                        titleFont: {
                            family: 'Bison',
                            lineHeight: '200%',
                            size: 20,
                            weight: '500'
                        },
                        titleAlign: 'center',
                        titleMarginBottom: -5,
                        bodyFont: {
                            family: 'Bison',
                            size: 0,
                            weight: '400',
                            lineHeight: '140%'  
                        },
                        bodyAlign: 'center'
                    },
                },
            },
            plugins: [{
                id: 'CustomPlugin',
                beforeDraw: chart => {
                    let _chart = chart;
                    // if(_chart.tooltip?._active?.length) {
                    //     const ctx = _chart.ctx;
                    //     const activePoint = _chart.tooltip._active[0];

                    //     ctx.save();
                    //     ctx.setLineDash([5]);
                    //     ctx.beginPath();
                    //     ctx.moveTo(activePoint.element.x, _chart.chartArea.bottom);
                    //     ctx.lineTo(activePoint.element.x, activePoint.element.y);
                    //     ctx.lineWidth = 2;
                    //     ctx.lineDashOffset = 40
                    //     ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    //     ctx.stroke();
                    //     ctx.restore();
                    // }
                }
            }]
        });

        if (props.chartInfo) {
            setLabelsAndDate(props.chartInfo);
        }
    };
};

watch(() => props.chartInfo, (newValue) => {
    setLabelsAndDate(newValue);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION ON RESIZE
const resize = (): void => {
    if (Math.abs(prevWidth.value - window.outerWidth) > 10) {
        prevWidth.value = window.outerWidth;
        chart.resize();
    }
};

onMounted(() => {
    initChart();

    // RESIZE
    window.addEventListener('resize', resize);
})

onUnmounted(() => {
    // REMOVE EVENT LISTENER
    window.removeEventListener('resize', resize);
})
</script>

<template>
    <div class="chart-container">
        <canvas ref="chartCanvas" class="chart"></canvas>
    </div>
</template>

<style lang="scss" scoped>
.chart-container {
    width: 100%;
    height: 85%;

    .chart {
        width: 100%;
        height: 100%;
    }
}
</style>