import ExcelJS from "exceljs";

export const exportToExcel = async (data, fileName = "المدارس") => {
  // Arabic translations for headers
  const arabicHeaders = {
    number: "الرقم الوزاري",
    name: "اسم المدرسة",
    quarter: "الحي",
    sector: "التجمع الصحي",
    stage: "المرحلة",
    gender: "جنس المدرسة",
    rule: "السلطة",
    type: "نوع المدرسة",
    manager: "اسم مدير المدرسة",
    email: "البريد الإلكتروني لمدير المدرسة",
    phone: "جوال مدير المدرسة",
    supervisor: "اسم المشرف الصحي",
    latitude: "خط العرض",
    longitude: "خط الطول",
  };

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("المدارس");

  // Set RTL direction for the entire worksheet
  worksheet.views = [
    {
      rightToLeft: true, // This makes the sheet RTL
    },
  ];

  // Add headers with Arabic titles
  const headers = Object.keys(data[0])
    .filter((key) => key !== "id" && key !== "sectorId")
    .map((key) => arabicHeaders[key]);

  // Create header row with styling
  const headerRow = worksheet.addRow(headers);

  // Style the header row
  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      size: 12,
      name: "Arial", // Use a font that supports Arabic
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE6E6FA" }, // Light purple background
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Add data rows
  data.forEach((item) => {
    // eslint-disable-next-line no-unused-vars
    const { id, sectorId, ...rest } = item;
    const row = worksheet.addRow(Object.values(rest));

    // Style data rows
    row.eachCell((cell) => {
      cell.alignment = {
        vertical: "middle",
        horizontal: "right", // Right align for RTL
        wrapText: true,
      };
      cell.font = {
        name: "Arial", // Use a font that supports Arabic
        size: 11,
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Auto-fit columns for better readability
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = Math.min(maxLength + 2, 50); // Max width 50
  });

  // Freeze the header row
  worksheet.views = [
    {
      state: "frozen",
      ySplit: 1, // Freeze first row
      rightToLeft: true,
    },
  ];

  // Write to buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();

  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
  }, 100);
};

export const importFromExcel = async (file) => {
  // Reverse mapping from Arabic to English keys
  const englishKeys = {
    "الرقم الوزاري": "number",
    "اسم المدرسة": "name",
    المنطقة: "quarter",
    "التجمع الصحي": "sector",
    المرحلة: "stage",
    "جنس المدرسة": "gender",
    السلطة: "rule",
    "نوع المدرسة": "type",
    "اسم مدير المدرسة": "manager",
    "البريد الإلكتروني لمدير المدرسة": "email",
    "جوال مدير المدرسة": "phone",
    "اسم المشرف الصحي": "supervisor",
    "خط العرض": "latitude",
    "خط الطول": "longitude",
  };

  // Map Arabic sector names to sectorId
  const sectorMap = {
    "التجمع الصحي الأول": 1,
    "التجمع الصحي الثاني": 2,
    "التجمع الصحي الثالث": 3,
    "لا تتبع أي تجمع": 4,
    5: "لا تدخل ضمن تطبيق الخطة المشتركه ولا التجمعات الصحية",
    "": 4, // Fallback for empty
  };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.getWorksheet(1); // Get first sheet
        const data = [];

        // Get headers from first row
        const headers = [];
        worksheet.getRow(1).eachCell((cell, colNumber) => {
          headers[colNumber] =
            typeof cell.value === "string" ? cell.value.trim() : cell.value;
        });

        // Process each row starting from row 2
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // Skip header row

          const rowData = {};

          row.eachCell((cell, colNumber) => {
            const arabicHeader = headers[colNumber];
            const englishKey = englishKeys[arabicHeader];
            if (englishKey) {
              rowData[englishKey] = cell.value || "";
            }
          });

          // Add sectorId based on sector name
          if (rowData.sector) {
            rowData.sectorId = sectorMap[rowData.sector] || 4;
          } else {
            rowData.sectorId = 4; // Default if no sector
          }

          // Generate unique ID
          rowData.id = generateUniqueId();

          data.push(rowData);
        });

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const importFromExcels = async (file) => {
  const englishKeys = {
    "الرقم الوزاري": "number",
    "اسم المدرسة": "name",
    الحي: "quarter",
    المنطقة: "region",
    "التجمع الصحي": "sector",
    المرحلة: "stage",
    السلطة: "rule",
    "جنس المدرسة": "gender",
    "نوع المدرسة": "type",
    "اسم مدير المدرسة": "manager",
    "البريد الإلكتروني لمدير المدرسة": "email",
    "جوال مدير المدرسة": "phone",
    "خط العرض": "latitude",
    "خط الطول": "longitude",
    "اسم الموجه الصحي": "supervisorName",
    "جوال الموجه الصحي": "supervisorPhone",
    "اسم المشرف الصحي": "supervisor",
  };

  const sectorMap = {
    "التجمع الصحي الأول": 1,
    "التجمع الصحي الثاني": 2,
    "التجمع الصحي الثالث": 3,
    "لا تتبع أي تجمع": 4,
    5: "لا تدخل ضمن تطبيق الخطة المشتركه ولا التجمعات الصحية",

    "": 4,
  };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
          throw new Error("No worksheets found in the Excel file");
        }

        const data = [];

        // Get headers from first row - handle empty columns
        const headers = [];
        const headerRow = worksheet.getRow(1);

        if (!headerRow) {
          throw new Error("No header row found");
        }

        // Use eachCell with includeEmpty: true to get all columns including empty ones
        headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if (cell.value) {
            headers[colNumber] =
              typeof cell.value === "string"
                ? cell.value.trim()
                : String(cell.value);
          } else {
            headers[colNumber] = ""; // Mark empty header cells
          }
        });

        // Process each row starting from row 2
        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
          const row = worksheet.getRow(rowNumber);

          // Skip completely empty rows
          if (!row || row.cellCount === 0) continue;

          const rowData = {};
          let hasData = false;

          // Process each cell in the row
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const arabicHeader = headers[colNumber];

            // Only process if header exists and is mapped
            if (
              arabicHeader &&
              arabicHeader.trim() &&
              englishKeys[arabicHeader]
            ) {
              const englishKey = englishKeys[arabicHeader];

              // Handle empty cells gracefully
              if (cell.value !== null && cell.value !== undefined) {
                rowData[englishKey] =
                  typeof cell.value === "string"
                    ? cell.value.trim()
                    : cell.value;
                if (rowData[englishKey] !== "") {
                  hasData = true;
                }
              } else {
                rowData[englishKey] = "";
              }
            }
          });

          // Only add row if it has some data
          if (hasData) {
            // Add sectorId based on sector name
            if (rowData.sector) {
              const sectorValue = String(rowData.sector).trim();
              rowData.sectorId = sectorMap[sectorValue] || 4;
            } else {
              rowData.sectorId = 4;
            }

            // Generate unique ID
            rowData.id = generateUniqueId();
            data.push(rowData);
          }
        }

        resolve(data);
      } catch (error) {
        console.error("Excel import error:", error);
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Helper function to generate unique ID
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
