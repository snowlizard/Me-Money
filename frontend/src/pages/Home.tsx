import {useEffect, useState} from "react";
import Table from "../components/Table";

export default () => {
    const [accounts, setAccounts] = useState(null);
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        const getAccounts = async () => {
            try {
                const response = await fetch("http://money-api.sudo/account/all");
                const accountData = await response.json();
                setAccounts(accountData);
            } catch (error){
                console.log(error);
            }
        };

        const getTransactions = async () => {
            const response = await fetch("http://money-api.sudo/transaction/current");
            const transactionData = await response.json();
            setTransactions(transactionData);
        };

        getAccounts();
        getTransactions();
    }, []);

    return (
        <div className="row g-3 p-4">
            <div className="col-md-10">
                <Table data={accounts}/>
            </div>
            <div className="col-auto">
                <button className="btn btn-primary">Add Transaction</button>
            </div>

            <div className="col-md-12">
                <Table data={transactions} />
            </div>x
        </div>
    );
}