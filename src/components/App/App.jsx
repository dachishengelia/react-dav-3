import { Routes, Route, useLocation } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import Header from '../Header/Header';
import Invoices from '../Invoices/Invoices';
import FormController from '../FormController/FormController';
import InvoiceView from '../InvoiceView/InvoiceView';
import Modal from '../Modal/Modal';
import RouteError from '../RouteError/RouteError';
import { useGlobalContext } from './context';

const App = () => {
    const { state } = useGlobalContext();
    const isModalOpen = state.isModalOpen.status;
    const isFormOpen = state.isFormOpen;
    const location = useLocation();

    return (
        <Wrapper>
            <Header />
            {isFormOpen && <FormController />}
            {isModalOpen && <Modal />}
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Invoices />} />
                <Route path="/invoice/:id" element={<InvoiceView />} />
                <Route path="*" element={<RouteError />} />
            </Routes>
        </Wrapper>
    );
};

export default App;
