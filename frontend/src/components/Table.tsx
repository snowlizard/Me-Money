export default (props: any) => {

    const handleClick = (dataItem: any) => {
        console.log(dataItem);
    }

    let headers = props.data != null ? Object.keys(props.data[0]) : [];
    return (
        props.data == null ? "Loading" :
        <div className="table-responsive">
            <table className="table table-hover text-capitalize">
                <thead className="text-bg-dark">
                    <tr>
                        {
                            headers.map((heading) => <th key={"key-" + heading} scope="col">{heading}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        props.data.map((element: any) => {
                            let values = Object.values(element);
                            return (
                                <tr key={"tr-" + element.id} onClick={() => handleClick(element)}
                                style={{cursor: "pointer"}}>
                                    {
                                        values.map((val: any) => <td key={"td-" + val} >{val}</td>)
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}