//import { createElement } from 'lwc';
import { createElement } from '@lwc/engine-dom';
import LwcForinterView from 'c/lwcForinterView';
import { createRecord, deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';

// Mocking createRecord and deleteRecord
jest.mock('lightning/uiRecordApi', () => ({
    createRecord: jest.fn(),
    deleteRecord: jest.fn()
}));

// Mocking ShowToastEvent
jest.mock('lightning/platformShowToastEvent', () => ({
    ShowToastEventName: 'lightning__showtoast'
}));

describe('c-lwc-forinter-view', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should create an account successfully', async () => {
        // Arrange
        const element = createElement('c-lwc-forinter-view', {
            is: LwcForinterView
        });
        const mockAccount = {
            id: '00123',
            name: 'Test Account',
            phone: '1234567890'
        };

        createRecord.mockResolvedValue(mockAccount);

        // Act
        document.body.appendChild(element);

        // Set values for account name and phone
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        inputs[0].value = 'Test Account';
        inputs[1].value = '1234567890';

        // Dispatch a change event for each input field
        inputs[0].dispatchEvent(new CustomEvent('change'));
        inputs[1].dispatchEvent(new CustomEvent('change'));

        // Click on the Create Account button
        const createButton = element.shadowRoot.querySelector('lightning-button');
        createButton.click();

        // Wait for async operations to complete
        await Promise.resolve();

        // Assert
        expect(createRecord).toHaveBeenCalled();
        expect(element.accounts).toEqual([mockAccount]);
    });

    it('should delete an account successfully', async () => {
        // Arrange
        const element = createElement('c-lwc-forinter-view', {
            is: LwcForinterView
        });
        const mockAccount = {
            id: '00123',
            name: 'Test Account',
            phone: '1234567890'
        };

        deleteRecord.mockResolvedValue();

        // Act
        document.body.appendChild(element);
        element.accounts = [mockAccount];

        // Simulate a row action to delete the account
        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        const mockRowActionEvent = new CustomEvent('rowaction', {
            detail: {
                action: { name: 'delete' },
                row: mockAccount
            }
        });
        datatable.dispatchEvent(mockRowActionEvent);

        // Wait for async operations to complete
        await Promise.resolve();

        // Assert
        expect(deleteRecord).toHaveBeenCalledWith(mockAccount.id);
        expect(element.accounts).toEqual([]);
    });

    it('should handle input field changes correctly', () => {
        // Arrange
        const element = createElement('c-lwc-forinter-view', {
            is: LwcForinterView
        });

        // Act
        document.body.appendChild(element);

        // Simulate changes in the account name and phone input fields
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        inputs[0].value = 'Test Account';
        inputs[1].value = '1234567890';

        // Dispatch a change event for each input field
        inputs[0].dispatchEvent(new CustomEvent('change'));
        inputs[1].dispatchEvent(new CustomEvent('change'));

        // Assert
        expect(inputs[0].value).toBe('Test Account');
        expect(inputs[1].value).toBe('1234567890');
    });

    it('should render the datatable correctly', () => {
        // Arrange
        const element = createElement('c-lwc-forinter-view', {
            is: LwcForinterView
        });
        const mockAccounts = [
            { id: '00123', name: 'Test Account 1', phone: '1234567890' },
            { id: '00124', name: 'Test Account 2', phone: '0987654321' }
        ];

        // Act
        document.body.appendChild(element);
        element.accounts = mockAccounts;

        // Assert
        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        expect(datatable).not.toBeNull();
        expect(datatable.data).toEqual(mockAccounts);
    });

    it('should handle row actions correctly', () => {
        // Arrange
        const element = createElement('c-lwc-forinter-view', {
            is: LwcForinterView
        });
        const mockAccount = { id: '00123', name: 'Test Account', phone: '1234567890' };
        const mockDeleteAccount = jest.fn();

        // Act
        document.body.appendChild(element);
        element.accounts = [mockAccount];

        // Simulate a row action to delete the account
        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        const mockRowActionEvent = new CustomEvent('rowaction', {
            detail: {
                action: { name: 'delete' },
                row: mockAccount
            }
        });
        datatable.dispatchEvent(mockRowActionEvent);

        // Assert
        expect(mockDeleteAccount).toHaveBeenCalled();
    });
});