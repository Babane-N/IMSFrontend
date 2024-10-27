import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  users: any[] = []; // Array to hold users

  constructor(private userService: UserService) { }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data; // Assign the fetched users to the array
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  generatePdf(): void {
    // Make sure to fetch users first
    if (this.users.length === 0) {
      console.warn('No users to generate PDF');
      return;
    }

    const reportContent = document.getElementById('reportContent');

    if (reportContent) {
      html2canvas(reportContent).then(canvas => {
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        let position = 10;

        // Add title to the PDF
        const title = 'User List Report';
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        const x = (imgWidth - titleWidth) / 2;
        doc.text(title, x, position);
        position += 10;

        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - position;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save('user_report.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('No report content found for PDF generation');
    }
  }

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users on initialization
  }
}


