import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'mtd-file-type-demo',
  templateUrl: './file-type-demo.component.html',
  styleUrls: ['./file-type-demo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTypeDemoComponent implements OnInit {

  fileList = [
    { fileExt: 'pdf', fileUrl: 'https://cdn.filestackcontent.com/preview/79XoroCnSjqQc10gODMR', iconClassStr: 'file-pdf', description: 'Adobe Portable Document Format'},
    { fileExt: 'doc', fileUrl: 'https://cdn.filestackcontent.com/preview/N2n8HqpHStixlpFpizcB', iconClassStr: 'file-word', description: 'Microsoft Word'},
    { fileExt: 'docx', fileUrl: 'https://cdn.filestackcontent.com/preview/VJtM1v3GSJWn21rPpoWO', iconClassStr: 'file-word', description: 'Microsoft Word Open XML Document'},
    { fileExt: 'ppt', fileUrl: 'https://cdn.filestackcontent.com/preview/GlUL5nyBRKW7a1Gy8VJX', iconClassStr: 'file-ppt', description: 'Microsoft PowerPoint'},
    { fileExt: 'pptx', fileUrl: 'https://cdn.filestackcontent.com/preview/GoEmesieRdCm3JW9ZjY6', iconClassStr: 'file-ppt', description: 'Multi-file Microsoft PowerPoint'},
    { fileExt: 'xls', fileUrl: 'https://cdn.filestackcontent.com/preview/BJhBOmkMQSKGwaggpMvM', iconClassStr: 'file-excel', description: 'Microsoft Excel'},
    { fileExt: 'xlsx', fileUrl: 'https://cdn.filestackcontent.com/preview/tJVErlZ7SQOvHCqLowvN', iconClassStr: 'file-excel', description: 'Microsoft Excel Open XML Spreadsheet'},
    { fileExt: 'odt', fileUrl: 'https://cdn.filestackcontent.com/preview/NWrFuueATB2Fsx5Vq7ZY', iconClassStr: 'file-word', description: 'OpenDocument XML-based Text Format'},
    { fileExt: 'odp', fileUrl: 'https://cdn.filestackcontent.com/preview/yc9yiJRfTuS65LmzyFdR', iconClassStr: 'file-ppt', description: 'OpenDocument Presentation'},
    { fileExt: 'gif', fileUrl: 'https://cdn.filestackcontent.com/preview/S5nbe6YlReOPukQNMx45', iconClassStr: 'file-image', description: 'Graphical Interchange Format'},
    { fileExt: 'tiff', fileUrl: 'https://cdn.filestackcontent.com/preview/8m4Tm8brQUq0PhIddvOl', iconClassStr: 'file-image', description: 'Tagged Image File Format'},
    { fileExt: 'jpg', fileUrl: 'https://cdn.filestackcontent.com/preview/HhToZAgARC2fpqsgXNRH', iconClassStr: 'file-jpg', description: 'Joint Photographic Experts Group - Compressed Image'},
    { fileExt: 'png', fileUrl: 'https://cdn.filestackcontent.com/preview/qdZlR9TS4u25DWhJrqoA', iconClassStr: 'file-image', description: 'Portable Network Graphic'},
    { fileExt: 'txt', fileUrl: 'https://cdn.filestackcontent.com/preview/NxrV8DSEQdeQAth10aKD', iconClassStr: 'file-text', description: 'Text'},
    { fileExt: 'html', fileUrl: 'https://cdn.filestackcontent.com/WwOR5a0KQAu7FgRZSD4s', iconClassStr: 'file', description: 'Hypertext Markup Language'},
    { fileExt: 'psd', fileUrl: 'https://cdn.filestackcontent.com/preview/6jv6MyobQBuaZpLNmslC', iconClassStr: 'file', description: 'Adobe Photoshop'},
    { fileExt: 'ai', fileUrl: 'https://cdn.filestackcontent.com/preview/tA737ejqQgMigNkRPNkH', iconClassStr: 'file', description: 'Adobe Illustrator'}
  ];

  docUrl: SafeResourceUrl;
  currentIndex = 0;
  width = 0;
  height = 0;

  constructor(private sanitizer: DomSanitizer) {
    this.docUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://cdn.filestackcontent.com/preview/79XoroCnSjqQc10gODMR');
  }

  showFile(i) {
    this.currentIndex = i;
    this.docUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileList[i].fileUrl);
  }

  ngOnInit() {
//    this.onResized(this.fakeEvent);
  }

}
