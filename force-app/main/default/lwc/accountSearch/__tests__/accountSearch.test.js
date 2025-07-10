//import { createElement } from 'lwc';
import { createElement } from '@lwc/engine-dom';
import AccountSearch from 'c/accountSearch';
import AccountSearchForm from 'c/accountSearchForm';
import AccountSearchResult from 'c/accountSearchResult';

describe('c-account-search', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Verify that the component c-account-search is accessible', async () => {
        // Arrange
        const element = createElement('c-account-search', {
            is: AccountSearch
        });

        // Act
        document.body.appendChild(element);

        // Assert
        await expect(element).toBeAccessible();
    });

    it('Verify that the component c-account-search-form is accessible', async () => {
        // Arrange
        const element = createElement('c-account-search-form', {
            is: AccountSearchForm
        });

        // Act
        document.body.appendChild(element);

        // Assert
        await expect(element).toBeAccessible();
    });

    it('Verify that the component c-account-search-result is accessible', async () => {
        // Arrange
        const element = createElement('c-account-search-result', {
            is: AccountSearchResult
        });

        // Act
        document.body.appendChild(element);

        // Assert
        await expect(element).toBeAccessible();
    });

    it('Verify that the component c-account-search-form dispatches a custom event "searchaccountcontact" with the correct detail when the search button is clicked', () => {
        // Arrange
        const element = createElement('c-account-search-form', {
            is: AccountSearchForm
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('searchaccountcontact', handler);

        // Act
        const button = element.shadowRoot.querySelector('button');
        button.click();

        // Assert
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail).toBe('Clicked');
    });

    it('Verify that the component c-account-search-result receives the correct search text from the event "searchaccountcontact" and displays it', () => {
        // Arrange
        const element = createElement('c-account-search-result', {
            is: AccountSearchResult
        });
        document.body.appendChild(element);

        // Act
        const handler = jest.fn();
        element.addEventListener('searchaccountcontact', handler);

        const formElement = createElement('c-account-search-form', {
            is: AccountSearchForm
        });
        document.body.appendChild(formElement);

        // Assert
        expect(handler).not.toHaveBeenCalled();

        formElement.dispatchEvent(new CustomEvent('searchaccountcontact', { detail: 'Test Search Text' }));

        expect(handler).toHaveBeenCalled();
        expect(element.searchText).toBe('Test Search Text');
    });

    it('Verify that the component c-account-search-form updates the search text when the input field value changes', () => {
        // Arrange
        const element = createElement('c-account-search-form', {
            is: AccountSearchForm
        });
        document.body.appendChild(element);

        // Act
        const input = element.shadowRoot.querySelector('input');
        input.value = 'Test Input';
        input.dispatchEvent(new Event('change'));

        // Assert
        expect(element.searchText).toBe('Test Input');
    });

    it('Verify that the component c-account-search-result displays an error message if the search text is empty', () => {
        // Arrange
        const element = createElement('c-account-search-result', {
            is: AccountSearchResult
        });
        document.body.appendChild(element);

        // Act
        element.searchText = '';

        // Assert
        const errorMessage = element.shadowRoot.querySelector('p');
        expect(errorMessage).not.toBeNull();
        expect(errorMessage.textContent).toBe('You must enter a search text');
    });
});