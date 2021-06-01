import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(private snackBar: MatSnackBar) { }

    showSnackbar(message: string, duration: number, action: string | undefined = undefined) {
        this.snackBar.open(message, action, {
            duration: duration
        });
    }

    errorMessage(message: string) {
        this.snackBar.open(message, null, {
            duration: 3000,
            panelClass: ['error', 'notification']
        });
    }

    successMessage(message: string) {
        this.snackBar.open(message, null, {
            duration: 3000,
            panelClass: ['success', 'notification']
        });
    }
}