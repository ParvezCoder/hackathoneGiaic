declare module 'html2pdf.js' {
    export default function html2pdf(): {
        from: (element: HTMLElement) => {
            set: (options: {
                margin?: number;
                filename?: string;
                html2canvas?: {
                    scale?: number;
                };
                jsPDF?: {
                    unit?: string;
                    format?: string;
                    orientation?: string;
                };
            }) => {
                save: () => Promise<void>;
            };
        };
    };
}
