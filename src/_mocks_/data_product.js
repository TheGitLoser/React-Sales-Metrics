function getRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

let data_product = [
    {
        "storeName": "Mong Kok",
        "storeId": 10,
        "data": [
            {
                "productName": "Product A",
                "target": 12,
                "value": 12 * getRandom(0.7, 1.3),
            },
            {
                "productName": "Product B",
                "target": 8,
                "value": 8 * getRandom(0.7, 1.3),
            },
            {
                "productName": "Product C",
                "target": 6,
                "value": 6 * getRandom(0.7, 1.3),
            },
            {
                "productName": "Product D",
                "target": 17,
                "value": 17 * getRandom(0.7, 1.3),
            },
        ]
    },
    {
        "storeName": "Kwun Tong",
        "storeId": 20,
        "data": [
            {
                "productName": "Product A",
                "target": 12,
                "value": 12 * getRandom(0.7, 1.3),
            },
            {
                "productName": "Product B",
                "target": 8,
                "value": 8 * getRandom(0.7, 1.3),
            },
            {
                "productName": "Product C",
                "target": 6,
                "value": 6 * getRandom(0.7, 1.3),
            },
            {
                "productName": "Product D",
                "target": 17,
                "value": 17 * getRandom(0.7, 1.3),
            },
        ]
    }
]

export default data_product;