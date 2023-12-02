

// import React, { FC, useEffect, useMemo, useState } from "react";
// import { Table } from "antd";

// interface IProps { }

// export const DomAsync: FC<IProps> = ({ }) => {
//     const [text, setText] = useState("");
//     const [tableData, setTableData] = useState<string[]>([]);

//     const hasDescription = useMemo(() => {
//         return text !== "a demo for async test";
//     }, [text]);

//     const fetchData = () => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve("Data from the server");
//             }, 1000); // Simulating a 1-second delay
//         });
//     };


//     const columns = [
//         {
//             title: "Data",
//             dataIndex: "data",
//             key: "data",
//             render: (text: string) => <div>{text}</div>,
//         },
//     ];
//     useEffect(() => {
//         const fetchDataFromServer = async () => {
//             try {
//                 const data = await fetchData();
//                 setText(data as string); // 或者 setText(String(data));
//                 setTableData([data as string]);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchDataFromServer();
//     }, []);

//     return (
//         <div>
//             <div>{text}</div>
//             {hasDescription && <div>加载中...</div>}
//             {/* <Table dataSource={tableData as string[]}  columns={columns} /> */}
//         </div>
//     );
// };



import { FC, useEffect, useMemo, useState } from "react";
import { Table } from "antd";

interface IProps { }

export const DomAsync: FC<IProps> = ({ }) => {
    const [text, setText] = useState("");
    const columns = [
        {
            title: "Data",
            dataIndex: "data",
            key: "data",
            render: (text: string) => <div>{text}</div>,
        },
    ];
    const hasDescription = useMemo(() => {
        return text !== "a demo for async test";
    }, [text]);
    const [dataSource, setDataSource] = useState([
        { key: '1', name: 'John Doe1', age: 30 },
        { key: '2', name: 'John Doe2', age: 30 },
    ]);
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const [dataSource, setDataSource] = useState([
                    { key: '1', name: 'John Doe1', age: 30 },
                    { key: '2', name: 'John Doe2', age: 30 },
                    { key: '3', name: 'John Doe3', age: 30 },
                ]);
                // const data = await fetchData();
                // setText(data as string); // 或者 setText(String(data));
                // setTableData([data as string]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromServer();
    }, []);
    return (
        <div>
            <div>{text}</div>
            {hasDescription && <div>加载中...</div>}
            {dataSource.length > 0 && <Table data-testid dataSource={dataSource} columns={columns} />}
        </div>
    );
};