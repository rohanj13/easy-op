import Papa from "papaparse";

export interface CSVField {
  "Question ID": string;
  Tab: string;
  "Sub-Tab": string;
  Question: string;
  Type: string;
  "Look Up Dictionary"?: string;
  Validation?: string;
}

export const parseCSVText = async (csvText: string): Promise<CSVField[]> => {
  return new Promise((resolve) => {
    Papa.parse<CSVField>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
    });
  });
};