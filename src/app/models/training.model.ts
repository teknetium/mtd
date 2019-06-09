class TrainingModel {
  constructor(
    public type: string,
    public title: string,
    public category: string,
    public subcategory: string,
    public desc: string,
    public owner: string,
    public dateCreated: number,
    public files: string[]
  ) { }
}

class FormTrainingModel {
  constructor(
    public type: string,
    public title: string,
    public category: string,
    public subcategory: string,
    public desc: string,
    public owner: string,
    public dateCreated: number,
    public files: string[]
  ) { }
}

export { TrainingModel, FormTrainingModel };
