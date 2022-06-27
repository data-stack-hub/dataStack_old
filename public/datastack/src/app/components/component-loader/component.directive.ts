import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[root]',
})
export class ComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
