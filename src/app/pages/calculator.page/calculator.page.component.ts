import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CalculatorComponent } from "@/calculator/components/calculator/calculator.component";

@Component({
  selector: 'app-calculator.page',
  imports: [CalculatorComponent],
  templateUrl: './calculator.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorPageComponent { }
