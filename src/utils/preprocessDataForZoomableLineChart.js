export function preprocessDataForZoomableLineChart(data){
    var tempZoomableLineChart = { "value": [], "xLabel": [], "target": [] };
    var tempZoomableLineChartData = [];

    data['data'].forEach(para => {

        tempZoomableLineChart = { "value": [], "xLabel": [], "target": [] };
        for (let i = 0; i < 20; i++) {      // hours
            for (let j = 0; j < 60; j += 15) {     // minutes
                
                tempZoomableLineChart["value"].push((para['target'] * (Math.random() * (1.1 - 0.9) + 0.9)).toFixed(2));

                tempZoomableLineChart["xLabel"].push(i + ":" + String(j).padStart(2, '0'));
                tempZoomableLineChart["target"].push(para['target']);
            }
        }
        tempZoomableLineChart["productName"] = para["productName"];
        tempZoomableLineChartData.push(tempZoomableLineChart);
    });

    return tempZoomableLineChartData;
}