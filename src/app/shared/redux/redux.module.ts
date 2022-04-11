import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import effects from './effects';
import reducers from './reducers';

@NgModule({
    imports: [
      StoreModule.forRoot(reducers as ActionReducerMap<{}>),
      EffectsModule.forRoot(effects),
      StoreDevtoolsModule.instrument({
        name: 'My Poll Application',
        maxAge: 25
      })
    ]
})
export class ReduxModule {}
