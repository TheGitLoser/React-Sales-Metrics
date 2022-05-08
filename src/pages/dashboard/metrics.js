import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// material
import { Box, Tooltip, Grid, Container, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemIcon } from '@mui/material';
import { Icon } from '@iconify/react';

// components
import Page from '../../components/layouts/Page';
import SelectableLineChart from '../../components/lineChart/SelectableLineChart';
import MyResponsiveRadar from "../../components/radarChart/RadarChart";
import MyCollapse from "../../components/Collapse";

// multi language support
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

import data_metrics from "../../_mocks_/data_metrics";
import data_product from "../../_mocks_/data_product";
import { preprocessDataForRadarChart } from "../../utils";

// ----------------------------------------------------------------------

export default function Metrics() {
    const { t, i18n } = useTranslation('Metrics');
    const tempStoreId = useParams()["storeId"];
    const [storeId, setStoreId] = useState(Number(tempStoreId));   // get from URL

    const [loading, setLoading] = useState(true);
    const [stateProduct, setShowProduct] = useState(data_product);

    useEffect(() => {
        // handle product ID if not exists in URL
        if (!storeId) {
            // without product ID in URL
            setStoreId(Number(data_metrics[0]['storeId']));
        } 

        setShowProduct(stateProduct);
        setTimeout(function () {
            setLoading(false);
        }, 200);
    }, [])

    const storeList = data_metrics;
    const showStore = data_metrics.find(x => x.storeId === storeId);
    const showProduct = stateProduct.find(x => x.storeId === storeId);
    const handleProductChange = (e) => {
        setStoreId(Number(e.target.value));
    }

    function renderStoreSelection(product) {
        if (storeId == product['storeId']) {
            return (<MenuItem value={product['storeId']}>{product['storeName']}</MenuItem>)
        } else {
            return (<MenuItem value={product['storeId']}>{product['storeName']}</MenuItem>)
        }
    }

    function renderMessage(data, indexBy) {
        let withMessage = [];
        let withoutMessage = [];
        const deviationCutOut = 0.2;

        data.forEach(item => {
            // define whether is deviation or not
            if (Math.abs((item['value'] / item['target']) - 1) > deviationCutOut) {
                withMessage.push(item);
            } else {
                withoutMessage.push(item);
            }
        });

        // show UI
        // with message
        let output = [];
        withMessage.forEach(element => {
            let targetValue = element['target'] + " (" + element['unit'] + ") ";
            let currentValue = element['value'].toFixed(3) + " (" + element['unit'] + ") ";

            let collapseText = (<Typography variant="body2" gutterBottom>
                                <i> <br />
                                    Target is {targetValue} <br />
                                    Current value is {currentValue} <br />
                                    <List>
                                        <ul>
                                            {element['message'].map(cause =>
                                            (
                                                <ListItem disablePadding>
                                                    <ListItemIcon>
                                                        <Icon icon="carbon:send" />
                                                    </ListItemIcon>
                                                    {cause}
                                                </ListItem>
                                            )
                                            )}
                                        </ul>
                                    </List>
                                </i>
                            </Typography>);
                            
            output.push(
                <Grid item xs={12}>
                    <Card sx={{ bgcolor: 'warning.light' }}>
                        <CardContent>
                            <MyCollapse title={element[indexBy]} content="Click to show message" collapseContent={collapseText} />
                        </CardContent>
                    </Card>
                </Grid>
            )
        });

        // no message
        let tempNameList = [];
        withoutMessage.forEach(element => {
            tempNameList.push(element[indexBy]);
        });
        function getNoMessageName(name) {
            return (<Typography variant="subtitle1" gutterBottom color='success.contrastText'>{name}</Typography>);
        }
        output.push(
            <Grid item xs={12}>
                <Card sx={{ bgcolor: 'success.light' }}>
                    <CardContent>
                        {tempNameList.map((name) => { return getNoMessageName(name) })}
                        <Typography variant="body2" gutterBottom color='info.dark'>
                            Normal.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
        return output;
    }

    if (loading) {
        return "Loading...";
    } else {
        return (
            <Page title={t('Website name', { ns: 'sidebar' })}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item md={12} sm={12} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        {t("store selection.title")}
                                        <Tooltip title={t("store selection.tooltip")}>
                                            <Icon style={{ float: 'right' }} icon="emojione:white-question-mark" width="25" height="25" />
                                        </Tooltip>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <FormControl fullWidth>
                                            <InputLabel>{t("store selection.input label")}</InputLabel>
                                            <Select defaultValue={storeId} label="store" onChange={handleProductChange}>
                                                {storeList.map(function (product) {
                                                    return renderStoreSelection(product);
                                                }
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        {t("store.title")}
                                        <Tooltip title={(parse(t("store.tooltip")))}>
                                            <Icon style={{ float: 'right' }} icon="emojione:white-question-mark" width="25" height="25" />
                                        </Tooltip>
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <Box sx={{ height: 500 }}>
                                                <MyResponsiveRadar data={preprocessDataForRadarChart(showStore['data'], "metric")}
                                                    keys={['Value', 'Target']} indexBy={"radarChart-name"} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={1}>
                                                {renderMessage(showStore['data'], "metric")}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        {t("product.title")}
                                        <Tooltip title={parse(t("product.tooltip"))}>
                                            <Icon style={{ float: 'right' }} icon="emojione:white-question-mark" width="25" height="25" />
                                        </Tooltip>
                                    </Typography>
                                    <SelectableLineChart key={storeId} zoomableLineChartData={showProduct} heading="Product" height="200px"
                                        keys={['Value', 'Target']}
                                        indexBy={"productName"} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        );
    }
}