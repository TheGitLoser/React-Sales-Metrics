import { useEffect, useState } from "react";
// https://apexcharts.com/react-chart-demos/line-charts/zoomable-timeseries/
import ReactApexChart from "react-apexcharts";
import apexchart from "apexcharts";

/**
 * Each zoomable line chart
 * @param {Integer} idForZoomableLineChart Id for line chart in order to update the chart
 * @param {Object} zoomableLineChartData Data for zoomable line chart
 * @param {String} height Height of zoomable line chart
 * @returns <MyZoomableLine idForZoomableLineChart={idForZoomableLineChart} zoomableLineChartData={showData[id]} height={height}/>
 */
export default function MyZoomableLine({ idForZoomableLineChart, zoomableLineChartData, height }) {
    // example value data & init style
    const series = [{
        name: "Value",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    }
    ];
    const options = {
        title: {
            text: 'Sample title',
            align: 'left'
        },
        chart: {
            id: 'fb',
            group: 'social',
            type: 'line',
            height: 160,
        },
        colors: ['#ffca6e', '#f56342'],
        yaxis: {
            labels: {
                minWidth: 30
            }
        },
        xaxis: {
            // xaxis label sample
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            // title: {
            //       text: 'Month'
            // },
        }
    }

    var tempDataToShow;
    var tempOptions;

    function renderZoomableLineChart(elem) {
        tempDataToShow = [{ name: "Value", data: elem['value'] }, { name: "Target", data: elem['target'] }];
        tempOptions = {
            title: { text: elem['productName'], align: 'left' },
            chart: {
                id: "fb",
                group: idForZoomableLineChart,  // for selectableLineChart, change for each checkbox update
                type: 'line',
            },
            colors: options["colors"],
            yaxis: options['yaxis'],
            xaxis: { categories: elem['xLabel'] }
        }
        return (
            <div>
                <ReactApexChart key={idForZoomableLineChart} options={tempOptions} series={tempDataToShow} type="line" height={height} />
            </div>
        )

    }

    return (
        <div id="wrapper">
            {renderZoomableLineChart(zoomableLineChartData)}
        </div>
    );
}