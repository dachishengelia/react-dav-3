import React from 'react';
import { useGlobalContext } from '../../App/context';
import languageSensitiveNum from '../../../utilities/languageSensitiveNum';
import './SummaryStyles.css';

const Summary = ({ invoice }) => {
    const { windowWidth } = useGlobalContext();
    const isDesktop = windowWidth >= 768;

    return (
        <div className="summary">
            <div className="summary-container">
                {isDesktop && (
                    <div className="summary-head">
                        <h5 className="summary-heading">Item Name</h5>
                        <h5 className="summary-heading js-center">QTY.</h5>
                        <h5 className="summary-heading js-end">Price</h5>
                        <h5 className="summary-heading js-end">Total</h5>
                    </div>
                )}
                {invoice.items.map((item, index) => (
                    <div className="summary-item" key={index}>
                        <p className="item-name">{item.name}</p>
                        <p className="item-qty">
                            {item.quantity}
                            {!isDesktop &&
                                ` x £ ${languageSensitiveNum(item.price)}`}
                        </p>
                        {isDesktop && (
                            <p className="item-price">
                                £ {languageSensitiveNum(item.price)}
                            </p>
                        )}
                        <p className="item-total">
                            £ {languageSensitiveNum(item.total)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary;
