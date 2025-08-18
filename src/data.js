export const sections = [
  {
    id: "northern",
    name: "القطاع الشمالي",
    color: "#3498db",
    geoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [31.2, 29.9],
            [31.2, 31.5],
            [30.0, 31.5],
            [30.0, 30.8],
            [29.5, 30.8],
            [29.5, 29.9],
            [31.2, 29.9],
          ],
        ],
      },
    },
  },
  {
    id: "central",
    name: "قطاع الوسطى",
    color: "#2ecc71",
    geoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [29.5, 30.8],
            [30.0, 30.8],
            [30.0, 31.5],
            [28.5, 31.5],
            [28.5, 30.8],
            [27.8, 30.8],
            [27.8, 29.0],
            [29.5, 29.0],
            [29.5, 30.8],
          ],
        ],
      },
    },
  },
  {
    id: "western",
    name: "القطاع الغربي",
    color: "#e74c3c",
    geoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [27.8, 29.0],
            [27.8, 30.8],
            [25.0, 30.8],
            [25.0, 26.0],
            [27.8, 26.0],
            [27.8, 29.0],
          ],
        ],
      },
    },
  },
  {
    id: "beni-suef",
    name: "القطاع البنويي",
    color: "#9b59b6",
    geoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.5, 29.0],
            [29.5, 29.0],
            [29.5, 29.9],
            [30.0, 29.9],
            [30.0, 28.5],
            [28.5, 28.5],
            [28.5, 29.0],
          ],
        ],
      },
    },
  },
];
