import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // lection: host binding
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
  }
})
export class CalculatorButtonComponent {
  // lection: input signal & trnsform value
  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  });
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  });

  // lection: host binding (deprecated)
  // @HostBinding('class.w-2/4') get commandStyle() {
    // return this.isDoubleSize();
  // }

  // lection: view child
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  // lection: output signal
  public onClick = output<string>();

  public handleClick () {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim().toLowerCase());
  }

  // handle key press style in ui
  public isPressed = signal(false);

  public keyboardPressed (key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
