import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UmBookTestModule } from '../../../test.module';
import { FriendsComponent } from 'app/entities/friends/friends.component';
import { FriendsService } from 'app/entities/friends/friends.service';
import { Friends } from 'app/shared/model/friends.model';

describe('Component Tests', () => {
  describe('Friends Management Component', () => {
    let comp: FriendsComponent;
    let fixture: ComponentFixture<FriendsComponent>;
    let service: FriendsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UmBookTestModule],
        declarations: [FriendsComponent],
      })
        .overrideTemplate(FriendsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FriendsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FriendsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Friends(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.friends && comp.friends[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
