import { createElement } from '@lwc/engine-dom';
import AccountRecordForm from 'c/accountRecordForm';

describe('c-account-record-form', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('creating the component', () => {
        const element = createElement('c-account-record-form', {
            is: AccountRecordForm
        });
        document.body.appendChild(element);
        expect(element).not.toBeNull();
    });

    it('simulating success event', () => {
        const element = createElement('c-account-record-form', {
            is: AccountRecordForm
        });

        document.body.appendChild(element);

        const recordFormEl = element.shadowRoot.querySelector('lightning-record-form');
        recordFormEl.dispatchEvent(
            new CustomEvent('success', {
                detail: { id: '001xx000003NGaA' }
            })
        );

        expect(element.recordId).toBe('001xx000003NGaA');
    });

    it('verifying the presence of lightning-record-form', () => {
        const element = createElement('c-account-record-form', {
            is: AccountRecordForm
        });
        document.body.appendChild(element);
        const recordFormEl = element.shadowRoot.querySelector('lightning-record-form');
        expect(recordFormEl).not.toBeNull();
    });
});