import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

@Component({
  selector: 'app-calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // lection: host listener event
    '(document:keyup)': 'this.handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public handleClick(key: string) {
    console.log({ key });
  }

  // lection: host listener event (deprecated)
  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    const keyEquivalents: Record<string, string> = {
      'escape': 'c',
      'clear': 'c',
      'enter': '=',
      '*': 'x',
      '/': '÷'
    };

    const keyValue = keyEquivalents[key] ?? key;
    
    this.handleClick(keyValue);

    for(let button of this.calculatorButtons()) {
      button.keyboardPressed(keyValue);
    }
  }
}