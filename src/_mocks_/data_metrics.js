function getRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

let data_metrics = [
    {
        "storeName": "Mong Kok",
        "storeId": 10,
        "data": [
            {
                "metric": "Average Transaction Value",
                "unit": "HKD",
                "target": 500,
                "value": 500 * getRandom(1.15, 1.20),
                "message": ["Warning"]
            },
            {
                "metric": "Visitor",
                "unit": "HKD",
                "target": 200,
                "value": 200 * getRandom(1.15, 1.20),
                "message": ["Warning"]
            },
            {
                "metric": "Gross profit",
                "unit": "HKD",
                "target": 50000,
                "value": 50000 * getRandom(1.15, 1.20),
                "message": ["Warning"]
            },
            {
                "metric": "Net profit",
                "unit": "HKD",
                "target": 30000,
                "value": 30000 * getRandom(1.15, 1.20),
                "message": ["Warning"]
            },
        ]
    },
    {
        "storeName": "Kwun Tong",
        "storeId": 20,
        "data": [
            {
                "metric": "Average Transaction Value",
                "unit": "HKD",
                "target": 500,
                "value": 500 * getRandom(0.5, 0.6),
                "message": ["Warning"]
            },
            {
                "metric": "Visitor",
                "unit": "HKD",
                "target": 200,
                "value": 200 * getRandom(0.8, 1.0),
                "message": ["Warning"]
            },
            {
                "metric": "Gross profit",
                "unit": "HKD",
                "target": 50000,
                "value": 50000 * getRandom(0.8, 1.0),
                "message": ["Warning"]
            },
            {
                "metric": "Net profit",
                "unit": "HKD",
                "target": 30000,
                "value": 30000 * getRandom(0.8, 1.0),
                "message": ["Warning"]
            },
        ]
    }
]

export default data_metrics;