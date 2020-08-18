import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UmBookTestModule } from '../../../test.module';
import { FriendsDetailComponent } from 'app/entities/friends/friends-detail.component';
import { Friends } from 'app/shared/model/friends.model';

describe('Component Tests', () => {
  describe('Friends Management Detail Component', () => {
    let comp: FriendsDetailComponent;
    let fixture: ComponentFixture<FriendsDetailComponent>;
    const route = ({ data: of({ friends: new Friends(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UmBookTestModule],
        declarations: [FriendsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FriendsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FriendsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load friends on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.friends).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
