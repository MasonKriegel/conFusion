import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule,
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule,
    ]
})
export class MaterialModule { }
