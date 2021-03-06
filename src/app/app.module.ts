import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';

import { Activities } from '../mocks/providers/activities';
import { EmployeesProvider } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';

import { SalesItemPage } from '../pages/sales-item/sales-item';
import { SalesItemRecordCreatePage } from '../pages/sales-item-record-create/sales-item-record-create';
import { ActivityItemViewPage } from '../pages/activity-item-view/activity-item-view';
import { ActivityItemEditPage } from '../pages/activity-item-edit/activity-item-edit';
import { ImgServiceProvider } from '../providers/img-service/img-service';
import { ProductsProvider } from '../providers/products/products';
import { StoresProvider } from '../providers/stores/stores';
import { SalesInfoProvider } from '../providers/sales-info/sales-info';
import { StorageProvider } from '../providers/storage/storage';
import { ActivitiesProvider } from '../providers/activities/activities';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    SalesItemPage,
    SalesItemRecordCreatePage,
    ActivityItemViewPage,
    ActivityItemEditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SalesItemPage,
    SalesItemRecordCreatePage,
    ActivityItemViewPage,
    ActivityItemEditPage
  ],
  providers: [
    Api,
    Activities,
    EmployeesProvider,
    Camera,
    File,
    FileTransfer,
    ImagePicker,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    // { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ActivitiesProvider,
    ImgServiceProvider,
    ProductsProvider,
    StoresProvider,
    SalesInfoProvider,
    StorageProvider
  ]
})
export class AppModule { }
