import { Injectable, signal } from '@angular/core';

const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators: string[] = ['+', '-', 'x', '÷'];
const specialOperators: string[] = ['+/-', '%', '.', '=', 'c', 'backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal<string>('0');
  public subResultText = signal<string>('0');
  public lastOperator = signal<string>('+');

  public constructNumber(value: string): void {

    if(![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    // calculate result
    if(value === '=') {
      this.calculateResult();
      return;
    }

    // clear result
    if(value === 'c') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // backspace
    if (value === 'backspace') {
      if(this.resultText() === '0') return;

      if(this.resultText().startsWith('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if(this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update(prev => prev.slice(0, -1));
      return;
    }

    // apply operator
    if(operators.includes(value)) {
      // this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // apply decimal point
    if(value === '.') {
      if(this.resultText().includes('.')) return;

      this.resultText.update(prev => prev + '.');
      return;
    }
    
    // limit result to 10 digits
    if(this.resultText().length >= 10) {
      console.log('Max digits reached');
      return;
    }

    // handle zero
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '0.')) {
      return;
    }

    // handle negative
    if(value === '+/-') {
      if(this.resultText().startsWith('-')) {
        this.resultText.update(prev => prev.slice(1));
      }
      else {
        this.resultText.update(prev => '-' + prev);
      }

      return;
    }

    // add number
    if(numbers.includes(value)) {
      if(this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if(this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update(prev => prev + value);
      return;
    }
  }

  public calculateResult(): void {
    const number1 = parseFloat(this.subResultText()); 
    const number2 = parseFloat(this.resultText());
    
    let result = 0;

    switch(this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
      default:
        result = number1;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
  
}
