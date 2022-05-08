export function preprocessDataForRadarChart(data, indexBy) {
    var multiplier;

    data.forEach(characteristic => {
        // for normalization
        multiplier = parseInt("1" + "0".repeat(parseInt(characteristic['value']).toString().length - 1));
        characteristic['radarChart-multiplier'] = multiplier;
        characteristic['Target'] = (characteristic['target'] / multiplier).toFixed(3);  // radarChart-target
        characteristic['Value'] = (characteristic['value'] / multiplier).toFixed(3);    // radarChart-value
        
        if (characteristic['unit'] != "")
            characteristic['radarChart-name'] = characteristic[indexBy] + " (" + characteristic['unit'] + ") (x" + multiplier + ")";
        else
            characteristic['radarChart-name'] = characteristic[indexBy] + " (x" + multiplier + ")";
    });



    return data;
}