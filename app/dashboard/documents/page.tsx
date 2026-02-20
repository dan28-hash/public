import type { Metadata } from "next";
import { FileText, Download, Upload } from "lucide-react";

export const metadata: Metadata = { title: "Documents" };

const documents = [
  { name: "Proforma Invoice - QT-001", type: "Invoice", date: "2026-01-10", size: "245 KB" },
  { name: "Certificate of Origin - ORD-001", type: "Certificate", date: "2026-01-15", size: "180 KB" },
  { name: "Packing List - ORD-001", type: "Shipping", date: "2026-01-18", size: "120 KB" },
  { name: "Bill of Lading - ORD-001", type: "Shipping", date: "2026-01-20", size: "310 KB" },
];

export default function DocumentsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-text-primary">Documents</h1>
          <p className="mt-1 text-sm text-text-secondary">Access invoices, certificates, and shipping documents.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md border border-border-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-accent">
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {documents.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between rounded-lg border border-border-primary bg-bg-card p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-accent" />
              <div>
                <span className="text-sm font-bold text-text-primary">{doc.name}</span>
                <p className="mt-0.5 text-[10px] text-text-muted">{doc.type} - {doc.date} - {doc.size}</p>
              </div>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded text-text-muted transition-colors hover:text-accent" aria-label={`Download ${doc.name}`}>
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
