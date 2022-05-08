import { useEffect, useState } from "react";
import { Grid, Checkbox, Tooltip, List, ListItem, ListItemText } from '@mui/material';
import MyZoomableLine from "./ZoomableLineChart";
import { preprocessDataForZoomableLineChart } from "../../utils";

/**
 * Whole selectable line chart (all checkbox and line chart)
 * @param {Object} zoomableLineChartData Data for selectable line chart
 * @param {String} height Height of compoent
 * @param {String} indexBy Index of data's name
 * @example <SelectableLineChart key={storeId} zoomableLineChartData={showProduct} heading="Product" height="200px"
                                        keys={['Value', 'Target']}
                                        indexBy={"productName"} />
 */
export default ({ zoomableLineChartData, height, indexBy }) => {
    const [showData, setShowData] = useState([]);
    const [showValue, setShowValue] = useState(Array(zoomableLineChartData['data'].length).fill(true));
    const [idForZoomableLineChart, setIdForZoomableLineChart] = useState(1);
    const [loading, setLoading] = useState(true);
    // data for line chart
    let dataForLineChart = [];
    dataForLineChart = preprocessDataForZoomableLineChart(zoomableLineChartData);

    useEffect(() => {
		// default to show top {numberOfValueShow} checkbox
		const numberOfValueShow = 6;


        let tempShowValue = []
		let tempData = [];
		for (let i = 0; i < showValue.length; i++) {
			if (i < numberOfValueShow) {
				tempShowValue.push(true);
			} else {
				tempShowValue.push(false);
			}
			if (tempShowValue[i] === true) {
				tempData.push(dataForLineChart[i]);
			}
		}
        setShowData(tempData);
		setShowValue(tempShowValue);
        setLoading(false);
    }, [])


    const lineChartHeight = height;

    const originalData = zoomableLineChartData['data'];

    const handleRadarChange = (e) => {
        setLoading(true);
        let tempData = [];
        for (let i = 0; i < originalData.length; i++) {
            if (originalData[i][indexBy] === e.target.value) {
                if (e.target.checked) {
                    showValue[i] = true;
                } else {
                    showValue[i] = false;
                }
            }
        }
        for (let i = 0; i < originalData.length; i++) {
            if (showValue[i] === true) {
                tempData.push(dataForLineChart[i]);
            }
        }
        setShowData(tempData);
        setIdForZoomableLineChart(idForZoomableLineChart + 1);
    setLoading(false);
    }

    function renderCheckBoxItem(indexBy, item, checked) {
        if ('description' in item) {
            return (
                <Tooltip title={item['description']} placement="left">
                    <ListItem disablePadding>
                        <Checkbox key={item[indexBy]} defaultChecked={checked} onClick={handleRadarChange} value={item[indexBy]} />
                        <ListItemText primary={item[indexBy]} />
                    </ListItem>
                </Tooltip>
            )
        } else {
            return (
                <ListItem disablePadding>
                    <Checkbox key={item[indexBy]} defaultChecked={true} onClick={handleRadarChange} value={item[indexBy]} />
                    <ListItemText primary={item[indexBy]} />
                </ListItem>
            )

        }
    }


    let i = 0;
    function renderLineChart(height, showOrNot) {
        if (showOrNot) {
        i++;
            return (
                <MyZoomableLine idForZoomableLineChart={idForZoomableLineChart} zoomableLineChartData={showData[i-1]} height={height}/>
                )
        }
    }
    if (loading) {
        return "Loading...";
    } else {
        return (
            <Grid container>
                <Grid item xs={2}>
                    <List>
                        {originalData.map(function (elem, id) {
                            return renderCheckBoxItem(indexBy, elem, showValue[id]);
                        })
                        }
                    </List>
                </Grid>
                <Grid item xs={10}>
                    <List>
                        {showValue.map((elem) => {
                            // data
                            return renderLineChart(lineChartHeight, elem);
                        })
                        }
                    </List>
                </Grid>
            </Grid>
        );
    }
}
