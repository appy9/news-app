import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';
import { debounceTime, tap } from 'rxjs/operators'

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    public articles: any[] = [];
    public search: string;
    @ViewChild('searchbox') searchInput;

    constructor(
        private router: Router,
        private newsService: NewsService
    ) {

    }

    public ngOnInit() {
        this.fetchArticles();
    }

    ngAfterViewInit(){
        this.searchInput.valueChanges.pipe(
            debounceTime(1000),
            tap(val => console.log(val))
          ).subscribe(data => this.fetchArticles(data));         
 
    }

    private fetchArticles(search?: string): void {
        if(search){
            this.newsService.everything(search).subscribe(data => {
                this.articles = data.articles;
            });
        }
        else{
            this.newsService.topHeadlines().subscribe(data => {
                this.articles = data.articles;
            });
        }        
    }

    private launchArticle(article){
        this.router.navigate(['/article'], {state:article});
    }

    private getDateString(dateString:string): string{
        let date = new Date(dateString);
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return month_names_short[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

}
