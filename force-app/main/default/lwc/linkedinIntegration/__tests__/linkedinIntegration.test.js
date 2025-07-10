import { createElement } from '@lwc/engine-dom';
import LinkedinIntegration from 'c/linkedinIntegration';
import postOnLinkedin from '@salesforce/apex/LinkedinIntegration.postOnLinkedin';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';

describe('c-linkedin-integration', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render the expected UI elements', () => {
        // Arrange
        const element = createElement('c-linkedin-integration', {
            is: LinkedinIntegration
        });

        // Act
        document.body.appendChild(element);

        // Assert
        const lightningCard = element.shadowRoot.querySelector('lightning-card');
        expect(lightningCard.iconName).toBe('standard:account');
        expect(lightningCard.variant).toBe('base');

        const lightningButton = element.shadowRoot.querySelector('lightning-button');
        expect(lightningButton.label).toBe('PostinLinkedIn');

        const lightningInput = element.shadowRoot.querySelector('lightning-input');
        expect(lightningInput.type).toBe('text');
        expect(lightningInput.label).toBe('Enter some text');
    });

    it('should update the inputValue property on input change', () => {
        // Arrange
        const element = createElement('c-linkedin-integration', {
            is: LinkedinIntegration
        });

        // Act
        document.body.appendChild(element);

        const lightningInput = element.shadowRoot.querySelector('lightning-input');
        lightningInput.value = 'Test Input';
        lightningInput.dispatchEvent(new CustomEvent('change'));

        // Assert
        expect(element.inputValue).toBe('Test Input');
    });

    it('should display a success toast message after posting on LinkedIn', async () => {
        // Arrange
        const element = createElement('c-linkedin-integration', {
            is: LinkedinIntegration
        });
        const toastHandler = jest.fn();
        element.addEventListener(ShowToastEventName, toastHandler);

        // Act
        document.body.appendChild(element);

        const lightningInput = element.shadowRoot.querySelector('lightning-input');
        lightningInput.value = 'Test Input';
        lightningInput.dispatchEvent(new CustomEvent('change'));

        const lightningButton = element.shadowRoot.querySelector('lightning-button');
        await lightningButton.click();

        postOnLinkedin.mockResolvedValue('Success Message');

        // Assert
        return Promise.resolve().then(() => {
            expect(toastHandler).toHaveBeenCalled();
            expect(toastHandler.mock.calls[0][0].detail.message).toBe('Success Message');
            expect(toastHandler.mock.calls[0][0].detail.variant).toBe('success');
        });
    });

    it('should display an error toast message when postOnLinkedin fails', async () => {
        // Arrange
        const element = createElement('c-linkedin-integration', {
            is: LinkedinIntegration
        });
        const toastHandler = jest.fn();
        element.addEventListener(ShowToastEventName, toastHandler);

        // Act
        document.body.appendChild(element);

        const lightningButton = element.shadowRoot.querySelector('lightning-button');
        await lightningButton.click();

        postOnLinkedin.mockRejectedValue(new Error('Error Message'));

        // Assert
        return Promise.resolve().then(() => {
            expect(toastHandler).toHaveBeenCalled();
            expect(toastHandler.mock.calls[0][0].detail.message).toBe('Error Message');
            expect(toastHandler.mock.calls[0][0].detail.variant).toBe('error');
        });
    });

    it('should be accessible', async () => {
        // Arrange
        const element = createElement('c-linkedin-integration', {
            is: LinkedinIntegration
        });

        // Act
        document.body.appendChild(element);

        // Assert
        await expect(element).toBeAccessible();
    });

    it('should not allow posting without input', async () => {
        // Arrange
        const element = createElement('c-linkedin-integration', {
            is: LinkedinIntegration
        });

        // Act
        document.body.appendChild(element);

        const lightningButton = element.shadowRoot.querySelector('lightning-button');
        await lightningButton.click();

        // Assert
        expect(element.inputValue).toBe('');
        expect(toastHandler).not.toHaveBeenCalled();
    });
});