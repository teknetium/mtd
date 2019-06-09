import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../services/cms.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PickerOptions, PickerResponse, PickerFileMetadata } from 'filestack-js/build/main/lib/picker';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FileModel } from '../../models/file.model';


@Component({
  selector: 'mtd-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  docUrl: string;

  docUrl$ = new BehaviorSubject<SafeResourceUrl>(null);


  failedFiles$: Observable<FileModel[]>;
  filesUploaded$: Observable<FileModel[]>;

  constructor(private cmsService: CmsService, private sanitizer: DomSanitizer) {
    this.failedFiles$ = cmsService.getFilesFailedStream();
    this.filesUploaded$ = cmsService.getUploadedFilesStream();
  }

  upLoadFile() {
    this.cmsService.pickFiles();
  }

  viewDoc(handle) {
    this.docUrl$.next( this.sanitizer.bypassSecurityTrustResourceUrl('https://cdn.filestackcontent.com/preview/' + handle));
  }

  ngOnInit() {
  }
}
