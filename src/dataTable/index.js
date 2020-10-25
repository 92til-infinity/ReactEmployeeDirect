import React from "react";

export default function DT({ data }) {
    const columns = data[0] && Object.keys(data[0]);

    return (
        <table cellPadding={0} cellSpacing={0}>
            <thead class="border border-dark">
                <tr class="border border-dark">{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
            </thead>
            <tbody>
                {data.map(row => <tr>
                    {
                        columns.map(column => <td class="border border-dark">{row[column]}</td>)
                    }
                </tr>
                )}
            </tbody>
        </table>
    )
}