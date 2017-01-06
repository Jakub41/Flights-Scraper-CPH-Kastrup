import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  /* Class that is only used to handle the loading state of the
  frontend application. */
  private isLoading: boolean = true;

  public toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  public getLoading(): boolean {
    return this.isLoading;
  }

  /**
  * Explicitly sets isLoading
  * params: newLoading: bool
  * type: void
  */
  public setLoading(newLoading: boolean): void {
    this.isLoading = newLoading;
  }

}
