export class QuizConfig {
    allowBack: boolean;
    allowReview: boolean;
    autoMove: boolean;  
    pageNumber: number;
    showpagenumber: boolean;

    constructor(data: any) {
        data = data || {};
        this.allowBack = data.allowBack;
        this.allowReview = data.allowReview;
        this.autoMove = data.autoMove;
        //this.duration = data.duration;
        this.pageNumber = data.pageNumber;
        this.showpagenumber = data.showpagenumber;
    }
}
