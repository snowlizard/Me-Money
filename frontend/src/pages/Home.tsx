import React, {useEffect, useState} from "react";
import Table from "../components/Table";

export default () => {
    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        const getAccounts = async () => {
            try {
                const response = await fetch("http://money-api.sudo/account/all");

                const accountData = await response;
                console.log(accountData);
                
            } catch (error){
                console.log(error);
            }
        }

        getAccounts();
    }, []);

    return (
        <div>
            <Table data={accounts} />

        </div>
    );
}