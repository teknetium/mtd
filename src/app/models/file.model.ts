export class FileModel {
  constructor(
    public name: string = '',
    public owner: string = '',
    public handle: string = '',
    public mimetype: string = '',
    public uploadId: string = '',
    public url: string = ''
  ) { }
}
