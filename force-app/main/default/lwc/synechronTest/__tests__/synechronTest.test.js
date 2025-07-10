import { createElement } from '@lwc/engine-dom';
import SynechronTest from 'c/synechronTest';

describe('c-synechron-test', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Verify that the component is created successfully', () => {
        // Arrange
        const element = createElement('c-synechron-test', {
            is: SynechronTest
        });

        // Act
        document.body.appendChild(element);

        // Assert
        expect(element).not.toBeNull();
    });

    it('Enter credit card number in input field and verify that the input is masked after change', () => {
        // Arrange
        const element = createElement('c-synechron-test', {
            is: SynechronTest
        });

        // Act
        document.body.appendChild(element);

        const inputEle = element.shadowRoot.querySelector('lightning-input');
        inputEle.value = '1234567891234567';
        inputEle.dispatchEvent(new CustomEvent('change'));

        // Assert
        expect(inputEle.value).toBe('************7891');
    });

    it('Enter credit card number in input field and verify that the input is masked after change', () => {
        // Arrange
        const element = createElement('c-synechron-test', {
            is: SynechronTest
        });

        // Act
        document.body.appendChild(element);

        const inputEle = element.shadowRoot.querySelector('lightning-input');
        inputEle.value = '1234567891234567';
        inputEle.dispatchEvent(new CustomEvent('change'));

        // Assert
        expect(inputEle.value).toBe('************7891');
    });
});