import { Injectable } from '@angular/core';
import * as cms from 'filestack-js';
import { PickerOptions, PickerResponse, PickerFileMetadata } from 'filestack-js/build/main/lib/picker';
import { SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingModel } from '../models/training.model';
import { FileModel } from '../models/file.model';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  authenticatedUser: UserModel;
  authenticatedUser$: Observable<UserModel>;
  fileUploadResult: PickerResponse;

  tmpFileObj: FileModel;
  tmpFileObjArray: FileModel[] = [];

  private _allUploadedFiles: FileModel[];

  private _failedFiles$ = new BehaviorSubject<FileModel[]>(null);
  private _filesUploaded$ = new BehaviorSubject<FileModel[]>(null);
  private _filesUploadedCnt$ = new BehaviorSubject<number>(0);


  docURL: SafeResourceUrl;
  currentFileHandle = '';
  apikey = 'AUOKQ8sdPStajfMsbFfedz';
  client = cms.init(this.apikey);
  options: PickerOptions = {
    container: '.picker-content',
    maxFiles: 20,
    storeTo: {
      container: 'devportal-customers-assets',
      path: '/mytrainingdocs/',
    },
    fromSources: [
      'local_file_system',
      'dropbox',
      'googledrive',
    ],
    onUploadDone: (results: PickerResponse) => {
      console.log(results);
      this.processResults(results);
    },
    uploadInBackground: false
  };

  constructor(private userService: UserService) {
    this.loadData();
    this.authenticatedUser$ = userService.getAuthenticatedUserStream();
    this.authenticatedUser$.subscribe( (userObj) => {
      this.authenticatedUser = userObj;
    });
  }

  loadData() {
    this._allUploadedFiles = new Array<FileModel>(0);
  }

  processResults(results: PickerResponse) {
    // process the files that failed to upload
    if (results.filesFailed.length > 0) {
      for (const file of results.filesFailed) {
        this.tmpFileObj = new FileModel(file.filename, this.authenticatedUser.uid, file.handle, file.mimetype, file.uploadId, file.url);
        this.tmpFileObjArray.push(this.tmpFileObj);
      }
      this._failedFiles$.next(this.tmpFileObjArray);
    }
    this.tmpFileObjArray = [];

    // process the files that succeeded
    if (results.filesUploaded.length > 0) {
      for (const file of results.filesUploaded) {
        this.tmpFileObj = new FileModel(file.filename, this.authenticatedUser.uid, file.handle, file.mimetype, file.uploadId, file.url);
        console.log(this.tmpFileObj);
        this.tmpFileObjArray.push(this.tmpFileObj);
      }
      console.log(this.tmpFileObjArray);
      this._filesUploaded$.next(this.tmpFileObjArray);

      // add the uploaded files to the repository
      for (const file of this.tmpFileObjArray) {
        console.log(file);
        this._allUploadedFiles.push(file);
        this._filesUploadedCnt$.next(this._allUploadedFiles.length);
      }
    }
  }

  getFilesFailedStream() {
    return this._failedFiles$.asObservable();
  }

  getUploadedFilesStream() {
    return this._filesUploaded$.asObservable();
  }

  getUploadedFileCntStream() {
    return this._filesUploadedCnt$.asObservable();
  }

  pickFiles() {
    this.client.picker(this.options).open();
  }

}
