import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HtmlChunk } from '../../../models/HtmlChunk';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-html-chunk',
  templateUrl: './edit-html-chunk.component.html',
  styleUrls: ['./edit-html-chunk.component.scss']
})
export class EditHtmlChunkComponent implements OnInit {
  @ViewChild('editableDiv') editableDiv!: ElementRef<HTMLDivElement>;

  chunk: HtmlChunk;
  editableHtml: string = '';

  constructor(
    private dialogRef: MatDialogRef<EditHtmlChunkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HtmlChunk
  ) {
    this.chunk = data;
  }

  ngOnInit() {
    this.editableHtml = this.chunk.htmlContent;
  }

  onSave() {
    const updatedHtml = this.editableDiv.nativeElement.innerHTML;
    this.dialogRef.close({ ...this.chunk, htmlContent: updatedHtml });
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
