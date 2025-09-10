import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditHtmlChunkComponent } from '../edit-html-chunk/edit-html-chunk.component';
import { HtmlChunkService } from '../../../tarjetas/html-chunk.service';
import { HtmlChunk } from '../../../models/HtmlChunk';

@Component({
  selector: 'app-html-chunks-list',
  templateUrl: './html-chunks-list.component.html',
  styleUrls: ['./html-chunks-list.component.scss']
})
export class HtmlChunksListComponent implements OnInit {
  htmlChunks: HtmlChunk[] = [];
  loading = true;
  displayedColumns = ['name', 'htmlContent', 'language', 'actions'];

  constructor(private htmlChunkService: HtmlChunkService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadHtmlChunks();
  }

  loadHtmlChunks() {
    this.loading = true;
    this.htmlChunkService.getAll().subscribe({
      next: chunks => {
        this.htmlChunks = chunks;
        this.loading = false;
      },
      error: () => {
        this.htmlChunks = [];
        this.loading = false;
      }
    });
  }

  editChunk(chunk: HtmlChunk) {
    const dialogRef = this.dialog.open(EditHtmlChunkComponent, {
      width: '800px',
      data: { ...chunk }
    });

    dialogRef.afterClosed().subscribe(updatedChunk => {
      if (updatedChunk) {
        this.htmlChunkService.updateHtmlChunk(updatedChunk).subscribe(() => {
          this.loadHtmlChunks();
        });
      }
    });
  }
}
