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

// Helper function to generate unique ID
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
