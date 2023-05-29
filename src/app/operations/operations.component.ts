import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent {
  displayValue: string = '';

  appendNumber(number: string): void {
    this.displayValue += number;
  }

  setOperator(operator: string): void {
    if (!this.displayValue.includes('+') || this.displayValue.includes('-') || this.displayValue.includes('*') || this.displayValue.includes('/') || this.displayValue.includes('%')) {
      this.displayValue += operator;
    }
  }

  appendDecimal(): void {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  calculate(): void {
    try {
      const result = eval(this.displayValue);
      if (result === Infinity || result === -Infinity) {
        this.displayValue = 'Infinity';
      }
      else {
        this.displayValue = result.toString();
      }
    } catch (error) {
      console.error(error);
    }
  }
  clear(): void {
    this.displayValue = '';
  }
  appendToCalculation(value: string) {
    this.displayValue += value;
  }

  onEnter(): void {
    this.calculate();
  }
  onBackspace(): void {
    this.displayValue = this.displayValue.slice(0, -1);
  }
  handlePercentage() {
    if (this.displayValue) {
      try {
        const result = eval(this.displayValue);
        const percentage = result / 100;
        this.displayValue = percentage.toString();
      } catch (error) {
        console.error('Something Wrong', error);
      }
    }
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const key = event.key;
    if (/^\d$/.test(key)) {
      this.appendNumber(key);
    } else if (key === '.') {
      this.appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      this.setOperator(key);
    }
    else if (key === 'Enter') {
      this.onEnter();
    } else if (key === 'Backspace') {
      this.onBackspace();
    }
    else if (key === '(' || key === ')') {
      this.appendToCalculation(key)
    }
  }
}
