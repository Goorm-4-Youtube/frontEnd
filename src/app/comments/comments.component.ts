import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsService} from "../comments.service";
import {CommentDto} from "../comment-dto";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input()
  videoId: string = '';
  commentsForm: FormGroup;
  commentsDto: CommentDto[] = [];


  constructor(private userService : UserService,private commentService: CommentsService,
              private matSnacBar: MatSnackBar) {
    this.commentsForm = new FormGroup({
      comment: new FormControl(),
    });

  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment() {
    this.userService.registerUser();
    const comment = this.commentsForm.get('comment')?.value;
    const commentDto = {
      "commentText" : comment,
      "authorId": this.userService.getUserId(),
      "authorName": this.userService.getUserName()
    }

    this.commentService.postComment(commentDto,this.videoId).subscribe(()=>{
      this.matSnacBar.open("Comment Posted Successfully","OK");
      this.commentsForm.get('comment')?.reset();
      this.getComments();
    })
  }

  getComments(){
    this.commentService.getAllComments(this.videoId).subscribe(data =>{
      this.commentsDto = data;
    });
  }

  deleteConfirm(idx:number) {
    if(confirm("Are you sure to delete comment")) {
      this.deleteComment(idx);
    }
  }

  deleteComment(idx:number) {
    console.log("delete comment!")
    this.commentService.deleteComment(this.videoId,idx).subscribe(data=>{
      console.log(data)
      this.matSnacBar.open("Comment Deleted Successfully","OK");
      this.commentsForm.get('comment')?.reset();
      this.getComments();
    });

  }

  resetCommet() {
    this.commentsForm.reset();
  }
}
