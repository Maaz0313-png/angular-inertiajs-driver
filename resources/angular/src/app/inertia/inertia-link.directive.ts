import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { router } from "@inertiajs/core";

@Directive({
  selector: '[inertiaLink]'
})
export class InertiaLinkDirective {

  @Input('inertiaLink') href = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Only handle primary (usually left) button
    if (event.button !== 0) {
      return;
    }

    // Respect modifier keys so users can open in new tab/window
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    // If no explicit href input, try to read from host element (e.g. <a href="...">)
    const href = this.href || (this.el.nativeElement.getAttribute && this.el.nativeElement.getAttribute('href')) || '';

    if (!href) {
      return;
    }

    // Prevent native navigation and use Inertia router
    event.preventDefault();
    router.get(href);
  }
}
