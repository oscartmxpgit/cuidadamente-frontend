import { Component, Inject, OnInit } from '@angular/core';
import { HtmlChunk } from '../../../models/HtmlChunk';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-html-chunk',
  templateUrl: './edit-html-chunk.component.html',
  styleUrls: ['./edit-html-chunk.component.scss']
})
export class EditHtmlChunkComponent implements OnInit {
  chunk: HtmlChunk;
  editableHtml: string = '';

  // Optional: customize toolbar
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

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
    this.dialogRef.close({ ...this.chunk, htmlContent: this.editableHtml });
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
