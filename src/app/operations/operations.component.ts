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
    this.displayValue += operator;
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
      } else {
        this.displayValue = result.toString();
      }
    } catch (error) {
      // Handle calculation error if necessary
      console.error(error);
    }
  }

  clear(): void {
    this.displayValue = '';
  }

  onEnter(): void {
    this.calculate();
  }
  onBackspace(): void {
    this.displayValue = this.displayValue.slice(0, -1);
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
    } else if (key === 'Enter') {
      this.onEnter();
    } else if (key === 'Backspace') {
      this.onBackspace();
    }
  }
}
