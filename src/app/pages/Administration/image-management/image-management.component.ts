import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../../services/fileService';

@Component({
  selector: 'app-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.scss']
})
export class ImageManagementComponent implements OnInit {
  images: { name: string, url: SafeUrl, newName?: string }[] = [];
  selectedFile: File | null = null;

  constructor(private fileService: FileService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.fileService.listImages().subscribe(
      data => {
        this.images = [];
        data.forEach(imageName => {
          this.fileService.loadImage(imageName).subscribe(
            url => {
              this.images.push({ name: imageName, url: this.sanitizer.bypassSecurityTrustUrl(url) });
            },
            error => console.error('Error loading image:', error)
          );
        });
      },
      error => console.error('Error loading images:', error)
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.fileService.uploadImage(this.selectedFile).subscribe(
        () => {
          this.loadImages();
          this.selectedFile = null;
        },
        error => console.error('Error uploading image:', error)
      );
    }
  }

  deleteImage(imageName: string): void {
    console.log('Attempting to delete image:', imageName);
    this.fileService.deleteImage(imageName).subscribe(
      () => this.loadImages(),
      error => console.error('Error deleting image:', error)
    );
  }

  renameImage(oldName: string, newName: string): void {
    if (newName && newName.trim()) {
      this.fileService.renameImage(oldName, newName).subscribe(
        () => this.loadImages(),
        error => console.error('Error renaming image:', error)
      );
    }
  }
}
