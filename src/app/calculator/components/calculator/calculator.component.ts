import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // lection: host listener event
    '(document:keyup)': 'this.handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());
  
  private keyboardTimeout: ReturnType<typeof setTimeout> | null = null;

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public handleClick(key: string): void {
    this.calculatorService.constructNumber(key);
  }

  // lection: host listener event (deprecated)
  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if(this.keyboardTimeout) clearTimeout(this.keyboardTimeout);

    this.keyboardTimeout = setTimeout(() => {
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
    }, 5);
  }
}