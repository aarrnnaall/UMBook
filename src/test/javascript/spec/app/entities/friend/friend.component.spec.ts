import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UmBookTestModule } from '../../../test.module';
import { FriendComponent } from 'app/entities/friend/friend.component';
import { FriendService } from 'app/entities/friend/friend.service';
import { Friend } from 'app/shared/model/friend.model';

describe('Component Tests', () => {
  describe('Friend Management Component', () => {
    let comp: FriendComponent;
    let fixture: ComponentFixture<FriendComponent>;
    let service: FriendService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UmBookTestModule],
        declarations: [FriendComponent],
      })
        .overrideTemplate(FriendComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FriendComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FriendService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Friend(123)],
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
