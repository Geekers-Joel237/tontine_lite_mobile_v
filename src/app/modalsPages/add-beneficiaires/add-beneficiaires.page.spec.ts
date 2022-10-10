import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBeneficiairesPage } from './add-beneficiaires.page';

describe('AddBeneficiairesPage', () => {
  let component: AddBeneficiairesPage;
  let fixture: ComponentFixture<AddBeneficiairesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBeneficiairesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBeneficiairesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
