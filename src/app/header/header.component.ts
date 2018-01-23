import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    private dialogRef: any;

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit() {
    }

    openLoginForm() {
        this.dialog.open(LoginComponent, { width: '500px', height: '450px', data: { errorcode: "hello"}} )
    }

}
