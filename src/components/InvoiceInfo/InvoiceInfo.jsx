import React from 'react';
import Summary from './Summary/Summary';
import dateToString from '../../utilities/dateToString';
import languageSensitiveNum from '../../utilities/languageSensitiveNum';
import './InvoiceInfoStyles.css';


const InvoiceInfo = ({ invoice }) => {
    return (
        <div className="invoice-info">
            <div className="container">
                <div className="key">
                    <div className="uid">
                        <span className="hashtag">#</span>
                        {invoice.id}
                    </div>
                    <h2>{invoice.description}</h2>
                </div>
                <div className="sender-address">
                    <span>{invoice.senderAddress.street}</span>
                    <span>{invoice.senderAddress.city}</span>
                    <span>{invoice.senderAddress.postCode}</span>
                    <span>{invoice.senderAddress.country}</span>
                </div>
                <div className="created-date">
                    <h3>Invoice Date</h3>
                    <p>{dateToString(invoice.createdAt)}</p>
                </div>
                <div className="client-info">
                    <h3>Bill to</h3>
                    <p>{invoice.clientName}</p>
                    <div className="client-address">
                        <span>{invoice.clientAddress.street}</span>
                        <span>{invoice.clientAddress.city}</span>
                        <span>{invoice.clientAddress.postCode}</span>
                        <span>{invoice.clientAddress.country}</span>
                    </div>
                </div>
                <div className="email">
                    <h3>Sent to</h3>
                    <p>{invoice.clientEmail}</p>
                </div>
                <div className="payment-due">
                    <h3>Payment Due</h3>
                    <p>{dateToString(invoice.paymentDue)}</p>
                </div>
            </div>
            <Summary invoice={invoice} />
            <div className="total">
                <h3>Amount Due</h3>
                <p>£ {languageSensitiveNum(invoice.total)}</p>
            </div>
        </div>
    );
};

export default InvoiceInfo;
