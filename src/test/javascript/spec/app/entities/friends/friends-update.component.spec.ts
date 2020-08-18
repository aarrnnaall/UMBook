import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UmBookTestModule } from '../../../test.module';
import { FriendsUpdateComponent } from 'app/entities/friends/friends-update.component';
import { FriendsService } from 'app/entities/friends/friends.service';
import { Friends } from 'app/shared/model/friends.model';

describe('Component Tests', () => {
  describe('Friends Management Update Component', () => {
    let comp: FriendsUpdateComponent;
    let fixture: ComponentFixture<FriendsUpdateComponent>;
    let service: FriendsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UmBookTestModule],
        declarations: [FriendsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FriendsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FriendsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FriendsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Friends(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Friends();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
