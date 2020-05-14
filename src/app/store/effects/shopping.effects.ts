import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  ShoppingActionTypes,
  LoadShoppingAction,
  LoadShoppingSuccessAction,
  LoadShoppingFailureAction,
  AddItemAction,
  AddItemSuccessAction,
  AddItemFailureAction,
  DeleteItemAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,
} from '../actions/shopping.actions';
import { ShoppingService } from '../../services/shopping.service';

@Injectable()
export class ShoppingEffects {
  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) {}

  @Effect() loadShopping$ = this.actions$.pipe(
    ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
    mergeMap(() =>
      this.shoppingService.getShoppingItems().pipe(
        map((data) => {
          return new LoadShoppingSuccessAction(data);
        }),
        catchError((error) => of(new LoadShoppingFailureAction(error)))
      )
    )
  );

  @Effect() addShoppingItem$ = this.actions$.pipe(
    ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
    mergeMap((data) =>
      this.shoppingService.addShoppingItem(data.payload).pipe(
        map(() => {
          return new AddItemSuccessAction(data.payload);
        }),
        catchError((error) => of(new AddItemFailureAction(error)))
      )
    )
  );

  @Effect() deleteShoppingItem$ = this.actions$.pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
    mergeMap((data) =>
      this.shoppingService.deleteShoppingItem(data.payload).pipe(
        map(() => {
          return new DeleteItemSuccessAction(data.payload);
        }),
        catchError((error) => of(new DeleteItemFailureAction(error)))
      )
    )
  );
}
