import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITrack, NewTrack } from '../track.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrack for edit and NewTrackFormGroupInput for create.
 */
type TrackFormGroupInput = ITrack | PartialWithRequiredKeyOf<NewTrack>;

type TrackFormDefaults = Pick<NewTrack, 'id'>;

type TrackFormGroupContent = {
  id: FormControl<ITrack['id'] | NewTrack['id']>;
  name: FormControl<ITrack['name']>;
  album: FormControl<ITrack['album']>;
};

export type TrackFormGroup = FormGroup<TrackFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrackFormService {
  createTrackFormGroup(track: TrackFormGroupInput = { id: null }): TrackFormGroup {
    const trackRawValue = {
      ...this.getFormDefaults(),
      ...track,
    };
    return new FormGroup<TrackFormGroupContent>({
      id: new FormControl(
        { value: trackRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(trackRawValue.name, {
        validators: [Validators.required],
      }),
      album: new FormControl(trackRawValue.album),
    });
  }

  getTrack(form: TrackFormGroup): ITrack | NewTrack {
    return form.getRawValue() as ITrack | NewTrack;
  }

  resetForm(form: TrackFormGroup, track: TrackFormGroupInput): void {
    const trackRawValue = { ...this.getFormDefaults(), ...track };
    form.reset(
      {
        ...trackRawValue,
        id: { value: trackRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TrackFormDefaults {
    return {
      id: null,
    };
  }
}
