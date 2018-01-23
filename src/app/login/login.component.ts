﻿import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user = { remember: false };

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>
    ) { }


    ngOnInit() {
    }

    onSubmit() {
        console.log("User: ", this.user);
        this.dialogRef.close();
    }

}
