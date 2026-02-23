import { Chart as ChartJS } from 'chart.js/auto';
import type { CategoricalSeries } from '../../domain/series/CategoricalSeries';

export class BarPlot {
    private chart?: ChartJS

    constructor(
        private canvas: HTMLCanvasElement,
    ) { }
    plot(
        series: CategoricalSeries[],
        seriesLabels: string[],
    ) {
        const ctx = this.canvas.getContext('2d')
        if (!ctx) return
        if (seriesLabels.length !== series.length) throw new Error("Series amount and series labels must be equal");

        const labels = series[0]?.labels
        if (!labels) throw new Error("Data must contain labels");

        const plotData = {
            labels,
            datasets: series.map(
                (s, i) => ({
                    label: seriesLabels[i],
                    data: s.values
                })
            )
        }
        if (this.chart) this.chart.destroy()
        this.chart = new ChartJS(
            ctx,
            {
                type: 'bar',
                data: plotData
            }
        )
    }
}