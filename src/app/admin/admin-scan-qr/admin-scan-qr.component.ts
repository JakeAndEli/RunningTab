import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { AdminService } from '../../services/admin.service';
import {AuthenticationService} from '../../services/authenticate.service';

@Component({
  selector: 'app-admin-scan-qr',
  templateUrl: './admin-scan-qr.component.html',
  styleUrls: ['./admin-scan-qr.component.css']
})
export class AdminScanQRComponent implements OnInit {

  @ViewChild('scanner')
    scanner:ZXingScannerComponent;

  hasDevices:boolean;
  hasPermission:boolean;
  qrResultString:string;
  qrResult:Result;
  currentDevice:MediaDeviceInfo;
  scannerEnabled:boolean;
  lookingForUser:boolean;
  fullName:String;

  constructor(private adminService : AdminService,
              private authService : AuthenticationService) {}

  ngOnInit() {
    this.authService.getAdminScanQR().subscribe(
      (data: any) => {
        this.scanner.camerasFound.subscribe((devices:MediaDeviceInfo[]) => {

          // Selects the devices's back camera by default
          for (const device of devices) {
            if (/back|rear|environment/gi.test(device.label)) {
              this.hasDevices = true;
              this.scanner.changeDevice(device);
              this.currentDevice = device;
              this.scannerEnabled = true;
              break;
            } else {
              this.hasDevices = false;
            }
          }
        });

        this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
        this.scanner.scanComplete.subscribe((result:Result) => this.qrResult = result);
        this.scanner.permissionResponse.subscribe((perm:boolean) => this.hasPermission = perm);
      }
    )
  }

  handleQrCodeResult(resultString:string) {
    this.scannerEnabled = false;
    this.lookingForUser = true;

    this.adminService.getUserInfo(resultString).subscribe(
      (data: any) => {
        console.log(data);
        this.fullName = data.fullName;
        this.qrResultString = resultString;

        // Start new tab
        this.adminService.startNewTab(this.qrResultString).subscribe(
          (data: any) => {
            // Potential validation for if the userId exists in the db
            this.lookingForUser = false;
          }
        );
      }
    );

  }

  enableScanningAgain() {
    this.scannerEnabled = true;
    this.qrResultString = null;
  }

}
