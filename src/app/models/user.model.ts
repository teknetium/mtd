export class UserModel {
  constructor(
    public uid: string = '',
    public userType: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public org: string = '',
    public userStatus: string = 'active',
    public trainingStatus: string = 'uptodate',
    public roles: string[] = ['basic'],
    public directReports: string[] = [],
    public myTrainings: string[] = [],
    public profilePicUrl: string = ''
  ) { }
}
