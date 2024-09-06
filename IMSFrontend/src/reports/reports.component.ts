import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-your-component',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  // Your dataSource and displayedColumns should be defined here
  dataSource = ELEMENT_DATA;  // Define your dataSource
  displayedColumns: string[] = ['id', 'name', 'status'];

  generatePdf() {
    const data = document.getElementById('reportContent');

    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        let position = 10; // Starting position for content

        // Add title to the PDF
        const title = 'Inventory Report';
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        const x = (imgWidth - titleWidth) / 2; // Center the title horizontally
        doc.text(title, x, position); // Title text and position
        position += 10; // Move position down after title

        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - position;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save('report.pdf');
      });
    }
  }
}

// Example data; replace with actual data
const ELEMENT_DATA: any[] = [
  { id: 1, name: 'John Doe', status: 'Active' },
  { id: 2, name: 'Jane Smith', status: 'Inactive' }
];

