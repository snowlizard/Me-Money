export default () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{width: "100vw", height: "100vh"}}>
            <div className="d-flex align-items-center justify-content-center" style={{width: "80%", height: "100%"}}>
                <form className="row g-4 p-3" id="form">
                    <div className="col-md-4">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select className="form-select" aria-label="Type" id="type">
                            <option value="withdrawal" selected>Withdrawal</option>
                            <option value="revenue">Revenue</option>
                            <option value="transfer">Transfer</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="source" className="form-label">Source</label>
                        <select className="form-select" aria-label="Type" id="source">
                            <option value="">-- None --</option>
                            <option value="1">American Express</option>
                            <option value="2">Charles Schwab</option>
                            <option value="3">Chase (Amazon)</option>
                            <option value="4">Discover savings</option>
                            <option value="5">Paypal</option>
                            <option value="6">Schwab Savings</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="destination" className="form-label">Destination</label>
                        <select className="form-select" aria-label="Type" id="destination">
                            <option value="">-- None --</option>
                            <option value="1">American Express</option>
                            <option value="2">Charles Schwab</option>
                            <option value="3">Chase (Amazon)</option>
                            <option value="4">Discover savings</option>
                            <option value="5">Paypal</option>
                            <option value="6">Schwab Savings</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date"></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="text" className="form-control" id="amount" placeholder="1750.00"></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select id="category" className="form-select"></select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="subcategory" className="form-label">Subcategory</label>
                        <select id="subcategory" className="form-select"></select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" placeholder="Money for xochitl"/>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};